"use client";

import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { reserveSilo, freeSilo } from "@/app/redux/siloSlice";
import SiloCard from "@/app/components/SiloCard";
import { SiloIcon } from "@/app/components/SiloIcon";

export default function Dashboard() {
  const dispatch = useDispatch();
  
  const silos = useSelector((state: RootState) => state.silo.silos);

  const handleReserve = useCallback((id: number) => {
    dispatch(reserveSilo(id));
  }, [dispatch]);

  const handleFree = useCallback((id: number) => {
    dispatch(freeSilo(id));
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white font-sans p-8">
      <h1 className="text-5xl font-extrabold text-center text-neonBlue mb-8 flex items-center justify-center gap-4">
        <SiloIcon className="w-12 h-12 text-neonBlue animate-flicker" />  
        <span className="animate-flicker">لیست سیلوها</span>
        <SiloIcon className="w-12 h-12 text-neonBlue animate-flicker" />
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {silos.map((silo) => (
          <SiloCard 
            key={silo.id} 
            silo={silo} 
            onReserve={handleReserve} 
            onFree={handleFree} 
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent to-gray-900 opacity-50 pointer-events-none"></div>
    </main>
  );
}
