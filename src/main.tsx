import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import App from "./App";
import "./styles.css";

function RedirectHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = sessionStorage.getItem("redirect");
    if (redirect) {
      sessionStorage.removeItem("redirect");
      const url = new URL(redirect, window.location.origin);
      if (url.pathname !== window.location.pathname) {
        navigate(url.pathname + url.search + url.hash, { replace: true });
      }
    }
  }, [navigate]);
  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RedirectHandler />
      <App />
    </BrowserRouter>
  </StrictMode>
);
