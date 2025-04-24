import { AiMessage, Career, Question, Quiz, User, UserCareer, UserQuiz } from "@shared/schema";

export type Language = 'en' | 'fr' | 'ar' | 'am';

export interface AppContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  quizzes: Quiz[];
  userQuizzes: UserQuiz[];
  careers: Career[];
  userCareers: UserCareer[];
  showChatInterface: boolean;
  toggleChatInterface: () => void;
  currentView: 'dashboard' | 'explore' | 'plan' | 'profile';
  navigateTo: (view: 'dashboard' | 'explore' | 'plan' | 'profile') => void;
}

export interface QuizOption {
  id: string;
  text: string;
  value: string | number;
}

export interface QuizQuestion extends Question {
  options: QuizOption[];
}

export interface CareerPathStep {
  title: string;
  description: string;
  duration: string;
  keySkills: string[];
  estimatedCost: string;
  current?: boolean;
}

export interface CareerPathway {
  steps: CareerPathStep[];
}

export interface ChatMessage extends AiMessage {
  id: string;
  timestamp: number;
}

export interface StudentSummary {
  id: number;
  fullName: string;
  studentId: string;
  progress: number;
  assessmentsCompleted: number;
  totalAssessments: number;
  careerInterests: string[];
  secondaryInterests: string[];
  lastActivity: Date;
}

export interface CareerInterestSummary {
  name: string;
  count: number;
  percentage: number;
}
