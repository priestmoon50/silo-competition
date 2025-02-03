import React, { useEffect, useState } from "react";
import { Silo } from "@/app/data/mockData";
import { useDispatch } from "react-redux";
import { updateTimer, updateFreeTimers } from "@/app/redux/siloSlice";
import clsx from "clsx";

interface SiloCardProps {
  silo: Silo;
  onReserve: (id: number) => void;
  onFree: (id: number) => void;
}

export default function SiloCard({ silo, onReserve, onFree }: SiloCardProps) {
  const dispatch = useDispatch();
  const [remainingTime, setRemainingTime] = useState(silo.remaining_time * 60);

  useEffect(() => {
    if (silo.status === "free") {
      setRemainingTime(silo.remaining_time * 60);
    }
  }, [silo.status, silo.remaining_time]);

  useEffect(() => {
    if (silo.status === "reserved") {
      setRemainingTime(0);
    }
  }, [silo.status]);

  useEffect(() => {
    if (remainingTime > 0 && silo.status === "free") {
      const interval = setInterval(() => {
        setRemainingTime((prev) => Math.max(prev - 1, 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [remainingTime, silo.status]);

  useEffect(() => {
    if (silo.status === "reserved" && remainingTime > 0) {
      const interval = setInterval(() => {
        dispatch(updateTimer());
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [dispatch, silo.status, remainingTime]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-3xl shadow-2xl border border-gray-700 backdrop-blur-2xl bg-opacity-80 text-center">
      <h2 className="text-3xl font-bold text-white mb-2">{silo.title}</h2>
      <p className="text-gray-400 text-lg mb-4">{silo.location}</p>
      <div className="flex justify-center mb-4">
        <span className={clsx(
          "px-6 py-2 rounded-lg text-xl font-semibold shadow-md",
          silo.status === "free" 
            ? "bg-green-600/30 text-green-300 border border-green-500 shadow-green-500/50"
            : "bg-red-600/30 text-red-300 border border-red-500 shadow-red-500/50"
        )}>
          {silo.status === "free" ? "✅ آزاد" : "⛔ رزرو شده"}
        </span>
      </div>
      <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
        <div className={clsx(
          "h-full transition-all duration-1000 ease-in-out",
          remainingTime === 0 ? "bg-transparent" : (silo.status === "free" ? "bg-green-400" : "bg-red-400")
        )} 
        style={{ width: `${(remainingTime / (silo.remaining_time * 60)) * 100}%` }}></div>
      </div>
      <div className="p-4 rounded-lg border border-gray-700 text-yellow-400 text-2xl font-mono bg-yellow-900/20 mb-4">
        ⏳ <span className="font-bold">{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</span> باقی‌مانده
      </div>
      <ActionButton 
        isFree={silo.status === "free"} 
        onClick={() => (silo.status === "free" ? onReserve(silo.id) : onFree(silo.id))}
      />
    </div>
  );
}

const ActionButton = ({ isFree, onClick }: { isFree: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={clsx(
      "relative w-full py-4 font-bold rounded-2xl shadow-lg transition duration-300 overflow-hidden flex items-center justify-center gap-3",
      "backdrop-blur-xl bg-opacity-80 hover:bg-opacity-100 text-2xl tracking-wider",
      isFree 
        ? "bg-blue-500 text-white hover:bg-blue-600 shadow-blue-500/70 animate-pulse" 
        : "bg-red-500 text-white hover:bg-red-600 shadow-red-500/70"
    )}
  >
    {isFree ? "🔥 رزرو سیلو" : "❌ آزاد کردن سیلو"}
  </button>
);
