import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CheckCircle, ArrowLeft, Zap, Shield, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingCard = ({ plan, i, globalMouseX, globalMouseY }) => {
  const rotateX = useTransform(globalMouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(globalMouseX, [-0.5, 0.5], [-7, 7]);
  const springX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.6 }}
      className={`relative p-8 md:p-12 rounded-[3rem] flex flex-col group transition-all duration-500 ${
        plan.recommended 
        ? 'bg-slate-900/80 border-2 border-indigo-500/50 shadow-[0_0_80px_rgba(99,102,241,0.15)] backdrop-blur-xl' 
        : 'bg-slate-900/40 border border-white/10 backdrop-blur-md hover:border-white/20'
      }`}
    >
      {/* Dynamic Internal Glow that reacts to group hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${plan.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem] pt-20 md:pt-32`} />
      
      {/* Animated Border Beam for Recommended Card */}
      {plan.recommended && (
        <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-[100%] opacity-30 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#6366f1_360deg)]"
          />
        </div>
      )}

      {plan.recommended && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-blue-600 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full border border-white/20 z-20 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
          Recommended
        </div>
      )}

      <div className="flex items-center justify-between mb-8 relative z-10">
          <h3 className="text-3xl font-black tracking-tight uppercase italic">{plan.name}</h3>
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.2 }}
            className="p-2 bg-white/5 rounded-lg border border-white/10"
          >
            {plan.icon}
          </motion.div>
      </div>
      
      <div className="flex items-baseline gap-2 mb-10 relative z-10" style={{ transform: 'translateZ(50px)' }}>
        <span className="text-6xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent">
          {plan.price}
        </span>
        <div className="flex flex-col">
          <span className="text-indigo-400 text-xs font-black uppercase tracking-widest">
            {plan.name === "Enterprise" ? "Annual" : "$AMA"}
          </span>
          {plan.name !== "Enterprise" && (
            <span className="text-slate-600 text-[9px] font-black leading-tight uppercase">PER<br/>PROGRAM</span>
          )}
        </div>
      </div>

      <div className="space-y-5 mb-14 flex-grow relative z-10">
        {plan.features.map(feature => (
          <div key={feature} className="flex items-start gap-4 group/item">
            <CheckCircle className={`${plan.recommended ? 'text-indigo-400' : 'text-slate-600'} mt-1 transition-colors group-hover/item:text-white`} size={16} />
            <span className="text-sm text-slate-400 font-medium group-hover/item:text-slate-200 transition-colors duration-300">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02, translateZ: 30 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all relative z-10 border shadow-2xl ${
          plan.recommended 
          ? 'bg-indigo-600 border-indigo-400 text-white hover:bg-indigo-500' 
          : 'bg-white/5 border-white/10 text-white hover:bg-white hover:text-black'
        }`}
      >
        {plan.buttonText}
      </motion.button>
    </motion.div>
  );
};

const PricingPage = () => {
  const navigate = useNavigate();
  const [terminalStep, setTerminalStep] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX / window.innerWidth - 0.5);
    mouseY.set(clientY / window.innerHeight - 0.5);
  };

  const logs = [
    "0x71C...A42b CONNECTED",
    "ENCRYPTING_TEE_PAYLOAD...",
    "ARWEAVE_TX_PENDING",
    "SWARM_NODES: 128_ACTIVE",
    "AI_AGENT_04_VERIFIED",
    "NON_CUSTODIAL_HANDSHAKE",
    "iExec_ENCLAVE_LOCKED",
    "GRANT_ORACLE_INIT"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalStep((prev) => (prev < logs.length ? prev + 1 : prev));
    }, 120);
    return () => clearInterval(timer);
  }, [logs.length]);

  const plans = [
    {
      name: "Starter",
      icon: <Zap size={18} className="text-blue-400" />,
      price: "500",
      features: ["3 Agent Swarm", "Basic Arweave Storage", "Standard TEE Enclave", "Up to 50 proposals"],
      buttonText: "Start Small",
      recommended: false,
      glow: "from-blue-500/10"
    },
    {
      name: "Professional",
      icon: <Shield size={18} className="text-indigo-400" />,
      price: "1,500",
      features: ["5 Custom Agents", "Permanent Arweave Storage", "High-Memory TEE", "Unlimited proposals", "Bias Detection Meta-Agent"],
      buttonText: "Launch Swarm",
      recommended: true,
      glow: "from-indigo-500/20"
    },
    {
      name: "Enterprise",
      icon: <Crown size={18} className="text-purple-400" />,
      price: "Custom",
      features: ["Custom Agent Logic", "Dedicated Enclave Cluster", "SLA Guarantees", "White-labeled Proofs", "Priority Support"],
      buttonText: "Contact Sales",
      recommended: false,
      glow: "from-purple-500/10"
    }
  ];

  return (
    <div onMouseMove={handleMouseMove} className="min-h-screen bg-[#020617] text-white py-20 px-6 relative overflow-hidden font-sans selection:bg-indigo-500">
      
      {/* Background Polish */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Spotlight effect following the mouse */}
      <motion.div 
        style={{ 
          left: useTransform(smoothMouseX, [-0.5, 0.5], ['20%', '80%']),
          top: useTransform(smoothMouseY, [-0.5, 0.5], ['20%', '80%']),
        }}
        className="fixed w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- TERMINAL LOGS --- */}
        <div className="mb-16 font-mono text-[10px] md:text-xs flex flex-col items-center">
            <div className="bg-black/60 border border-white/10 p-4 rounded-xl backdrop-blur-md w-full max-w-2xl shadow-2xl relative overflow-hidden group">
                {/* CRT Screen Scanline effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-[200%] w-full pointer-events-none animate-[scan_10s_linear_infinite]" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 relative z-10">
                    {logs.map((log, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: i < terminalStep ? 1 : 0, x: i < terminalStep ? 0 : -5 }}
                            className={`${i === 0 ? 'text-emerald-400' : 'text-slate-500'} font-bold uppercase flex items-center gap-1`}
                        >
                            {i < terminalStep && <span className="w-1 h-1 bg-current rounded-full animate-pulse" />}
                            {log}
                        </motion.div>
                    ))}
                    {terminalStep < logs.length && (
                      <motion.div animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-2 h-4 bg-indigo-500" />
                    )}
                </div>
            </div>
        </div>

        {/* --- HEADER --- */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block px-4 py-1 border border-indigo-500/30 rounded-full bg-indigo-500/5 mb-6"
          >
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">Network Tiers</span>
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white via-white to-slate-600 bg-clip-text text-transparent">
            Scalable Monetization
          </h2>
          <p className="text-slate-400 font-medium max-w-xl mx-auto text-lg leading-relaxed">
            Deterministic evaluations priced for every scale of governance using the native <span className="text-white font-bold tracking-widest">$AMA</span> utility token.
          </p>
        </div>

        {/* --- PRICING GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch perspective-1000">
          {plans.map((plan, i) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              i={i} 
              globalMouseX={smoothMouseX} 
              globalMouseY={smoothMouseY} 
            />
          ))}
        </div>
        
        {/* --- FOOTER --- */}
        <div className="mt-24 text-center">
          <button 
            onClick={() => navigate('/')} 
            className="group inline-flex items-center gap-3 text-slate-500 hover:text-white transition-all duration-500"
          >
            <div className="p-2 rounded-full border border-transparent group-hover:border-white/10 group-hover:bg-white/5 transition-all">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Return to Console</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          from { transform: translateY(-50%); }
          to { transform: translateY(50%); }
        }
      `}</style>
    </div>
  );
};

export default PricingPage;