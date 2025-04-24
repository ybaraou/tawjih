import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { UserQuiz } from "@shared/schema";
import { formatPercentage } from "@/lib/utils";

interface QuizSectionProps {
  userQuizzes: UserQuiz[];
}

export default function QuizSection({ userQuizzes }: QuizSectionProps) {
  const { t } = useTranslation();
  const [location, navigate] = useLocation();

  // Sort quizzes by completion status, then by progress
  const sortedQuizzes = [...userQuizzes].sort((a, b) => {
    if (a.completed && !b.completed) return -1;
    if (!a.completed && b.completed) return 1;
    return b.progress - a.progress;
  });

  const handleViewResults = (quizId: number) => {
    navigate(`/quiz/results/${quizId}`);
  };

  const handleContinueQuiz = (quizId: number) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-poppins font-semibold text-xl">
          {t("career_assessment_quiz")}
        </h3>
        <a href="#" className="text-blue-500 text-sm font-medium">
          {t("view_all")}
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedQuizzes.slice(0, 2).map((quiz) => (
          <Card
            key={quiz.id}
            className={`overflow-hidden ${
              quiz.completed ? "border-green-100" : ""
            }`}
          >
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-3">
                <Badge
                  variant={quiz.completed ? "success" : "warning"}
                  className={
                    quiz.completed
                      ? "bg-green-100 text-secondary-600"
                      : "bg-yellow-100 text-accent-500"
                  }
                >
                  {quiz.completed ? t("completed") : t("in_progress")}
                </Badge>
                <span className="text-gray-400 text-sm">
                  {quiz.quizId === 1 ? "10 min" : "15 min"}
                </span>
              </div>

              <h4 className="font-poppins font-semibold text-lg mb-2">
                {quiz.quizId === 1
                  ? t("personality_assessment")
                  : t("skills_interests")}
              </h4>

              <p className="text-gray-600 text-sm mb-4">
                {quiz.quizId === 1
                  ? t("personality_description")
                  : t("skills_description")}
              </p>

              {!quiz.completed && (
                <>
                  <Progress value={quiz.progress} className="h-1.5 mb-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {Math.round((quiz.progress / 100) * 15)}/15{" "}
                      {t("questions_completed")}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleContinueQuiz(quiz.quizId)}
                      className="bg-accent-500 hover:bg-accent-600 text-white rounded-lg"
                    >
                      {t("continue")}
                    </Button>
                  </div>
                </>
              )}

              {quiz.completed && (
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1 items-center">
                    <CheckCircle className="h-4 w-4 text-secondary-500" />
                    <span className="text-xs text-gray-500">
                      {t("completed")}
                    </span>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => handleViewResults(quiz.quizId)}
                    className="text-blue-500 font-medium p-0 h-auto"
                  >
                    {t("view_results")}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
