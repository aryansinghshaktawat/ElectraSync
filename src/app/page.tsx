"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, UserCheck, FileSearch, Vote, BarChart4 } from "lucide-react";

/**
 * Election Protocol Content Data
 */
const timelineData = [
  {
    id: "voter-registration",
    title: "Voter Registration",
    icon: UserCheck,
    description: "The foundational step ensuring every eligible citizen is securely added to the electoral roll. Involves multi-factor identity verification and deduplication algorithms.",
    details: [
      "Biometric deduplication across national databases.",
      "Secure API integration with civic identity providers.",
      "Real-time fraud anomaly detection."
    ]
  },
  {
    id: "manifesto-verification",
    title: "Manifesto Verification",
    icon: FileSearch,
    description: "AI-driven analysis of political manifestos against factual databases and legal frameworks to prevent misinformation and ensure compliance.",
    details: [
      "NLP-based fact-checking against trusted civic APIs.",
      "Sentiment analysis and compliance scoring.",
      "Automated flagging of policy violations."
    ]
  },
  {
    id: "polling-day-protocol",
    title: "Polling Day Protocol",
    icon: Vote,
    description: "High-security coordination of polling stations. Ensures electronic voting machines are tamper-proof and voting environment is monitored.",
    details: [
      "End-to-end encryption for vote casting.",
      "IoT monitoring of polling station integrity.",
      "Distributed ledger (blockchain) ballot tracking."
    ]
  },
  {
    id: "result-tabulation",
    title: "Result Tabulation",
    icon: BarChart4,
    description: "Real-time, transparent aggregation of voting data. Cryptographically verifiable results published via secure decentralized channels.",
    details: [
      "Zero-knowledge proof verification of totals.",
      "Live dashboard updates with <50ms latency.",
      "Post-election audit trail generation."
    ]
  }
];

/**
 * ElectraSync Main Dashboard Component
 * Designed with a focus on WCAG compliance and high-performance animations.
 */
export default function Dashboard() {
  const [activeNode, setActiveNode] = useState(timelineData[0]);

  return (
    <main className="flex-1 flex flex-col items-center justify-start p-6 md:p-12 lg:p-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/20 blur-[120px] rounded-full"></div>
      </div>

      <header className="w-full max-w-5xl mb-16 text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center space-x-3 bg-gray-900/50 backdrop-blur-md border border-cyan-500/30 px-6 py-2 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.2)]"
        >
          <ShieldCheck className="w-6 h-6 text-cyan-400" aria-hidden="true" />
          <h1 className="text-xl md:text-2xl font-semibold tracking-wide text-cyan-50">
            ElectraSync <span className="text-cyan-400 font-light">| Intelligence Terminal</span>
          </h1>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Advanced civic technology infrastructure. Select a protocol node below to analyze the operational breakdown.
        </motion.p>
      </header>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Timeline Navigation */}
        <section 
          className="lg:col-span-5 flex flex-col space-y-4 relative"
          aria-label="Election Protocol Timeline"
        >
          {/* Vertical Timeline Line (Desktop) */}
          <div className="hidden lg:block absolute left-8 top-8 bottom-8 w-0.5 bg-gray-800 -z-10" aria-hidden="true"></div>

          {timelineData.map((node, idx) => {
            const Icon = node.icon;
            const isActive = activeNode.id === node.id;
            
            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(node)}
                aria-label={`View details for ${node.title}`}
                aria-current={isActive ? "step" : undefined}
                className={`group relative flex items-center p-4 rounded-xl transition-all duration-300 border text-left ${
                  isActive 
                    ? "bg-cyan-950/40 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]" 
                    : "bg-gray-900/40 border-gray-800 hover:border-gray-600 hover:bg-gray-800/50"
                }`}
              >
                <div 
                  className={`flex items-center justify-center w-12 h-12 rounded-lg shrink-0 transition-colors duration-300 ${
                    isActive ? "bg-cyan-500 text-gray-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "bg-gray-800 text-gray-400 group-hover:text-gray-200"
                  }`}
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className={`font-medium text-lg transition-colors duration-300 ${isActive ? "text-cyan-50" : "text-gray-300"}`}>
                    {node.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Step 0{idx + 1}</p>
                </div>
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </button>
            );
          })}
        </section>

        {/* Detailed Info Panel */}
        <section 
          className="lg:col-span-7 bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none" aria-hidden="true"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20" aria-hidden="true">
                  <activeNode.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-3xl font-semibold text-white tracking-tight">
                  {activeNode.title}
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-cyan-500 uppercase tracking-widest mb-2">Protocol Overview</h4>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {activeNode.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-cyan-500 uppercase tracking-widest mb-3">Key Operations</h4>
                  <ul className="space-y-3">
                    {activeNode.details.map((detail, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                        className="flex items-start text-gray-300 bg-gray-800/30 p-3 rounded-lg border border-gray-700/50"
                      >
                        <span className="text-green-400 mr-3 mt-1" aria-hidden="true">▹</span>
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

      </div>
    </main>
  );
}
