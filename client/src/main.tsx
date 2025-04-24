import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initI18n } from "./i18n";

// Initialize internationalization
initI18n();

createRoot(document.getElementById("root")!).render(<App />);
