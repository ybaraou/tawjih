import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoute, useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { QuizQuestion } from '@/types';

export default function Quiz() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [location, navigate] = useLocation();
  const [match, params] = useRoute<{ type: string }>('/quiz/:type');
  const quizType = match ? params.type : null;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizProgress, setQuizProgress] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  
  // Fetch quiz data
  const { data: quiz, isLoading: isLoadingQuiz } = useQuery({
    queryKey: ['/api/quizzes', quizType],
    queryFn: async () => {
      const response = await fetch(`/api/quizzes/${quizType}`);
      if (!response.ok) throw new Error('Failed to load quiz');
      return response.json();
    }
  });
  
  // Fetch quiz questions
  const { data: questions, isLoading: isLoadingQuestions } = useQuery({
    queryKey: ['/api/quizzes', quizType, 'questions'],
    queryFn: async () => {
      const response = await fetch(`/api/quizzes/${quizType}/questions`);
      if (!response.ok) throw new Error('Failed to load questions');
      return response.json();
    },
    enabled: !!quiz
  });
  
  // Fetch user's progress if they've started this quiz before
  const { data: userQuiz, isLoading: isLoadingUserQuiz } = useQuery({
    queryKey: ['/api/user/quizzes', quizType],
    queryFn: async () => {
      const response = await fetch(`/api/user/quizzes/${quizType}`);
      if (response.status === 404) return null;
      if (!response.ok) throw new Error('Failed to load user progress');
      return response.json();
    }
  });
  
  // Save answer mutation
  const saveAnswerMutation = useMutation({
    mutationFn: async (data: { questionId: number, answer: string }) => {
      return await apiRequest('POST', `/api/user/quizzes/${quizType}/answers`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/quizzes'] });
    },
    onError: (error) => {
      toast({
        title: "Error saving answer",
        description: "There was a problem saving your answer. Please try again.",
        variant: "destructive"
      });
      console.error('Error saving answer:', error);
    }
  });
  
  // Complete quiz mutation
  const completeQuizMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('POST', `/api/user/quizzes/${quizType}/complete`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/quizzes'] });
      setQuizComplete(true);
      
      // Navigate to results after a delay
      setTimeout(() => {
        navigate(`/quiz/results/${quizType}`);
      }, 1500);
    },
    onError: (error) => {
      toast({
        title: "Error completing quiz",
        description: "There was a problem completing your quiz. Please try again.",
        variant: "destructive"
      });
      console.error('Error completing quiz:', error);
    }
  });
  
  // Initialize quiz state from user progress
  useEffect(() => {
    if (userQuiz && questions) {
      // If user has already started this quiz
      const savedAnswers: Record<number, string> = {};
      const userAnswers = userQuiz.results?.answers || [];
      
      userAnswers.forEach((answer: { questionId: number, answer: string }) => {
        savedAnswers[answer.questionId] = answer.answer;
      });
      
      setSelectedAnswers(savedAnswers);
      
      // If the quiz was in progress, start from where they left off
      if (!userQuiz.completed && userAnswers.length > 0) {
        const lastAnsweredIndex = questions.findIndex(
          q => q.id === userAnswers[userAnswers.length - 1].questionId
        );
        
        if (lastAnsweredIndex >= 0 && lastAnsweredIndex < questions.length - 1) {
          setCurrentQuestionIndex(lastAnsweredIndex + 1);
        }
      }
      
      // Set progress
      setQuizProgress(userQuiz.progress);
    }
  }, [userQuiz, questions]);
  
  // Update progress when current question changes
  useEffect(() => {
    if (questions && questions.length > 0) {
      const progress = Math.round(((currentQuestionIndex) / questions.length) * 100);
      setQuizProgress(progress);
    }
  }, [currentQuestionIndex, questions]);
  
  const getCurrentQuestion = (): QuizQuestion | null => {
    if (!questions || questions.length === 0 || currentQuestionIndex >= questions.length) {
      return null;
    }
    return questions[currentQuestionIndex];
  };
  
  const handleSelectAnswer = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const handleNext = async () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;
    
    const questionId = currentQuestion.id;
    const answer = selectedAnswers[questionId];
    
    if (!answer) {
      toast({
        title: "Please select an answer",
        description: "You need to select an answer before continuing.",
        variant: "default"
      });
      return;
    }
    
    // Save the answer
    await saveAnswerMutation.mutateAsync({ questionId, answer });
    
    // Move to next question or complete quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // Complete the quiz
      completeQuizMutation.mutate();
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };
  
  // Loading state
  if (isLoadingQuiz || isLoadingQuestions || isLoadingUserQuiz) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-48 mb-8" />
        <Card>
          <CardContent className="p-8">
            <Skeleton className="h-6 w-full mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Handle invalid quiz type
  if (!quiz || !questions) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-4">Quiz Not Found</h2>
        <p className="text-gray-600 mb-6">The quiz you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
      </div>
    );
  }
  
  const currentQuestion = getCurrentQuestion();
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-2">{quiz.title}</h2>
      <p className="text-gray-600 mb-6">{quiz.description}</p>
      
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            {t('question')} {currentQuestionIndex + 1} {t('of')} {questions.length}
          </span>
          <span>{quizProgress}% {t('completed')}</span>
        </div>
        <Progress value={quizProgress} className="h-2" />
      </div>
      
      {/* Quiz completion message */}
      {quizComplete && (
        <Card className="bg-green-50 border-green-200 mb-6">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="material-icons text-green-500 text-3xl">check_circle</span>
              </div>
            </div>
            <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">{t('quiz_completed')}</h3>
            <p className="text-gray-600">{t('redirecting_to_results')}</p>
          </CardContent>
        </Card>
      )}
      
      {/* Question card */}
      {!quizComplete && currentQuestion && (
        <Card className="mb-6 quiz-card">
          <CardContent className="p-8">
            <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-6">
              {currentQuestion.text}
            </h3>
            
            <RadioGroup 
              value={selectedAnswers[currentQuestion.id] || ""} 
              onValueChange={(value) => handleSelectAnswer(currentQuestion.id, value)}
              className="space-y-4"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 quiz-option p-3 rounded-lg border border-gray-200 hover:border-primary-200 cursor-pointer">
                  <RadioGroupItem id={option.id} value={option.value.toString()} className="text-primary-500" />
                  <Label htmlFor={option.id} className="flex-grow cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      )}
      
      {/* Navigation buttons */}
      {!quizComplete && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0 || saveAnswerMutation.isPending || completeQuizMutation.isPending}
          >
            {t('previous')}
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={saveAnswerMutation.isPending || completeQuizMutation.isPending}
            className="bg-primary-500 hover:bg-primary-600"
          >
            {currentQuestionIndex < questions.length - 1 ? t('next') : t('finish')}
            {(saveAnswerMutation.isPending || completeQuizMutation.isPending) && (
              <span className="ml-2 inline-block animate-spin">
                <span className="material-icons text-sm">sync</span>
              </span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
