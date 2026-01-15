import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { 
  Shield, Database, CheckCircle, ExternalLink, Search, RefreshCw, Zap, Lock,
  FileText, Layers, AlertTriangle, ShieldAlert, Cpu, Fingerprint, Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GrantForm = () => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [logs, setLogs] = useState([]);
    const [verifying, setVerifying] = useState(false);
    const [verifyId, setVerifyId] = useState('');
    const scrollRef = useRef(null);

    const [formData, setFormData] = useState({
        fullName: '', email: '', country: '', telegram: '', twitter: '',
        position: '', title: '', description: '', budget: '', githubUrl: ''
    });

    // Neural Pulse: Auto-scroll terminal when new logs arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    const addLog = (msg, type = 'default') => {
        const timestamp = new Date().toLocaleTimeString([], { hour12: false });
        const prefix = type === 'error' ? '✖' : type === 'success' ? '✔' : '>';
        setLogs(prev => [`${prefix} ${timestamp}: ${msg}`, ...prev]);
    };
    
    const RED_ZONE = 60; 
    const FRAUD_THRESHOLD = 80; 

    const getSystemState = (res) => {
        if (!res) return { isDanger: false };
        const score = parseFloat(res.finalScore || res.score || 0);
        const risk = res.swarmResult?.risk?.score || res.agentBreakdown?.risk?.score || 0;
        const isDisputed = res.consensusLevel === 'DISPUTED';
        const isFraud = risk >= FRAUD_THRESHOLD;
        const isCriticalFail = score === 0 || isDisputed || score < RED_ZONE;
        return { isFraud, isCriticalFail, isDanger: isFraud || isCriticalFail };
    };

    const handleVerify = async () => {
        if (!verifyId) return;
        setVerifying(true);
        setResults(null);
        addLog(`Initiating Integrity Check for TX: ${verifyId.substring(0, 12)}...`);
        try {
          const res = await axios.get(`/api/verify/${verifyId}`);
          const verifiedData = res.data.data ? res.data.data : res.data; 
          setResults({ ...verifiedData, arweaveId: verifyId });
          addLog("PERMAWEB CHECK: Integrity Verified. Data matches on-chain state.", 'success');
        } catch (err) {
          addLog("VERIFICATION FAILED: ID not found or manipulated.", 'error');
        } finally {
          setVerifying(false);
        }
    };

    const handleReview = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLogs([]);
        setResults(null);
        
        addLog("Initializing GRANTSWARM AI Orchestrator...");
        
        try {
          await new Promise(r => setTimeout(r, 600));
          addLog("Encrypting payload via iExec TEE DataProtector...");
          
          const res = await axios.post('/api/review', formData);
          const finalData = res.data.data ? res.data.data : res.data;
          
          addLog(`Scanning GitHub API: ${formData.githubUrl}`);
          await new Promise(r => setTimeout(r, 1000));
          addLog("Running Consensus Algorithm across 5 Swarm Agents...");

          const state = getSystemState(finalData);
          if (state.isFraud) {
            addLog("🛑 SECURITY ALERT: High anomaly score detected.", 'error');
          } else if (state.isDanger) {
            addLog("⚠️ DISPUTED: Swarm intelligence failed to reach consensus.", 'error');
          } else {
            addLog("✅ CONSENSUS REACHED: Project viability confirmed.", 'success');
          }

          setResults(finalData);
          const displayId = finalData.arweaveId || finalData.stateProof;
          addLog(`State Proof anchored to Arweave: ${displayId?.substring(0,12)}...`, 'success');
        } catch (err) {
          addLog("CONNECTION ERROR: Swarm node unreachable.", 'error');
        } finally {
          setLoading(false);
        }
    };

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pb-24 pt-8 text-slate-200">
            
            {/* Left Column: Form & Verification */}
            <section className="lg:col-span-6 space-y-8">
              
              {/* Verification Search Bar */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/40 backdrop-blur-xl p-4 rounded-3xl border border-white/5 flex gap-3 shadow-2xl"
              >
                <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                  <input 
                    className="w-full bg-slate-900/50 border border-white/5 focus:border-cyan-500/50 outline-none py-3 pl-12 pr-4 rounded-2xl text-xs font-mono text-white transition-all placeholder:text-slate-600"
                    placeholder="VERIFY ARWEAVE AUDIT ID..."
                    value={verifyId}
                    onChange={(e) => setVerifyId(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleVerify}
                  disabled={verifying}
                  className="bg-slate-800 hover:bg-slate-700 text-cyan-400 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-cyan-400/10 active:scale-95"
                >
                  {verifying ? <RefreshCw className="animate-spin" size={16} /> : "Verify"}
                </button>
              </motion.div>

              {/* Main Grant Form */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-slate-900/60 backdrop-blur-2xl p-6 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Fingerprint size={120} />
                </div>

                <h2 className="text-[10px] font-black mb-8 flex items-center gap-2 text-slate-400 uppercase tracking-[0.2em]">
                  <Zap size={14} className="text-cyan-400 animate-pulse" /> Apply For Grant (Intelligence)
                </h2>
                
                <form onSubmit={handleReview} className="space-y-4 font-mono relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required className="w-full bg-black/40 border border-white/10 p-3.5 rounded-2xl text-sm text-white focus:border-cyan-500/50 outline-none transition-colors" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} placeholder="Full Name" />
                    <input type="email" required className="w-full bg-black/40 border border-white/10 p-3.5 rounded-2xl text-sm text-white focus:border-cyan-500/50 outline-none transition-colors" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required className="w-full bg-black/40 border border-white/10 p-3.5 rounded-2xl text-sm text-white" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} placeholder="Country" />
                    <input required className="w-full bg-black/40 border border-white/10 p-3.5 rounded-2xl text-sm text-white" value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} placeholder="Role / Position" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="w-full bg-black/40 border border-white/10 p-3.5 rounded-2xl text-sm text-white" value={formData.telegram} onChange={(e) => setFormData({...formData, telegram: e.target.value})} placeholder="Telegram" />
                    <input className="w-full bg-black/40 border border-white/10 p-3.5 rounded-2xl text-sm text-white" value={formData.twitter} onChange={(e) => setFormData({...formData, twitter: e.target.value})} placeholder="Twitter (X)" />
                  </div>
                  <input required className="w-full bg-black/40 border border-white/10 p-3.5 rounded-2xl text-sm text-white" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Project Title" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="number" required className="w-full bg-black/40 border border-white/10 p-3.5 rounded-2xl text-sm text-white" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} placeholder="Budget ($)" />
                    <input className="w-full bg-black/40 border border-white/10 p-3.5 rounded-2xl text-sm text-white" value={formData.githubUrl} onChange={(e) => setFormData({...formData, githubUrl: e.target.value})} placeholder="GitHub Repository" />
                  </div>
                  <textarea required className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl h-32 text-sm text-white resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Technical Summary" />
                  
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={loading} 
                    className={`w-full py-5 rounded-2xl font-black text-xs tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-3 shadow-xl ${loading ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-cyan-500/20'}`}
                  >
                    {loading ? <RefreshCw className="animate-spin" /> : "Initiate Swarm Scan"}
                  </motion.button>
                </form>
              </motion.div>
            </section>
            
            {/* Right Column: Console & Dynamic Results */}
            <section className="lg:col-span-6 space-y-6">
              <div className="bg-black/60 backdrop-blur-md rounded-[2.5rem] border border-white/10 overflow-hidden font-mono shadow-2xl">
                <div className="bg-slate-900/80 px-6 py-3 border-b border-white/5 flex justify-between items-center text-[9px] text-slate-500 font-black uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Terminal size={12} className="text-cyan-400" /> Live Swarm Analytics</span>
                  <div className="flex gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /></div>
                </div>
                <div ref={scrollRef} className="p-6 h-48 overflow-y-auto text-[10px] scroll-smooth">
                  <AnimatePresence mode='popLayout'>
                    {[...logs].reverse().map((log, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        key={i} 
                        className={`${i === 0 ? "text-cyan-400" : "text-slate-500"} mb-1 font-mono`}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {logs.length === 0 && <div className="text-slate-700 italic">Waiting for orchestrator signal...</div>}
                </div>
              </div>

              {results && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                  {/* METRIC ANALYSIS CARDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(results.swarmResult || results.agentBreakdown || {}).map(([key, val]) => (
                      <div key={key} className="bg-slate-900/60 border border-white/5 p-6 rounded-[2rem] group hover:border-cyan-500/30 transition-all relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/10 group-hover:bg-cyan-500/40 transition-all" />
                        <p className="text-[9px] text-slate-500 uppercase font-black mb-1 flex justify-between">
                            {key} Metric <Cpu size={12} className="opacity-20" />
                        </p>
                        <p className={`text-3xl font-black ${
                          (key.toLowerCase() === 'risk' && val.score > 50) || getSystemState(results).isDanger ? 'text-red-500' : 'text-white'
                        }`}>
                          {val.score}<span className="text-xs text-slate-600 ml-1">/100</span>
                        </p>
                        <p className="text-[10px] text-slate-400 mt-3 italic leading-relaxed">"{val.logic}"</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* MAIN AUDIT VERIFICATION CARD */}
                  <motion.div 
                    layout
                    className={`border p-8 md:p-12 rounded-[3rem] relative overflow-hidden transition-all duration-1000 ${
                        getSystemState(results).isDanger
                        ? 'bg-red-950/40 border-red-500 animate-pulse shadow-[0_0_50px_rgba(239,68,68,0.2)]' 
                        : 'bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-500/5 border-white/10 shadow-2xl'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 relative z-10">
                      <div className="text-center md:text-left">
                        <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${getSystemState(results).isDanger ? 'text-red-500' : 'text-cyan-400'}`}>
                           {getSystemState(results).isFraud ? '🛑 FRAUD DETECTED' : 
                            results.consensusLevel === 'DISPUTED' ? '🛑 DISPUTED' : 
                            getSystemState(results).isDanger ? '⚠️ CRITICAL FAIL' : '✅ Audit Verified'}
                        </h3>
                        <p className="text-slate-600 text-[8px] font-mono break-all max-w-[250px] uppercase tracking-tighter">
                          PROOF: {results.arweaveId || results.stateProof}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-7xl font-black tracking-tighter ${getSystemState(results).isDanger ? 'text-red-500' : 'text-white'}`}>
                          {results.finalScore || results.score || '0'}%
                        </p>
                      </div>
                    </div>

                    {getSystemState(results).isDanger && (
                        <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-4">
                            <ShieldAlert className="text-red-500 shrink-0" size={24} />
                            <p className="text-[9px] text-red-200 uppercase font-mono leading-tight">
                                AI Lockdown: Anomalous data detected. Proposal rejected for manual governance review.
                            </p>
                        </div>
                    )}

                    <div className="mt-10">
                      <a href={`https://gateway.irys.xyz/${results.arweaveId || results.stateProof}`} target="_blank" rel="noreferrer" 
                         className="flex items-center justify-center gap-3 bg-white hover:bg-cyan-400 text-black py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-white/5 active:scale-95">
                        <ExternalLink size={14} /> View Audit Certificate
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </section>
          </main>
  )
}

export default GrantForm;