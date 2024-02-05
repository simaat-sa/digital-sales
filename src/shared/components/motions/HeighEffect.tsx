"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export default function HeightMotion({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
