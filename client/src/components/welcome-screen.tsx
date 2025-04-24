import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const [location, navigate] = useLocation();

  const handleGetStarted = () => {
    navigate('/');
  };

  const handleShowLogin = () => {
    // Login functionality would be implemented here
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-10 pb-12 text-center">
      <div className="mb-8">
        <div className="w-full h-64 rounded-xl shadow-md bg-gradient-to-br from-primary-100 via-blue-50 to-primary-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-full shadow-md">
            <span className="material-icons text-5xl text-primary-500">school</span>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-4">{t('welcome')}</h1>
      <p className="text-lg text-gray-600 mb-8">{t('welcome_description')}</p>
      <div className="space-y-4">
        <Button 
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-xl font-medium shadow-md"
          onClick={handleGetStarted}
        >
          {t('get_started')}
        </Button>
        <Button 
          variant="outline" 
          className="w-full text-gray-700 py-3 px-4 rounded-xl font-medium shadow-sm border border-gray-200 hover:bg-gray-50"
          onClick={handleShowLogin}
        >
          {t('sign_in')}
        </Button>
      </div>
    </div>
  );
}
