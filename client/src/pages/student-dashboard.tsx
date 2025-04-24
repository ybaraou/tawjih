import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import QuizSection from '@/components/quiz-section';
import CareerRecommendations from '@/components/career-recommendations';
import PathwayExplorer from '@/components/pathway-explorer';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { calculateProgress } from '@/lib/utils';
import { CareerPathway } from '@/types';

export default function StudentDashboard() {
  const { t } = useTranslation();
  const [location, navigate] = useLocation();

  // Fetch user data
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['/api/user/current'],
  });

  // Fetch user quizzes
  const { data: userQuizzes, isLoading: isLoadingQuizzes } = useQuery({
    queryKey: ['/api/user/quizzes'],
  });

  // Fetch career recommendations
  const { data: careers, isLoading: isLoadingCareers } = useQuery({
    queryKey: ['/api/careers/recommended'],
  });

  // Fetch user career matches
  const { data: userCareerMatches, isLoading: isLoadingMatches } = useQuery({
    queryKey: ['/api/user/career-matches'],
  });

  // Example pathway data - this would come from the API in a real app
  const examplePathway: CareerPathway = {
    steps: [
      {
        title: t('high_school'),
        description: "Basic education providing foundation for future studies.",
        duration: "3 years",
        keySkills: ["Mathematics", "Science"],
        estimatedCost: "Free (Public)",
      },
      {
        title: t('cs_degree'),
        description: t('cs_description'),
        duration: "4 years",
        keySkills: ["Programming", "Algorithms"],
        estimatedCost: "20,000 - 40,000 MAD",
        current: true
      },
      {
        title: t('junior_developer'),
        description: "Entry-level position to gain practical experience.",
        duration: "1-3 years",
        keySkills: ["Coding", "Teamwork"],
        estimatedCost: "N/A",
      },
      {
        title: t('senior_engineer'),
        description: "Advanced position leading projects and mentoring juniors.",
        duration: "Ongoing",
        keySkills: ["Architecture", "Leadership"],
        estimatedCost: "N/A",
      }
    ]
  };

  const handleExploreEducation = () => {
    console.log('Exploring education options');
  };

  // Render loading state
  if (isLoadingUser || isLoadingQuizzes || isLoadingCareers || isLoadingMatches) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-48 w-full mb-6" />
        <Skeleton className="h-96 w-full mb-6" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  // Example data structure - in a real app, this would come from API
  const dashboardData = {
    user: user || { fullName: 'Amal', id: 1 },
    userQuizzes: userQuizzes || [
      { id: 1, userId: 1, quizId: 1, completed: true, progress: 100 },
      { id: 2, userId: 1, quizId: 2, completed: false, progress: 45 }
    ],
    completedAssessments: 2,
    totalAssessments: 3,
    exploredCareers: 8,
    aiChats: 12,
    careers: careers || [
      { 
        id: 1, 
        title: t('software_engineer'),
        description: t('software_description'),
        skillsRequired: JSON.stringify(["problem_solving", "creativity", "logic"]),
        educationPathway: JSON.stringify(examplePathway),
        jobProspects: "Excellent in Morocco with growing tech sector.",
        language: "en"
      },
      { 
        id: 2, 
        title: t('data_scientist'),
        description: t('data_description'),
        skillsRequired: JSON.stringify(["analytics", "mathematics", "research"]),
        educationPathway: JSON.stringify(examplePathway),
        jobProspects: "Growing demand in financial and tech sectors.",
        language: "en"
      },
      { 
        id: 3, 
        title: t('business_manager'),
        description: t('business_description'),
        skillsRequired: JSON.stringify(["leadership", "communication", "strategy"]),
        educationPathway: JSON.stringify(examplePathway),
        jobProspects: "Steady demand across multiple industries.",
        language: "en"
      }
    ],
    userCareerMatches: userCareerMatches || {
      1: 95, // Career ID to match percentage
      2: 87,
      3: 82
    }
  };

  // Calculate overall progress
  const overallProgress = calculateProgress(
    dashboardData.completedAssessments,
    dashboardData.totalAssessments
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h2 className="font-poppins font-bold text-2xl text-gray-800 mb-2">
          {t('hello')}, {dashboardData.user.fullName}! 👋
        </h2>
        <p className="text-gray-600">{t('continue_journey')}</p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h3 className="font-poppins font-semibold text-lg mb-4">{t('your_progress')}</h3>
          <div className="flex items-center mb-2">
            <Progress value={overallProgress} className="w-full h-2.5 bg-gray-200" />
            <span className="text-sm font-medium text-gray-500 ml-4">{overallProgress}%</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-secondary-500 text-sm font-medium">{t('completed')}</div>
              <div className="font-poppins font-bold mt-1">
                {dashboardData.completedAssessments}/{dashboardData.totalAssessments}
              </div>
              <div className="text-xs text-gray-500">{t('assessments')}</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-primary-500 text-sm font-medium">{t('explored')}</div>
              <div className="font-poppins font-bold mt-1">{dashboardData.exploredCareers}</div>
              <div className="text-xs text-gray-500">{t('careers')}</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3">
              <div className="text-accent-500 text-sm font-medium">{t('ai_chats')}</div>
              <div className="font-poppins font-bold mt-1">{dashboardData.aiChats}</div>
              <div className="text-xs text-gray-500">{t('conversations')}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Section */}
      <QuizSection userQuizzes={dashboardData.userQuizzes} />

      {/* Career Recommendations */}
      <CareerRecommendations 
        careers={dashboardData.careers} 
        userMatches={dashboardData.userCareerMatches} 
      />

      {/* Career Pathway Explorer */}
      <PathwayExplorer 
        career={t('software_engineer')}
        pathway={examplePathway}
        onExploreEducation={handleExploreEducation}
      />
    </div>
  );
}
