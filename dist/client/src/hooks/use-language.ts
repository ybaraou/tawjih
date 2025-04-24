import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import { Language } from '@/types';

export function useLanguage() {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within an AppProvider');
  }
  
  const { language, setLanguage } = context;
  
  return {
    language,
    setLanguage,
  };
}
