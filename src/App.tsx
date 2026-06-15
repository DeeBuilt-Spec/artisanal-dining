import { Routes, Route, Navigate } from "react-router-dom";
import { SpecChrome } from "@/components/spec-chrome";
import Index from "./pages/Index";
import Site1Artisan from "./pages/Site1Artisan";
import Site2Boutique from "./pages/Site2Boutique";
import Site3Edgy from "./pages/Site3Edgy";
import Site4Minimalist from "./pages/Site4Minimalist";
import Site5Grunge from "./pages/Site5Grunge";

export default function App() {
  return (
    <SpecChrome>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/site1" element={<Site1Artisan />} />
        <Route path="/site2" element={<Site2Boutique />} />
        <Route path="/site3" element={<Site3Edgy />} />
        <Route path="/site4" element={<Site4Minimalist />} />
        <Route path="/site5" element={<Site5Grunge />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SpecChrome>
  );
}
