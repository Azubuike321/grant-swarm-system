import React, { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Shield, Activity, HardDrive, Cpu } from 'lucide-react';

// --- SUB-COMPONENT: DYNAMIC NEURAL SWARM (ANIMATED UPGRADE) ---
const SwarmBackground = () => {
  const nodes = useMemo(() => [...Array(30)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full opacity-40">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {nodes.map((node, i) => {
          const target = nodes[(i + 1) % nodes.length];
          return (
            <React.Fragment key={`group-${i}`}>
              <motion.line
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke="url(#lineGradient)"
                strokeWidth="0.5"
                strokeOpacity="0.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.1 }}
              />
              <motion.circle
                r="1"
                fill="#818cf8"
                filter="url(#glow)"
                animate={{
                  cx: [`${node.x}%`, `${target.x}%`],
                  cy: [`${node.y}%`, `${target.y}%`],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
              />
            </React.Fragment>
          );
        })}

        {nodes.map((node) => (
          <g key={node.id}>
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size * 3}
              fill="#6366f1"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.15, 0],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Infinity,
                delay: node.delay,
              }}
            />
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="#818cf8"
              filter="url(#glow)"
              animate={{
                opacity: [0.4, 1, 0.4],
                x: [0, Math.random() * 40 - 20, 0],
                y: [0, Math.random() * 40 - 20, 0],
              }}
              transition={{
                duration: node.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}
        
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0" />
          <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
        </linearGradient>
      </svg>
    </div>
  );
};

const NetworkMetric = ({ label, value, color, icon: Icon }) => (
  <motion.div 
    whileHover={{ 
      scale: 1.02, 
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      borderColor: "rgba(99, 102, 241, 0.4)" 
    }}
    // Added hardware acceleration to metrics
    style={{ transform: 'translateZ(0)', WebkitBackfaceVisibility: 'hidden' }}
    className="flex flex-col gap-2 p-4 md:p-5 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl backdrop-blur-xl transition-all relative overflow-hidden group"
  >
    <div className="flex justify-between items-start relative z-10">
      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-indigo-400 transition-colors">{label}</span>
      <Icon size={12} className="text-slate-600 group-hover:text-white group-hover:rotate-12 transition-all md:size-[14px]" />
    </div>
    <span className={`text-xl md:text-2xl font-mono font-bold tracking-tighter relative z-10 ${color}`}>{value}</span>
    <motion.div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </motion.div>
);

