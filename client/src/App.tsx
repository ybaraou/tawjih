import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "./context/app-context";
import { queryClient } from "./lib/queryClient";

import StudentDashboard from "@/pages/student-dashboard";
import TeacherDashboard from "@/pages/teacher-dashboard";
import Quiz from "@/pages/quiz";
import CareerDetail from "@/pages/career-detail";
import NotFound from "@/pages/not-found";
import WelcomeScreen from "@/components/welcome-screen";
import AiCounselor from "@/components/ai-counselor";
import LanguageToggle from "@/components/language-toggle";
import MobileNavigation from "@/components/mobile-navigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={StudentDashboard} />
      <Route path="/welcome" component={WelcomeScreen} />
      <Route path="/teacher" component={TeacherDashboard} />
      <Route path="/quiz/:type" component={Quiz} />
      <Route path="/career/:id" component={CareerDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm fixed top-0 w-full z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <span className="font-bold text-primary-500 text-xl">T</span>
                    </div>
                    <h1 className="font-poppins font-bold text-primary-500 text-xl">TawjihAI</h1>
                  </div>
                  
                  {/* Language Toggle */}
                  <LanguageToggle />
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-16 pb-16">
              <Router />
            </main>
            
            {/* Mobile Navigation */}
            <MobileNavigation />

            {/* AI Counselor Chat */}
            <AiCounselor />

            <Toaster />
          </div>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
