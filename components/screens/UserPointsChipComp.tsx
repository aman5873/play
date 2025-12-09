"use client";
import { CoinIcon } from "@/app/icons";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserPointsChipComp() {
  const { user } = useAuth();

  const prevPoints = useRef(user?.reward_points || 0);
  const [addedPoints, setAddedPoints] = useState<number | null>(null);
  useEffect(() => {
    if (user?.reward_points > prevPoints.current) {
      const diff = user.reward_points - prevPoints.current;
      setAddedPoints(diff);
      const timer = setTimeout(() => setAddedPoints(null), 800);
      prevPoints.current = user.reward_points;
      return () => clearTimeout(timer);
    }
    prevPoints.current = user?.reward_points || 0;
  }, [user?.reward_points]);
  if (!user?.reward_points) return null;
  return (
    <div className="sm:flex relative cursor-pointer items-center px-2 py-1 gap-2 rounded-full border-[2px] border-[var(--borderOne)] bg-[var(--bgOne)] text-[var(--textOne)] hover:bg-[var(--bgTwo)] hover:border-[var(--borderTwo)] font-semibold ">
      <div className="flex items-center gap-1">
        <CoinIcon size={25} /> {user.reward_points}{" "}
      </div>
      {/* Floating Glow Overlay */}{" "}
      <AnimatePresence>
        {addedPoints && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: -10,
              scale: 1.05,
              boxShadow: "0 0 15px rgba(255, 215, 0, 0.8)",
            }}
            exit={{
              opacity: 0,
              y: -60,
              scale: 1,
              boxShadow: "0 0 10px rgba(255, 215, 0, 0.7)",
            }}
            transition={{
              y: { type: "spring", stiffness: 300, damping: 25 },
              scale: { type: "spring", stiffness: 400, damping: 30 },
              opacity: { duration: 0.3, ease: "easeInOut" }, // faster exit
              boxShadow: { duration: 0.3, ease: "easeInOut" }, // faster exit
            }}
            className="absolute left-1/2 -translate-x-1/2 bottom-0 bg-yellow-400/20 text-yellow-300 font-bold text-sm px-2 py-0.5 rounded-full pointer-events-none backdrop-blur-md w-max"
          >
            {" "}
            +{addedPoints} pts{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>{" "}
    </div>
  );
}
