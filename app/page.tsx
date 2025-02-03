"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { reserveSilo, freeSilo } from "@/app/redux/siloSlice";
import SiloCard from "@/app/components/SiloCard";
import { Silo } from "@/app/data/mockData"; 
import { PersistPartial } from "redux-persist/es/persistReducer"; 

export default function HomePage() {
  const dispatch = useDispatch();
  

  const silos = useSelector((state: RootState & PersistPartial) => 
    (state.silo?.silos || []) as Silo[]
  );

  const handleReserve = (id: number) => dispatch(reserveSilo(id));
  const handleFree = (id: number) => dispatch(freeSilo(id));

  return (
    <main className="bg-darkBg min-h-screen text-white font-gaming p-5">
      <h1 className="text-4xl text-neonBlue text-center mb-6 animate-bounce">
        🚀 لیست سیلوها 🚀
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {silos.map((silo) => (
          <SiloCard key={silo.id} silo={silo} onReserve={handleReserve} onFree={handleFree} />
        ))}
      </div>
    </main>
  );
}
