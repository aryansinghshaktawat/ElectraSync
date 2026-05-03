"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Download } from "lucide-react";

export default function Header() {
  const handleDownloadGuide = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'download_guide', {
        event_category: 'resources',
        event_label: 'election_protocol_guide.pdf'
      });
    }
    alert("Fetching 'election_protocol_guide.pdf' from Google Cloud Storage bucket (gs://electrasync-assets/...).");
  };

  return (
    <header className="w-full max-w-5xl mb-16 text-center space-y-6">
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
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex flex-col items-center justify-center space-y-4"
      >
        <p className="text-gray-400 max-w-2xl mx-auto">
          Advanced civic technology infrastructure. Complete the Virtual Voter Journey to analyze the operational breakdown.
        </p>
        <button 
          onClick={handleDownloadGuide}
          className="inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-sm"
          aria-label="Download Election Guide from Cloud Storage"
        >
          <Download className="w-4 h-4" />
          <span>Download Election Guide</span>
        </button>
      </motion.div>
    </header>
  );
}
