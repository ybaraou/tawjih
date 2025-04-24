import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function MobileNavigation() {
  const { t } = useTranslation();
  const [location, navigate] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 py-2 md:hidden z-10">
      <div className="grid grid-cols-4 gap-1">
        <NavButton
          icon="dashboard"
          label={t("dashboard")}
          active={isActive("/")}
          onClick={() => navigate("/")}
        />
        <NavButton
          icon="explore"
          label={t("explore")}
          active={isActive("/explore")}
          onClick={() => navigate("/explore")}
        />
        <NavButton
          icon="event_note"
          label={t("plan")}
          active={isActive("/plan")}
          onClick={() => navigate("/plan")}
        />
        <NavButton
          icon="person"
          label={t("profile")}
          active={isActive("/profile")}
          onClick={() => navigate("/profile")}
        />
      </div>
    </nav>
  );
}

interface NavButtonProps {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavButton({ icon, label, active, onClick }: NavButtonProps) {
  return (
    <button
      className={cn(
        "flex flex-col items-center justify-center py-1",
        active ? "text-blue-500" : "text-gray-400"
      )}
      onClick={onClick}
    >
      <span className="material-icons text-[22px]">{icon}</span>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}
