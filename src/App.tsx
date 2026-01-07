import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/hooks/useLanguage";
import Index from "./pages/Index";

const App = () => (
  <BrowserRouter>
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/en" element={<Index />} />
        <Route path="/de" element={<Index />} />
      </Routes>
    </LanguageProvider>
  </BrowserRouter>
);

export default App;
