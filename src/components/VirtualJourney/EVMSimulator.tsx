"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const candidates = [
  { id: "c1", name: "Candidate A", party: "Party Alpha" },
  { id: "c2", name: "Candidate B", party: "Party Beta" },
  { id: "c3", name: "Candidate C", party: "Party Gamma" },
];

export default function EVMSimulator() {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionId, setTransactionId] = useState<string>("");

  const selectedCandidate = useMemo(() => {
    return candidates.find((c) => c.id === selectedCandidateId);
  }, [selectedCandidateId]);

  const handleVote = useCallback((candidateId: string) => {
    setSelectedCandidateId(candidateId);
    setIsFlashing(true);
    setTransactionId(Math.random().toString(36).substring(2, 10).toUpperCase());
    
    // Simulate Beep sound effect
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      oscillator.connect(audioCtx.destination);
      oscillator.start();
      setTimeout(() => oscillator.stop(), 300);
      
      if (window.gtag) {
        window.gtag('event', 'cast_vote', {
          event_category: 'virtual_journey',
          event_label: candidateId
        });
      }
    }

    setTimeout(() => {
      setIsFlashing(false);
      setShowReceipt(true);
    }, 500);
  }, []);

  const closeReceipt = useCallback(() => {
    setShowReceipt(false);
    setSelectedCandidateId(null);
  }, []);

  return (
    <div className="p-6 bg-gray-900/60 border border-gray-800 rounded-xl shadow-lg relative overflow-hidden">
      <h3 className="text-lg font-semibold text-cyan-100 mb-4">Step 2: Polling Booth (EVM Simulator)</h3>
      
      <div className="space-y-3">
        {candidates.map((c) => (
          <div key={c.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
            <div>
              <p className="text-white font-medium">{c.name}</p>
              <p className="text-xs text-gray-400">{c.party}</p>
            </div>
            <button 
              onClick={() => handleVote(c.id)}
              className="w-12 h-12 bg-blue-600 rounded-full hover:bg-blue-500 focus:ring-4 focus:ring-blue-500/50 transition-all flex items-center justify-center shadow-lg"
              aria-label={`Vote for ${c.name}`}
              data-testid={`vote-btn-${c.id}`}
            >
              <div className="w-6 h-6 bg-blue-400 rounded-full" />
            </button>
          </div>
        ))}
      </div>

      {/* Flashing Effect */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-500/20 pointer-events-none"
            data-testid="flash-effect"
          />
        )}
      </AnimatePresence>

      {/* Digital Voting Receipt Modal */}
      <AnimatePresence>
        {showReceipt && selectedCandidate && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm p-6"
            data-testid="receipt-modal"
          >
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl w-full max-w-sm text-center shadow-2xl">
              <h4 className="text-cyan-400 font-semibold mb-2">Digital Voting Receipt</h4>
              <p className="text-sm text-gray-300 mb-1">Vote successfully recorded.</p>
              <p className="text-xs text-gray-500 font-mono mb-4">Transaction ID: {transactionId}</p>
              
              <div className="bg-gray-900 p-4 rounded-lg mb-6 text-left border border-gray-800">
                <p className="text-xs text-gray-400 uppercase tracking-widest">Selection</p>
                <p className="text-white font-medium text-lg">{selectedCandidate.name}</p>
                <p className="text-sm text-cyan-500">{selectedCandidate.party}</p>
              </div>

              <button 
                onClick={closeReceipt}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                aria-label="Close Receipt"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
