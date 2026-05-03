"use client";

import dynamic from "next/dynamic";
import RegistrationCheck from "./RegistrationCheck";
import { motion } from "framer-motion";

// Lazy load the EVM Simulator for enterprise efficiency
const EVMSimulator = dynamic(() => import("./EVMSimulator"), {
  loading: () => <p className="text-gray-500 p-6 text-center border border-gray-800 rounded-xl bg-gray-900/40">Loading Polling Booth...</p>,
  ssr: false
});

// Lazy load the Map component
const GenericPollingMap = dynamic(() => Promise.resolve(() => (
  <div className="w-full h-64 rounded-xl overflow-hidden border border-gray-700 bg-gray-800 relative shadow-lg">
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

export default function VirtualJourney() {
  return (
    <section className="w-full max-w-5xl bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none" aria-hidden="true"></div>
      
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h2 className="text-3xl font-semibold text-white tracking-tight">Virtual Voter Simulator</h2>
        <p className="text-gray-400 mt-2">Walk through the simulated election process.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <RegistrationCheck />
          
          <div className="pt-4 mt-6 border-t border-gray-800">
            <h4 className="text-sm font-semibold text-cyan-500 uppercase tracking-widest mb-3">Find Polling Center</h4>
            <GenericPollingMap />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <EVMSimulator />
        </motion.div>
      </div>
    </section>
  );
}
