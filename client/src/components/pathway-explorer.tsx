import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CareerPathway } from "@/types";

interface PathwayExplorerProps {
  career: string;
  pathway: CareerPathway;
  onExploreEducation: () => void;
}

export default function PathwayExplorer({
  career,
  pathway,
  onExploreEducation,
}: PathwayExplorerProps) {
  const { t } = useTranslation();

  // Find current step
  const currentStepIndex = pathway.steps.findIndex((step) => step.current);

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-poppins font-semibold text-xl">
          {t("career_pathway")}: {career}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 text-sm font-medium flex items-center gap-1"
        >
          <Share className="h-4 w-4" />
          {t("share")}
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <ScrollArea className="w-full ">
            <div className=" overflow-x-auto">
              <div className="flex justify-between items-center mb-8">
                {pathway.steps.map((step, index) => (
                  <>
                    <div className="flex-1 text-center " key={`step-${index}`}>
                      <div className="text-xs font-medium text-gray-500 mb-1">
                        {index === 0
                          ? t("starting_point")
                          : index === 1
                          ? t("undergraduate")
                          : index === 2
                          ? t("entry_level")
                          : t("advanced")}
                      </div>
                      <div
                        className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center 
                        ${
                          index <= currentStepIndex
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <span
                          className={`material-icons ${
                            index <= currentStepIndex
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}
                        >
                          {index === 0
                            ? "school"
                            : index === 1
                            ? "computer"
                            : index === 2
                            ? "code"
                            : "engineering"}
                        </span>
                      </div>
                      <div className="mt-1 font-medium text-sm">
                        {index === 0
                          ? t("high_school")
                          : index === 1
                          ? t("computer_science")
                          : index === 2
                          ? t("junior_developer")
                          : t("senior_engineer")}
                      </div>
                    </div>

                    {index < pathway.steps.length - 1 && (
                      <div
                        className="flex-1 hidden sm:block"
                        key={`connector-${index}`}
                      >
                        <div
                          className={`h-0.5 w-full relative ${
                            index < currentStepIndex
                              ? "bg-blue-500"
                              : "bg-gray-200"
                          }`}
                        >
                          <div
                            className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs
                            ${
                              index < currentStepIndex
                                ? "bg-blue-500"
                                : "bg-gray-300"
                            } `}
                          >
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    )}
                    {index < pathway.steps.length - 1 && (
                      <div
                        className="flex-1 block sm:hidden"
                        key={`connector-${index}`}
                      >
                        <div className={` relative`}>
                          <div
                            className={` w-5 h-5 m-auto rounded-full flex items-center justify-center text-white text-xs
                            ${
                              index < currentStepIndex
                                ? "bg-blue-500"
                                : "bg-gray-300"
                            } `}
                          >
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>

              {currentStepIndex >= 0 && (
                <div className="bg-blue-50  p-4 rounded-lg">
                  <h4 className="font-poppins text-wrap font-medium text-md mb-2">
                    {t("current_step")}: {pathway.steps[currentStepIndex].title}
                  </h4>
                  <p className="text-sm text-wrap text-gray-600 mb-3">
                    {pathway.steps[currentStepIndex].description}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500 mb-1">
                        {t("duration")}
                      </div>
                      <div className="font-medium">
                        {pathway.steps[currentStepIndex].duration}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-xs text-wrap text-gray-500 mb-1">
                        {t("key_skills")}
                      </div>
                      <div
                        className="font-medium text-wrap"
                        style={{ overflowWrap: "break-word" }}
                      >
                        {pathway.steps[currentStepIndex].keySkills.join(", ")}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-xs text-wrap text-gray-500 mb-1">
                        {t("estimated_cost")}
                      </div>
                      <div className="font-medium text-wrap">
                        {pathway.steps[currentStepIndex].estimatedCost}
                      </div>
                    </div>
                  </div>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full md:w-auto"
                    onClick={onExploreEducation}
                  >
                    {t("explore_education")}
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
