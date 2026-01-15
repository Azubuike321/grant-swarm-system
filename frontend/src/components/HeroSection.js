import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Database, FileText, Layers, CheckCircle, Cpu, Zap, Globe } from 'lucide-react';

const HeroSection = ({ results, loading }) => {
  // Stagger variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <AnimatePresence mode="wait">
      {!results && !loading && (
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.3 } }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 md:pt-20 pb-20 text-center"
        >
          {/* TOP BADGE: SYSTEM STATUS */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/20 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-cyan-500 uppercase tracking-[0.2em]">System Status: v2.0.4 Online</span>
          </motion.div>

          {/* MAIN TITLES */}
          <motion.div variants={itemVariants}>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white via-white to-slate-600 bg-clip-text text-transparent leading-[0.9] md:leading-[0.95]">
              VERIFIABLE, PRIVACY-PRESERVING <br className="hidden md:block" /> 
              <span className="text-white">GRANT </span> 
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">REVIEWS</span>
            </h2>
            <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-lg mb-12 font-medium leading-relaxed">
              Leveraging <span className="text-white border-b border-cyan-500/30">Amadeus Protocol</span> to deliver unbiased, 
              cryptographically verifiable technical reviews through a distributed swarm of TEE-secured AI agents.
            </p>
          </motion.div>

          {/* THE SWARM VISUALIZER */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 items-center relative mb-20">
            {/* Background Glow behind the center piece */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 blur-[100px] -z-10 rounded-full" />

            {/* STEP 1: INPUT */}
            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} className="relative z-10 p-1">
              <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-[2.5rem] hover:border-cyan-500/30 transition-all duration-500 group">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-cyan-500/10 transition-all">
                  <FileText className="text-slate-400 group-hover:text-cyan-400 transition-colors" size={24} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Stage 01</h4>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Payload Encryption</p>
              </div>
            </motion.div>

            {/* STEP 2: THE CORE (Bigger, more aggressive) */}
            <motion.div variants={itemVariants} className="relative z-20 md:-mx-4">
              <div className="bg-gradient-to-b from-slate-800/80 to-black border border-white/20 p-10 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group">
                {/* Internal Animated Grid */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                <div className="relative z-10">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-2 border-dashed border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Layers className="text-cyan-400" size={40} />
                  </motion.div>
                  <h4 className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400 mb-1">Swarm-TEE</h4>
                  <p className="text-[10px] font-mono text-slate-500">Processing in iExec Enclave</p>
                </div>
              </div>
            </motion.div>

            {/* STEP 3: OUTPUT */}
            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} className="relative z-10 p-1">
              <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-[2.5rem] hover:border-blue-500/30 transition-all duration-500 group">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-blue-500/10 transition-all">
                  <CheckCircle className="text-slate-400 group-hover:text-blue-400 transition-colors" size={24} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Stage 03</h4>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Arweave Anchoring</p>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM METRICS BAR */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
          >
            {[
              { icon: <Cpu size={14} />, label: "Agents", value: "128 Active" },
              { icon: <Zap size={14} />, label: "Latency", value: "420ms" },
              { icon: <Globe size={14} />, label: "Network", value: "Mainnet" },
              { icon: <Shield size={14} />, label: "Security", value: "TEE-Proof" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl text-left">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  {stat.icon}
                  <span className="text-[9px] font-black uppercase tracking-widest">{stat.label}</span>
                </div>
                <div className="text-sm font-mono font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA SCROLL INDICATOR */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-px h-16 bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500/60">Initialize Submission</span>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default HeroSection;