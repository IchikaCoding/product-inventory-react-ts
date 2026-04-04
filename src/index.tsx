import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App-v2.tsx";

// `!`はnullアサーション
// getElementByIdでHTMLElementかnullが返ってくるけど、!を書くと、nullじゃないよと伝えることができる

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
