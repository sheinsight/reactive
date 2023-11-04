// import { createRoot } from "react-dom/client";
import App from "./app";
import { render } from "react-dom"

const root = document.getElementById("root") as HTMLElement;

// createRoot(root).render(<App />);

render(<App />, root)
