import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoadingScreen from './components/LoadingScreen';
import InfrastructureSection from './components/InfrastructureSection';
import PricingPage from './components/PricingPage'; 
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import BackgroundOrchestrator from './components/BackgroundOrchestrator';
import CapabilitiesSection from './components/CapabilitiesSection';
import GrantForm from './components/GrantForm';

const App = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Router>
      <BackgroundOrchestrator mousePos={mousePos} />
      
      <Routes>
        {/* PRICING PAGE: No Navigation */}
        <Route path="/pricing" element={<PricingPage />} />

        {/* LANDING PAGE */}
        <Route path="/" element={
          <>
            <AnimatePresence mode="wait">
              {isAppLoading && <LoadingScreen key="loader" />}
            </AnimatePresence>

            <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
              
              {/* FIXED NAVIGATION: Only shown after loading is complete */}
              {!isAppLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="fixed top-0 left-0 w-full z-[100]"
                >
                  <Navigation />
                </motion.div>
              )}

              <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div 
                  animate={{ x: mousePos.x, y: mousePos.y }}
                  transition={{ type: "spring", damping: 50, stiffness: 200 }}
                  className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-blue-600/10 blur-[120px] rounded-full" 
                />
                <motion.div 
                  animate={{ x: -mousePos.x, y: -mousePos.y }}
                  transition={{ type: "spring", damping: 50, stiffness: 200 }}
                  className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full" 
                />
              </div>

              {/* MAIN CONTENT */}
              <main className="relative z-10 pt-24 md:pt-32">
                <HeroSection />
                <CapabilitiesSection />
                <GrantForm />
                <InfrastructureSection />
              </main>

              <footer className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-white/5 flex flex-col items-center">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mb-6 relative group"
                >
                  <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full group-hover:bg-cyan-500/40 transition-all duration-700" />
                  <img 
                    src="/footer_logo.png" 
                    alt="GrantSwarm Logo" 
                    className="relative z-10 h-12 md:h-16 w-auto object-contain brightness-110"
                  />
                </motion.div>

                <div className="text-center space-y-3">
                  <p className="text-[9px] md:text-[10px] text-slate-600 font-black uppercase tracking-[0.5em] leading-loose">
                    Backed by <span className="font-bold text-cyan-500">AMADEUS PROTOCOL</span>
                  </p>
                  <div className="flex items-center justify-center gap-4 pt-2">
                     <span className="h-[1px] w-8 bg-white/5" />
                     <span className="text-[8px] font-mono text-slate-800 uppercase tracking-widest">v1.0.4 stable</span>
                     <span className="h-[1px] w-8 bg-white/5" />
                  </div>
                </div>
              </footer>

              <style>{`
                input:-webkit-autofill,
                input:-webkit-autofill:hover, 
                input:-webkit-autofill:focus {
                  -webkit-text-fill-color: white;
                  -webkit-box-shadow: 0 0 0px 1000px #020617 inset;
                  transition: background-color 5000s ease-in-out 0s;
                }
              `}</style>
            </div>
          </>
        } />
      </Routes>
    </Router>
  );
};

export default App;