const InfrastructureSection = () => {
  const [trustScore, setTrustScore] = useState(99.214);
  const [hexData, setHexData] = useState([]);
  const [pulses, setPulses] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrustScore(s => s + (Math.random() * 0.002 - 0.001));
      setHexData(prev => [Math.random().toString(16).slice(2, 10).toUpperCase(), ...prev].slice(0, 10));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const triggerPulse = () => {
    const id = Date.now();
    setPulses(prev => [...prev, id]);
    setTimeout(() => {
      setPulses(prev => prev.filter(p => p !== id));
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      // Optimization: Force the TEE block into its own GPU layer
      style={{ 
        transform: 'translate3d(0,0,0)', 
        WebkitTransform: 'translate3d(0,0,0)',
        willChange: 'transform, opacity'
      }}
      className="mt-10 md:mt-20 relative perspective-1000"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-5 space-y-8 md:space-y-10 order-2 lg:order-1">
          <div className="space-y-4 md:space-y-6">
            <motion.div animate={{ width: [60, 100, 60] }} transition={{ duration: 4, repeat: Infinity }} className="h-1 bg-indigo-500 rounded-full" />
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Protocol <br/> <span className="text-indigo-500">Integrity</span>
            </h3>
            <p className="text-slate-400 font-medium text-lg md:text-xl leading-relaxed max-w-md">
              Evaluations executed within <span className="text-white font-bold">iExec TEE</span> enclaves. Logic proofs anchored to <span className="text-white font-bold">Arweave</span>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <NetworkMetric label="Trust Score" value={`${trustScore.toFixed(3)}%`} color="text-emerald-400" icon={Activity} />
            <NetworkMetric label="TEE Latency" value="1.2ms" color="text-blue-400" icon={Cpu} />
            <NetworkMetric label="Capacity" value="2.1PB" color="text-indigo-400" icon={HardDrive} />
            <NetworkMetric label="Nodes" value="2,048" color="text-purple-400" icon={Shield} />
          </div>
        </div>

        <div className="lg:col-span-7 relative group order-1 lg:order-2">
          <motion.div 
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-[2rem] md:rounded-[3rem] blur opacity-20"
          />
          
          <div className="relative h-[400px] md:h-[550px] bg-slate-950/80 border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden backdrop-blur-3xl flex flex-col shadow-2xl">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <AnimatePresence>
                {pulses.map(id => (
                  <motion.div
                    key={id}
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 4, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 border-2 border-indigo-400 rounded-full bg-indigo-500/10"
                  />
                ))}
              </AnimatePresence>
            </div>

            <div className="h-12 md:h-14 border-b border-white/10 flex items-center justify-between px-6 md:px-10 bg-white/5 relative z-20">
              <div className="flex gap-1.5">
                {[...Array(3)].map((_, i) => <div key={i} className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/10" />)}
              </div>
              <motion.span 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                className="font-mono text-[8px] md:text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]"
              >
                Enclave: Alpha_Secure
              </motion.span>
            </div>

            <div className="flex flex-1 overflow-hidden relative z-10">
              <div className="w-12 md:w-20 border-r border-white/5 bg-black/20 flex flex-col py-4 items-center gap-2 overflow-hidden">
                {hexData.map((hex, i) => (
                  <motion.span 
                    key={`${hex}-${i}`} 
                    className="font-mono text-[6px] md:text-[8px] text-slate-700 vertical-text rotate-180 uppercase tracking-tighter"
                  >
                    {hex}
                  </motion.span>
                ))}
              </div>

              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative">
                <div className="font-mono text-[9px] md:text-[11px] space-y-2 md:space-y-3">
                    <p className="text-indigo-400 flex items-center gap-2 md:gap-3">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
                      SWARM_PROTOCOL_INITIALIZED
                    </p>
                    <p className="text-slate-500 truncate">{">"} TEE_HANDSHAKE_COMPLETE</p>
                </div>

                <div className="relative flex justify-center items-center py-6 md:py-10">
                    <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute w-48 h-48 md:w-72 md:h-72 border border-indigo-500/20 rounded-full" 
                    />
                    <motion.button 
                        onClick={triggerPulse}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-30 p-6 md:p-10 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-full shadow-[0_0_40px_rgba(79,70,229,0.4)] border border-white/20"
                    >
                        <Shield className="text-white size-8 md:size-[48px]" strokeWidth={2.5} />
                    </motion.button>
                </div>

                <div className="bg-black/60 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/5 font-mono text-[8px] md:text-[10px] text-emerald-400/80 backdrop-blur-md">
                  <div className="flex justify-between items-center">
                    <p className="font-bold truncate">0xBD9...2F1</p>
                    <motion.p animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="font-bold text-right ml-2">
                      ANCHOR_OK
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InfrastructurePage = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  return (
    <div 
      onMouseMove={(e) => { 
        mouseX.set(e.clientX / window.innerWidth - 0.5); 
        mouseY.set(e.clientY / window.innerHeight - 0.5); 
      }} 
      className="min-h-screen bg-[#010413] text-white py-12 md:py-20 px-4 md:px-6 relative overflow-hidden font-sans"
      // Added a global GPU layer for the main page
      style={{ transform: 'translate3d(0,0,0)', WebkitBackfaceVisibility: 'hidden' }}
    >
      <SwarmBackground />
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <motion.div 
        style={{ 
          x: useTransform(smoothX, [-0.5, 0.5], [-300, 300]),
          y: useTransform(smoothY, [-0.5, 0.5], [-300, 300])
        }}
        className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_60%)]" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-16 md:mb-32 space-y-4 md:space-y-6">
          <motion.span 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] inline-block"
          >
            Network Backbone
          </motion.span>
          <h2 className="text-4xl md:text-7xl lg:text-9xl font-black tracking-tighter bg-gradient-to-b from-white via-indigo-200 to-slate-800 bg-clip-text text-transparent leading-tight md:leading-none">
            Deterministic Scale
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Decentralized swarm intelligence, verified by confidential TEE compute and secured by permanent storage.
          </p>
        </header>

        <InfrastructureSection />

        <footer className="mt-24 md:mt-40 text-center border-t border-white/5 pt-10 md:pt-20">
            <div className="flex justify-center flex-wrap gap-6 md:gap-12 text-slate-600 font-mono text-[8px] md:text-[10px] uppercase tracking-widest">
                {['Arweave_Mainnet', 'iExec_Oracle_v7', 'TEE_Cluster'].map((link) => (
                  <motion.span key={link} whileHover={{ color: '#fff' }} className="transition-colors px-2">
                    {link}
                  </motion.span>
                ))}
            </div>
        </footer>
      </div>
    </div>
  );
};

export default InfrastructurePage;