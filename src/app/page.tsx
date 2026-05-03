"use client";

"use client";

import Header from "@/components/Header";
import NewsTicker from "@/components/NewsTicker";
import VirtualJourney from "@/components/VirtualJourney/VirtualJourney";

export default function Dashboard() {
  return (
    <main className="flex-1 flex flex-col items-center justify-start relative overflow-hidden bg-gray-950 min-h-screen">
      <NewsTicker />
      <div className="p-6 md:p-12 lg:p-24 w-full flex flex-col items-center">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/30 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/20 blur-[120px] rounded-full"></div>
        </div>

        <Header />
        <VirtualJourney />
      </div>
    </main>
  );
}
