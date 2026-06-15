import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import App from "./App";
import "./styles.css";

// Vite's BASE_URL is "/" in dev and "/artisanal-dining/" in the Pages build.
// React Router wants a basename without a trailing slash (except the bare "/").
const baseUrl = import.meta.env.BASE_URL;
const basename = baseUrl === "/" ? "/" : baseUrl.replace(/\/$/, "");

function RedirectHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = sessionStorage.getItem("redirect");
    if (redirect) {
      sessionStorage.removeItem("redirect");
      const url = new URL(redirect, window.location.origin);
      // Strip the base path so navigate() (which is basename-relative) gets an
      // in-app route, e.g. "/artisanal-dining/site1" -> "/site1".
      let routePath = url.pathname;
      if (basename !== "/" && routePath.startsWith(basename)) {
        routePath = routePath.slice(basename.length) || "/";
      }
      const current =
        window.location.pathname + window.location.search + window.location.hash;
      const target = routePath + url.search + url.hash;
      if (target !== current) {
        navigate(target, { replace: true });
      }
    }
  }, [navigate]);
  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <RedirectHandler />
      <App />
    </BrowserRouter>
  </StrictMode>
);
