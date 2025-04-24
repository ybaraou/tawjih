import { useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Language } from "@/types";
import { supportedLanguages } from "@/i18n";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    // Set HTML lang attribute and direction
    const htmlEl = document.documentElement;
    htmlEl.setAttribute("lang", language);

    // Set RTL for Arabic
    if (language === "ar") {
      htmlEl.classList.add("rtl");
    } else {
      htmlEl.classList.remove("rtl");
    }
  }, [language]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center space-x-2">
      {Object.entries(supportedLanguages).map(([code, label]) => {
        const isActive = language === code;
        return (
          <button
            key={code}
            className={`language-toggle rounded-md px-3 py-1 font-medium text-sm ${
              isActive
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100 text-gray-500"
            } ${code === "ar" ? "font-amiri" : ""}`}
            onClick={() => handleLanguageChange(code as Language)}
          >
            {code === "ar" ? "ع" : code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
