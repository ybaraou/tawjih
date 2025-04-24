import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoute, useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, Share, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PathwayExplorer from '@/components/pathway-explorer';
import { CareerPathway } from '@/types';

export default function CareerDetail() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [location, navigate] = useLocation();
  const [match, params] = useRoute<{ id: string }>('/career/:id');
  const careerId = match ? parseInt(params.id) : null;
  
  // Fetch career details
  const { data: career, isLoading: isLoadingCareer } = useQuery({
    queryKey: ['/api/careers', careerId],
    queryFn: async () => {
      const response = await fetch(`/api/careers/${careerId}`);
      if (!response.ok) throw new Error('Failed to load career');
      return response.json();
    },
    enabled: !!careerId
  });
  
  // Fetch user career relationship (match percentage, favorites)
  const { data: userCareer, isLoading: isLoadingUserCareer } = useQuery({
    queryKey: ['/api/user/careers', careerId],
    queryFn: async () => {
      const response = await fetch(`/api/user/careers/${careerId}`);
      if (response.status === 404) return null;
      if (!response.ok) throw new Error('Failed to load user career relation');
      return response.json();
    },
    enabled: !!careerId
  });
  
  // Toggle favorite mutation
  const toggleFavoriteMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest(
        'POST', 
        `/api/user/careers/${careerId}/favorite`, 
        { isFavorite: !(userCareer?.isFavorite || false) }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/careers', careerId] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/careers'] });
      
      toast({
        title: userCareer?.isFavorite ? t('removed_from_favorites') : t('added_to_favorites'),
        description: userCareer?.isFavorite 
          ? t('career_removed_from_favorites') 
          : t('career_added_to_favorites'),
      });
    },
    onError: (error) => {
      toast({
        title: t('error'),
        description: t('error_updating_favorites'),
        variant: "destructive"
      });
      console.error('Error toggling favorite:', error);
    }
  });
  
  // Share career
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: career.title,
        text: career.description,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          toast({
            title: t('link_copied'),
            description: t('career_link_copied_to_clipboard'),
          });
        })
        .catch(err => {
          console.error('Failed to copy link: ', err);
        });
    }
  };
  
  // Handle education exploration
  const handleExploreEducation = () => {
    // Open AI counselor to discuss education options
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // This would trigger the AI counselor with education context
    const event = new CustomEvent('openAICounselor', { 
      detail: { 
        topic: 'education',
        context: career.title
      } 
    });
    document.dispatchEvent(event);
  };
  
  // Track career view
  useEffect(() => {
    if (careerId) {
      // Record that the user viewed this career
      fetch(`/api/user/careers/${careerId}/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).catch(error => {
        console.error('Error recording career view:', error);
      });
    }
  }, [careerId]);
  
  // Loading state
  if (isLoadingCareer || isLoadingUserCareer) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-12 w-64 mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton className="h-64 w-full mb-6" />
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
          </div>
          
          <div className="lg:col-span-1">
            <Skeleton className="h-48 w-full mb-6" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  // Handle invalid career id
  if (!career) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-4">{t('career_not_found')}</h2>
        <p className="text-gray-600 mb-6">{t('career_not_found_description')}</p>
        <Button onClick={() => navigate('/')}>{t('return_to_dashboard')}</Button>
      </div>
    );
  }
  
  // Parse career data
  const skillsRequired = typeof career.skillsRequired === 'string' 
    ? JSON.parse(career.skillsRequired) 
    : career.skillsRequired;
    
  const educationPathway = typeof career.educationPathway === 'string' 
    ? JSON.parse(career.educationPathway) 
    : career.educationPathway;
  
  const matchPercentage = userCareer?.matchPercentage || 0;
  const isFavorite = userCareer?.isFavorite || false;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-2">{career.title}</h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 flex items-center gap-1">
              <Star className="h-3 w-3" />
              {matchPercentage}% {t('match')}
            </Badge>
            <span>•</span>
            <span>{t('job_prospects')}: {career.jobProspects}</span>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button 
            variant={isFavorite ? "default" : "outline"}
            className={isFavorite 
              ? "bg-pink-500 hover:bg-pink-600 text-white" 
              : "border-pink-500 text-pink-500 hover:bg-pink-50"}
            onClick={() => toggleFavoriteMutation.mutate()}
            disabled={toggleFavoriteMutation.isPending}
          >
            <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? t('favorited') : t('add_to_favorites')}
          </Button>
          
          <Button 
            variant="outline" 
            className="text-primary-500 border-primary-500 hover:bg-primary-50"
            onClick={handleShare}
          >
            <Share className="h-4 w-4 mr-2" />
            {t('share')}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Career Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t('career_overview')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="font-poppins font-semibold text-lg mb-2">{t('about_this_career')}</h3>
                <p className="text-gray-700 mb-4">{career.description}</p>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-md mb-2">{t('daily_responsibilities')}</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {career.title === t('software_engineer') && (
                      <>
                        <li>{t('design_and_develop_software')}</li>
                        <li>{t('debug_and_troubleshoot_code')}</li>
                        <li>{t('collaborate_with_team_members')}</li>
                        <li>{t('test_and_deploy_applications')}</li>
                      </>
                    )}
                    {career.title === t('data_scientist') && (
                      <>
                        <li>{t('analyze_complex_datasets')}</li>
                        <li>{t('build_predictive_models')}</li>
                        <li>{t('create_data_visualizations')}</li>
                        <li>{t('present_findings_to_stakeholders')}</li>
                      </>
                    )}
                    {career.title === t('business_manager') && (
                      <>
                        <li>{t('oversee_daily_operations')}</li>
                        <li>{t('manage_team_performance')}</li>
                        <li>{t('develop_business_strategies')}</li>
                        <li>{t('monitor_budget_and_resources')}</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="font-poppins font-semibold text-lg mb-2">{t('key_skills')}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skillsRequired.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800 py-1.5">
                      {t(skill.toLowerCase())}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-md mb-2">{t('work_environment')}</h4>
                    <p className="text-gray-700 text-sm">
                      {career.title === t('software_engineer') 
                        ? t('software_work_environment')
                        : career.title === t('data_scientist')
                        ? t('data_work_environment')
                        : t('business_work_environment')
                      }
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-md mb-2">{t('salary_range')}</h4>
                    <p className="text-gray-700 text-sm">
                      {career.title === t('software_engineer') 
                        ? t('software_salary_range')
                        : career.title === t('data_scientist')
                        ? t('data_salary_range')
                        : t('business_salary_range')
                      }
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Pathway Explorer */}
          <PathwayExplorer 
            career={career.title}
            pathway={educationPathway as CareerPathway}
            onExploreEducation={handleExploreEducation}
          />
        </div>
        
        <div className="lg:col-span-1">
          {/* Match Analysis */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t('how_you_match')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-primary-500">{matchPercentage}%</span>
                      <span className="text-sm text-gray-500">{t('match')}</span>
                    </div>
                  </div>
                  {/* Circle progress indicator - would be SVG in actual implementation */}
                  <div className="absolute inset-0 rounded-full border-8 border-primary-100">
                    <div 
                      className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-primary-500"
                      style={{ 
                        clipPath: `polygon(0 0, 100% 0, 100% ${matchPercentage}%, 0 ${matchPercentage}%)`,
                        transform: 'rotate(-90deg)',
                        transformOrigin: 'center'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <MatchAttribute 
                  name={t('problem_solving')} 
                  value={85} 
                  required={80}
                  isStrength={true}
                />
                <MatchAttribute 
                  name={t('technical_aptitude')} 
                  value={90} 
                  required={85}
                  isStrength={true}
                />
                <MatchAttribute 
                  name={t('teamwork')} 
                  value={70} 
                  required={75}
                  isStrength={false}
                />
                <MatchAttribute 
                  name={t('creativity')} 
                  value={80} 
                  required={70}
                  isStrength={true}
                />
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">{t('ai_recommendation')}</h4>
                <p className="text-gray-700 text-sm">
                  {t('ai_career_recommendation')}
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto mt-2 text-primary-500"
                  onClick={handleExploreEducation}
                >
                  {t('talk_to_ai_counselor')}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Similar Careers */}
          <Card>
            <CardHeader>
              <CardTitle>{t('similar_careers')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-4">
                  <SimilarCareerCard
                    title={career.title === t('software_engineer') ? t('web_developer') : 
                           career.title === t('data_scientist') ? t('machine_learning_engineer') : 
                           t('product_manager')}
                    matchPercentage={career.title === t('software_engineer') ? 92 : 
                                    career.title === t('data_scientist') ? 89 : 
                                    85}
                    skills={career.title === t('software_engineer') ? [t('html'), t('css'), t('javascript')] : 
                            career.title === t('data_scientist') ? [t('python'), t('algorithms'), t('statistics')] : 
                            [t('communication'), t('organization'), t('leadership')]}
                  />
                  
                  <SimilarCareerCard
                    title={career.title === t('software_engineer') ? t('mobile_app_developer') : 
                           career.title === t('data_scientist') ? t('business_analyst') : 
                           t('marketing_manager')}
                    matchPercentage={career.title === t('software_engineer') ? 88 : 
                                    career.title === t('data_scientist') ? 84 : 
                                    82}
                    skills={career.title === t('software_engineer') ? [t('swift'), t('kotlin'), t('react_native')] : 
                            career.title === t('data_scientist') ? [t('excel'), t('sql'), t('visualization')] : 
                            [t('strategy'), t('creativity'), t('analysis')]}
                  />
                  
                  <SimilarCareerCard
                    title={career.title === t('software_engineer') ? t('devops_engineer') : 
                           career.title === t('data_scientist') ? t('database_administrator') : 
                           t('human_resources_manager')}
                    matchPercentage={career.title === t('software_engineer') ? 82 : 
                                    career.title === t('data_scientist') ? 78 : 
                                    75}
                    skills={career.title === t('software_engineer') ? [t('linux'), t('docker'), t('kubernetes')] : 
                            career.title === t('data_scientist') ? [t('sql'), t('database_design'), t('backup')] : 
                            [t('recruitment'), t('employee_relations'), t('conflict_resolution')]}
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface MatchAttributeProps {
  name: string;
  value: number;
  required: number;
  isStrength: boolean;
}

function MatchAttribute({ name, value, required, isStrength }: MatchAttributeProps) {
  const { t } = useTranslation();
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <div className="flex items-center">
          <span className="text-sm font-medium">{name}</span>
          {isStrength ? (
            <Badge variant="outline" className="ml-2 bg-green-100 text-green-700 text-xs">
              {t('strength')}
            </Badge>
          ) : (
            <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-700 text-xs">
              {t('growth_area')}
            </Badge>
          )}
        </div>
        <span className="text-sm text-gray-500">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
        <div 
          className={`h-1.5 rounded-full ${isStrength ? "bg-green-500" : "bg-yellow-500"}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <div className="flex justify-end">
        <span className="text-xs text-gray-500">{t('required')}: {required}%</span>
      </div>
    </div>
  );
}

interface SimilarCareerCardProps {
  title: string;
  matchPercentage: number;
  skills: string[];
}

function SimilarCareerCard({ title, matchPercentage, skills }: SimilarCareerCardProps) {
  const { t } = useTranslation();
  const [location, navigate] = useLocation();
  
  return (
    <div className="p-3 border border-gray-200 rounded-lg hover:border-primary-200 hover:shadow-sm transition-all">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{title}</h4>
        <Badge variant="outline" className="bg-blue-100 text-blue-800 flex items-center gap-1">
          <Star className="h-3 w-3" />
          {matchPercentage}%
        </Badge>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {skills.map((skill, index) => (
          <span key={index} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-700">
            {skill}
          </span>
        ))}
      </div>
      
      <Button 
        variant="link" 
        className="p-0 h-auto text-sm text-primary-500"
        onClick={() => navigate(`/career/${title.toLowerCase().replace(/\s+/g, '-')}`)}
      >
        {t('explore')} &rarr;
      </Button>
    </div>
  );
}
