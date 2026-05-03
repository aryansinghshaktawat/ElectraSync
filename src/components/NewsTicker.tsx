"use client";

import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function NewsTicker() {
  const [newsData, setNewsData] = useState<string>("Initializing Firebase connection...");

  useEffect(() => {
    const fetchNews = () => {
      setTimeout(() => {
        setNewsData("LIVE (Firebase): Record 85% voter turnout reported in District 4. No anomalies detected.");
      }, 1500);
    };
    fetchNews();
  }, []);

  return (
    <div className="w-full bg-cyan-950/80 border-b border-cyan-800 py-2 px-4 flex items-center justify-center z-20">
      <AlertCircle className="w-4 h-4 text-cyan-400 mr-2 animate-pulse" />
      <p className="text-sm font-mono text-cyan-100">{newsData}</p>
    </div>
  );
}
