import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Fingerprint, Search, ShieldCheck, Zap, Database } from 'lucide-react';

const CapabilitiesSection = () => {
  const features = [
    {
      icon: <Brain className="text-cyan-400" size={24} />,
      title: "Deep Technical Logic",
      desc: "Our agents don't just read text; they analyze repo structures and logic flow for actual feasibility."
    },
    {
      icon: <Fingerprint className="text-purple-400" size={24} />,
      title: "Identity Privacy",
      desc: "Zero-knowledge proofs ensure applicant identity is shielded from evaluators to prevent bias."
    },
    {
      icon: <ShieldCheck className="text-emerald-400" size={24} />,
      title: "TEE Secured",
      desc: "Computations run in hardware-isolated enclaves, making the review process tamper-proof."
    },
    {
      icon: <Database className="text-blue-400" size={24} />,
      title: "Immutable Logs",
      desc: "Every review step is hashed and anchored to Arweave for a permanent, public audit trail."
    }
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-24">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-xl">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-cyan-500 mb-4">Protocol Specs</h3>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-none">
            ENGINEERED FOR <br /> <span className="text-slate-500">ABSOLUTE OBJECTIVITY.</span>
          </h2>
        </div>
        <p className="max-w-xs text-slate-500 text-xs font-mono leading-relaxed border-l border-white/10 pl-4">
          // The swarm utilizes distributed compute nodes to ensure no single entity can influence the grant outcome.
        </p>
      </div>

      {/* FEATURE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.03)" }}
            className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 transition-all group relative overflow-hidden"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="mb-6 p-3 w-fit rounded-xl bg-slate-900/50 border border-white/5 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest text-white mb-3">{f.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                {f.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* BOTTOM DECORATION */}
      <div className="mt-16 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500/20" />
          ))}
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
};

export default CapabilitiesSection;