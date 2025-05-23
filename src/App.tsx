import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import About from "./pages/About";
import Team from "./pages/Team";
import JobAnalysis from "./pages/JobAnalysis";
import NotFound from "./pages/NotFound";
import Chatbot from "@/components/chatbot";  // ✅ Chatbot now global

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/job-analysis" element={<JobAnalysis />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        <Chatbot />  {/* ✅ Moved here to appear on all pages */}
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
