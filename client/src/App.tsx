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
import Logo from "./logo-full.png";

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
            <header className="bg-white shadow-sm fixed top-0 w-full z-10 mb-3">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-0">
                  <a href="/" className="flex items-center space-x-3">
                    <img width={100} src={Logo} alt="" />
                  </a>

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
