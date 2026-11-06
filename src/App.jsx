import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import PageShell from "./components/PageShell";
import SmoothScroll from "./components/SmoothScroll";
import { ReadyContext, ToneContext, routeMeta } from "./lib/tone";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Developer from "./pages/Developer";
import Events from "./pages/Events";
import Freelancing from "./pages/Freelancing";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import Socials from "./pages/Socials";

const KEY = "awais-studio-intro";

// Show the intro once per session, and never for reduced-motion users.
function shouldShowIntro() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (sessionStorage.getItem(KEY)) return false;
  } catch {
    return false;
  }
  return true;
}

export default function App() {
  const location = useLocation();
  const meta = useMemo(() => routeMeta(location.pathname), [location.pathname]);
  const [loading, setLoading] = useState(shouldShowIntro);

  useEffect(() => {
    document.documentElement.dataset.tone = meta.tone;
  }, [meta.tone]);

  const done = useCallback(() => {
    try { sessionStorage.setItem(KEY, "1"); } catch { /* storage unavailable */ }
    setLoading(false);
  }, []);

  return (
    <SmoothScroll>
      <ReadyContext.Provider value={!loading}>
        <ToneContext.Provider value={meta}>
          <a href="#main" className="skip-link">Skip to content</a>
          <Navbar />
          <AnimatePresence mode="wait" initial={false}>
            <PageShell key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/developer" element={<Developer />} />
                <Route path="/freelancing" element={<Freelancing />} />
                <Route path="/events" element={<Events />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/socials" element={<Socials />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/portfolio" element={<Navigate to="/developer" replace />} />
                <Route path="/services" element={<Navigate to="/freelancing" replace />} />
                <Route path="/websites" element={<Navigate to="/projects" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageShell>
          </AnimatePresence>
          <Footer />
          {loading && <Loader onDone={done} />}
        </ToneContext.Provider>
      </ReadyContext.Provider>
    </SmoothScroll>
  );
}
