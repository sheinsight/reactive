import { createRoot } from "react-dom/client";
import App from "./app";

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(<App />);
