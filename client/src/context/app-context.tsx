import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AppContextType, Language } from '@/types';
import { User, Quiz, UserQuiz, Career, UserCareer } from '@shared/schema';
import { changeLanguage } from '@/i18n';

// Create context with default values
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const queryClient = useQueryClient();
  const [language, setLanguageState] = useState<Language>('en');
  const [showChatInterface, setShowChatInterface] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'explore' | 'plan' | 'profile'>('dashboard');

  // Fetch current user
  const { data: currentUser } = useQuery<User | null>({
    queryKey: ['/api/user/current'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/user/current', {
          credentials: 'include',
        });
        
        if (response.status === 401) {
          return null;
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        
        return response.json();
      } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
      }
    },
  });

  // Fetch quizzes
  const { data: quizzes = [] } = useQuery<Quiz[]>({
    queryKey: ['/api/quizzes'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/quizzes');
        if (!response.ok) return [];
        return response.json();
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        return [];
      }
    },
  });

  // Fetch user quizzes
  const { data: userQuizzes = [] } = useQuery<UserQuiz[]>({
    queryKey: ['/api/user/quizzes'],
    queryFn: async () => {
      if (!currentUser) return [];
      try {
        const response = await fetch('/api/user/quizzes');
        if (!response.ok) return [];
        return response.json();
      } catch (error) {
        console.error('Error fetching user quizzes:', error);
        return [];
      }
    },
    enabled: !!currentUser,
  });

  // Fetch careers
  const { data: careers = [] } = useQuery<Career[]>({
    queryKey: ['/api/careers'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/careers');
        if (!response.ok) return [];
        return response.json();
      } catch (error) {
        console.error('Error fetching careers:', error);
        return [];
      }
    },
  });

  // Fetch user careers
  const { data: userCareers = [] } = useQuery<UserCareer[]>({
    queryKey: ['/api/user/careers'],
    queryFn: async () => {
      if (!currentUser) return [];
      try {
        const response = await fetch('/api/user/careers');
        if (!response.ok) return [];
        return response.json();
      } catch (error) {
        console.error('Error fetching user careers:', error);
        return [];
      }
    },
    enabled: !!currentUser,
  });

  // Update language and apply it to i18next
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    changeLanguage(lang);
    
    // If user is logged in, save their language preference
    if (currentUser) {
      fetch('/api/user/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language: lang }),
        credentials: 'include',
      }).catch(error => {
        console.error('Error saving language preference:', error);
      });
    }
  };

  // Load user's language preference when they log in
  useEffect(() => {
    if (currentUser && currentUser.language) {
      setLanguage(currentUser.language as Language);
    }
  }, [currentUser]);

  // Toggle chat interface
  const toggleChatInterface = () => {
    setShowChatInterface(prev => !prev);
  };

  // Navigation
  const navigateTo = (view: 'dashboard' | 'explore' | 'plan' | 'profile') => {
    setCurrentView(view);
  };

  // Combine all context values
  const contextValue: AppContextType = {
    currentUser,
    isLoggedIn: !!currentUser,
    language,
    setLanguage,
    quizzes,
    userQuizzes,
    careers,
    userCareers,
    showChatInterface,
    toggleChatInterface,
    currentView,
    navigateTo,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the AppContext
export function useAppContext() {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;
}
