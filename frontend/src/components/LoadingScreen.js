import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [percent, setPercent] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30);
    
    // Random glitch effect interval
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2, filter: "blur(30px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#010413] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 1. CYBER GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010413] via-transparent to-[#010413]" />
      </div>

      {/* 2. DYNAMIC SCAN LINE */}
      <motion.div 
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_20px_#22d3ee] z-20 opacity-40"
      />

      {/* 3. RADIAL DATA STREAM */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
            className="absolute border border-cyan-500/20 rounded-full"
            style={{ width: `${(i + 1) * 300}px`, height: `${(i + 1) * 300}px` }}
          />
        ))}
      </div>

      {/* 4. THE CORE ENGINE */}
      <div className="relative flex flex-col items-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          
          {/* SVG Connection Filaments */}
          <svg className="absolute inset-0 w-full h-full rotate-45">
            {[...Array(8)].map((_, i) => (
              <motion.line
                key={i}
                x1="50%" y1="50%"
                x2="100%" y2="50%"
                stroke="rgba(34, 211, 238, 0.2)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                style={{ rotate: `${i * 45}deg`, transformOrigin: 'center' }}
              />
            ))}
          </svg>

          {/* Rotating Geometric Rings */}
          <motion.div 
            animate={{ rotate: 360, borderStyle: glitch ? 'solid' : 'dashed' }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-[2px] border-cyan-500/30 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-8 border-[1px] border-blue-400/20 rounded-full shadow-[inset_0_0_20px_rgba(34,211,238,0.1)]"
          />
          
          {/* Logo with Energy Pulse */}
          <motion.div
            animate={glitch ? { x: [-2, 2, -1], filter: "hue-rotate(90deg)" } : { scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative z-10 w-28 h-28 md:w-36 md:h-36"
          >
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain brightness-110 drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]" />
          </motion.div>
        </div>

        {/* 5. HUD METRICS */}
        <div className="mt-8 flex flex-col items-center gap-6 relative">
          <motion.div 
            animate={glitch ? { x: [2, -2] } : {}}
            className="flex flex-col items-center"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-black text-white font-mono tracking-tighter tabular-nums">
                {percent.toString().padStart(3, '0')}
              </span>
              <div className="flex flex-col">
                <span className="text-cyan-400 font-bold text-[10px] uppercase tracking-[0.3em] leading-none">Percent</span>
                <span className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">Compiled</span>
              </div>
            </div>
          </motion.div>

          {/* Progress Bar with Glow */}
          <div className="w-64 h-[2px] bg-white/5 relative overflow-hidden rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600"
              initial={{ x: "-100%" }}
              animate={{ x: `${percent - 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-4 opacity-40">
              {[...Array(4)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1 h-1 bg-cyan-400 rounded-full"
                />
              ))}
            </div>
            <div className="h-6 flex items-center justify-center">
               <TypewriterText text="INITIALIZING QUANTUM SWARM... | ESTABLISHING TEE HANDSHAKE... | DEPLOYING ADAPTIVE AGENTS... | ANCHORING PROOF TO ARWEAVE..." />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM DECOR: SYSTEM STATUS */}
      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end font-mono text-[8px] text-slate-600 uppercase tracking-[0.4em] opacity-50">
        <div className="flex flex-col gap-1">
          <span>Sys_Kernel: v7.0.2_Amadeus</span>
          <span>Security_Level: TEE_ENCLAVE_ALPHA</span>
        </div>
        <div className="text-right">
          <span>Loc: 0x221...FF9</span>
          <span>Status: Synchronizing</span>
        </div>
      </div>
    </motion.div>
  );
};

const TypewriterText = ({ text }) => {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const parts = text.split(" | ");
    const currentPart = parts[index % parts.length];
    
    let charIndex = 0;
    const interval = setInterval(() => {
      setCurrentText(currentPart.substring(0, charIndex));
      charIndex++;
      if (charIndex > currentPart.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIndex(prev => prev + 1);
        }, 1800);
      }
    }, 35);
    
    return () => clearInterval(interval);
  }, [index, text]);

  return <span className="text-[10px] font-mono text-cyan-500/60 font-bold uppercase tracking-[0.2em]">{currentText}</span>;
};

export default LoadingScreen;