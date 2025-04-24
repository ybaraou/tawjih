import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Career } from "@shared/schema";

interface CareerRecommendationsProps {
  careers: Career[];
  userMatches: { [key: number]: number }; // careerId -> match percentage
}

export default function CareerRecommendations({
  careers,
  userMatches,
}: CareerRecommendationsProps) {
  const { t } = useTranslation();
  const [location, navigate] = useLocation();

  // Sort careers by match percentage
  const sortedCareers = [...careers].sort((a, b) => {
    const matchA = userMatches[a.id] || 0;
    const matchB = userMatches[b.id] || 0;
    return matchB - matchA;
  });

  const handleExploreCareer = (careerId: number) => {
    navigate(`/career/${careerId}`);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-poppins font-semibold text-xl">
          {t("recommended_careers")}
        </h3>
        <a href="#" className="text-blue-500 text-sm font-medium">
          {t("explore_all")}
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCareers.slice(0, 3).map((career) => (
          <Card
            key={career.id}
            className="career-card overflow-hidden hover:shadow-md transition-all"
          >
            <div className="w-full h-36 bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center">
              {career.title === t("software_engineer") && (
                <span className="material-icons text-blue-500 text-5xl">
                  code
                </span>
              )}
              {career.title === t("data_scientist") && (
                <span className="material-icons text-blue-500 text-5xl">
                  analytics
                </span>
              )}
              {career.title === t("business_manager") && (
                <span className="material-icons text-blue-500 text-5xl">
                  business
                </span>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-poppins font-semibold text-lg">
                  {career.title}
                </h4>
                <Badge
                  variant="outline"
                  className="bg-blue-100 text-blue-800 flex items-center gap-1"
                >
                  <Star className="h-3 w-3" />
                  {userMatches[career.id] || 80}% {t("match")}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mb-3">{career.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {JSON.parse(career.skillsRequired as string)
                  .slice(0, 3)
                  .map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {t(skill.toLowerCase())}
                    </span>
                  ))}
              </div>
              <Button
                variant="outline"
                className="w-full border-blue-500 text-blue-500 hover:bg-blue-700"
                onClick={() => handleExploreCareer(career.id)}
              >
                {t("explore_path")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
