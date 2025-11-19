"use client";

import { motion } from "framer-motion";

interface LoadingStateProps {
  count?: number;
  type?: "grid" | "list";
}

export const LoadingState = ({ count = 6, type = "grid" }: LoadingStateProps) => {
  return (
    <div className={type === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} delay={i * 0.1} type={type} />
      ))}
    </div>
  );
};

const SkeletonCard = ({ delay = 0, type = "grid" }: { delay?: number; type?: "grid" | "list" }) => {
  if (type === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay }}
        className="w-full p-6 rounded-xl bg-black/40 border border-white/10"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-lg bg-gray-800 animate-pulse shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gray-800 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-800 rounded animate-pulse w-1/2" />
          </div>
          <div className="w-6 h-6 bg-gray-800 rounded animate-pulse shrink-0" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="w-full rounded-2xl overflow-hidden bg-black/40 border border-white/10"
    >
      <div className="w-full h-56 bg-gray-800 animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="h-3 bg-gray-800 rounded animate-pulse w-1/3" />
        <div className="h-6 bg-gray-800 rounded animate-pulse w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-800 rounded animate-pulse w-5/6" />
        </div>
        <div className="h-10 bg-gray-800 rounded animate-pulse" />
      </div>
    </motion.div>
  );
};

export const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className="flex justify-center py-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} border-amber-400 border-t-transparent rounded-full`}
      />
    </div>
  );
};
