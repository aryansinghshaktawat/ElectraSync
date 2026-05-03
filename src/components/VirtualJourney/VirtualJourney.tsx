"use client";

import dynamic from "next/dynamic";
import RegistrationCheck from "./RegistrationCheck";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Lazy load the EVM Simulator for enterprise efficiency
const EVMSimulator = dynamic(() => import("./EVMSimulator"), {
  loading: () => <p className="text-gray-500 p-6 text-center border border-gray-800 rounded-xl bg-gray-900/40">Loading Polling Booth...</p>,
  ssr: false
});

// Lazy load the Map component
const GenericPollingMap = dynamic(() => Promise.resolve(() => (
  <div className="w-full h-64 rounded-xl overflow-hidden border border-gray-700 bg-gray-800 relative shadow-lg mt-4">
    <iframe 
      width="100%" 
      height="100%" 
      style={{ border: 0 }} 
      loading="lazy" 
      allowFullScreen 
      referrerPolicy="no-referrer-when-downgrade" 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000!2d-122.084!3d37.422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI1JzE5LjIiTiAxMjLCsDA1JzAyLjQiVw!5e0!3m2!1sen!2sus!4v1611234567890!5m2!1sen!2sus"
      title="Google Maps generic polling center location"
    ></iframe>
  </div>
)), { ssr: false });

const electionSteps = [
  {
    id: "step1",
    title: "Step 1: Check Eligibility & Register",
    text: "18+ years old, Indian citizen. Register via Election Commission or Voter Helpline App.",
    Component: RegistrationCheck,
  },
  {
    id: "step2",
    title: "Step 2: Get Your Voter ID (EPIC)",
    text: "Get physical card or download e-EPIC. Keep it ready.",
  },
  {
    id: "step3",
    title: "Step 3: Election Announcement",
    text: "ECI announces dates and enforces Model Code of Conduct.",
  },
  {
    id: "step4",
    title: "Step 4: Polling Day (Voting Day)",
    text: "Go to assigned booth, show ID, finger gets indelible ink, enter voting room.",
    Component: GenericPollingMap,
  },
  {
    id: "step5",
    title: "Step 5: Cast Your Vote (EVM)",
    text: "Use EVM and verify with VVPAT slip.",
    Component: EVMSimulator,
  },
  {
    id: "step6",
    title: "Step 6: Secure Storage & Counting",
    text: "Machines sealed. Officials count votes on a fixed date.",
  },
  {
    id: "step7",
    title: "Step 7: Results & Government Formation",
    text: "Candidate with most votes wins. Majority party forms government.",
  }
];

export default function VirtualJourney() {
  const [expandedStepId, setExpandedStepId] = useState<string>("step1");

  const toggleStep = (id: string) => {
    setExpandedStepId(expandedStepId === id ? "" : id);
  };

  return (
    <section className="w-full max-w-4xl mx-auto bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none" aria-hidden="true"></div>
      
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h2 className="text-3xl font-semibold text-white tracking-tight">Virtual Voter Simulator</h2>
        <p className="text-gray-400 mt-2">Walk through the simulated election process.</p>
      </div>

      <div className="space-y-4">
        {electionSteps.map((step) => {
          const isExpanded = expandedStepId === step.id;
          const StepComponent = step.Component;

          return (
            <motion.div 
              key={step.id}
              className={`border rounded-xl overflow-hidden transition-colors duration-300 ${isExpanded ? 'border-cyan-500/50 bg-gray-800/60' : 'border-gray-800 bg-gray-900/40 hover:bg-gray-800/40'}`}
            >
              <button
                onClick={() => toggleStep(step.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                aria-expanded={isExpanded}
              >
                <span className={`font-semibold text-lg ${isExpanded ? 'text-cyan-400' : 'text-gray-200'}`}>
                  {step.title}
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-cyan-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-gray-700/50">
                      <p className="text-gray-300 mb-4">{step.text}</p>
                      
                      {StepComponent && (
                        <div className="mt-4">
                          <StepComponent />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
