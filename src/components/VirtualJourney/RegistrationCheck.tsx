"use client";

import { useState, useCallback } from "react";
import { CheckCircle2, Search } from "lucide-react";

export default function RegistrationCheck() {
  const [voterId, setVoterId] = useState("");
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const handleVerify = useCallback(() => {
    if (voterId.trim() === "") return;
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'verify_voter', {
        event_category: 'virtual_journey',
        event_label: 'registration_check'
      });
    }

    setIsVerified(true);
  }, [voterId]);

  return (
    <div className="p-6 bg-gray-900/60 border border-gray-800 rounded-xl shadow-lg space-y-4">
      <h3 className="text-lg font-semibold text-cyan-100">Step 1: Registration Check</h3>
      <p className="text-sm text-gray-400">Enter a dummy Voter ID to verify registration status.</p>
      
      <div className="flex items-center space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            placeholder="e.g., VOTE-12345"
            className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
            aria-label="Voter ID Input"
            data-testid="voter-id-input"
          />
        </div>
        <button 
          onClick={handleVerify}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          aria-label="Verify Voter ID"
        >
          Verify
        </button>
      </div>

      {isVerified && (
        <div data-testid="verification-success" className="flex items-center space-x-2 text-green-400 bg-green-900/20 p-3 rounded-lg border border-green-800/50 mt-4" role="status">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-medium">Voter Verified Successfully. Secure token generated.</span>
        </div>
      )}
    </div>
  );
}
