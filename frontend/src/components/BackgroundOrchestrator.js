import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const BackgroundOrchestrator = ({ mousePos }) => {
  // Memoize snippets so they don't rerender and jump around
  const snippets = useMemo(() => [
    "0x71C...A42b CONNECTED",
    "ENCRYPTING_TEE_PAYLOAD...",
    "ARWEAVE_TX_PENDING",
    "SWARM_NODES: 128_ACTIVE",
    "AI_AGENT_04_VERIFIED",
    "NON_CUSTODIAL_HANDSHAKE",
    "iExec_ENCLAVE_LOCKED",
    "GRANT_ORACLE_INIT"
  ], []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#020617]">
      {/* 1. MOUSE TRACKING GLOWS */}
      <motion.div 
        animate={{ x: mousePos.x * 1.5, y: mousePos.y * 1.5 }}
        transition={{ type: "spring", damping: 50, stiffness: 150 }}
        className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-cyan-600/10 blur-[130px] rounded-full" 
      />
      <motion.div 
        animate={{ x: -mousePos.x, y: -mousePos.y }}
        transition={{ type: "spring", damping: 50, stiffness: 150 }}
        className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[130px] rounded-full" 
      />

      {/* 2. FLOATING CODE SNIPPETS (The "Swarm" Intelligence) */}
      {snippets.map((text, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
          animate={{ 
            y: ["0%", "100%"],
            opacity: [0, 0.4, 0],
          }}
          transition={{ 
            duration: 15 + Math.random() * 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: i * 2 
          }}
          className="absolute text-[8px] font-mono text-cyan-500/40 whitespace-nowrap tracking-[0.2em] hidden md:block"
        >
          {text}
        </motion.div>
      ))}

      {/* 3. NEURAL GRID OVERLAY */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, #06b6d4 1px, transparent 0)`,
          backgroundSize: '40px 40px' 
        }} 
      />
    </div>
  );
};

export default BackgroundOrchestrator;