import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wallet, Globe, ChevronDown, Activity, LogOut } from 'lucide-react';

const Navigation = ({ reset }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Simulation of Amadeus Protocol Wallet Connection
  const connectAmadeus = async () => {
    setIsConnecting(true);
    // Mimic TEE-based secure handshake
    await new Promise(r => setTimeout(r, 1200)); 
    setWalletAddress("0x71C...A42b");
    setIsConnecting(false);
  };

  return (
    <header className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-8 flex justify-between items-center border-b border-white/5 backdrop-blur-md">
      
      {/* LEFT: LOGO SECTION */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-2 md:gap-3 group cursor-pointer" 
        onClick={reset}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <img 
            src="/logo.png" 
            alt="GrantSwarm" 
            className="relative w-10 h-10 md:w-16 md:h-16 object-contain group-hover:rotate-[360deg] transition-transform duration-1000" 
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm md:text-xl font-black uppercase tracking-tighter bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-transparent hidden sm:block">
            GrantSwarm
          </span>
          <span className="text-[7px] md:text-[9px] font-mono text-cyan-500 tracking-[0.3em] font-bold hidden sm:block">
            SWARM PROTOCOL ACTIVE
          </span>
        </div>
      </motion.div>

      {/* RIGHT: ACTION HUB */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* NETWORK STATUS */}
        <div className="hidden lg:flex items-center gap-2 bg-black/40 border border-white/5 px-3 py-2 rounded-full">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </div>
          <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest">Amadeus-Mainnet</span>
        </div>

        {/* PRICING BUTTON - Visible on all screens */}
        <Link to="/pricing">
          <motion.button 
            whileHover={{ y: -2 }}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors px-2 md:px-4"
          >
            Pricing
          </motion.button>
        </Link>

        {/* AMADEUS WALLET INTEGRATION */}
        <AnimatePresence mode="wait">
          {!walletAddress ? (
            <motion.button
              key="connect"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={connectAmadeus}
              disabled={isConnecting}
              className="group relative flex items-center gap-2 bg-white text-black px-3.5 md:px-6 py-2.5 md:py-3 rounded-xl text-[10px] font-black uppercase tracking-widest overflow-hidden transition-all"
            >
              {isConnecting ? (
                <Activity className="animate-spin" size={14} />
              ) : (
                <Wallet size={14} className="group-hover:rotate-12 transition-transform" />
              )}
              {/* Text hidden on small screens, shown from md up */}
              <span className="hidden md:block">
                {isConnecting ? "Handshaking..." : "Connect Amadeus"}
              </span>
              <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
            </motion.button>
          ) : (
            <motion.div
              key="address"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 pl-4 pr-2 py-1.5 md:py-2 rounded-xl"
            >
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-white">{walletAddress}</span>
                <span className="text-[7px] font-mono text-cyan-400">Verified Identity</span>
              </div>
              <button 
                onClick={() => setWalletAddress(null)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
              >
                <LogOut size={14} className="text-slate-500 group-hover:text-red-500" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MOBILE MENU ICON */}
        <div className="md:hidden p-2 bg-white/5 rounded-lg border border-white/10">
          <Globe size={18} className="text-cyan-500" />
        </div>
      </div>
    </header>
  );
};

export default Navigation;