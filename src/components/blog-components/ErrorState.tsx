"use client";

import { motion } from "framer-motion";
import Button from "../Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export const ErrorState = ({
  message = "Something went wrong. Please try again later.",
  onRetry,
  showRetry = true,
}: ErrorStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12"
    >
      <div className="inline-flex flex-col items-center gap-6 px-8 py-8 bg-red-500/10 border border-red-500/30 rounded-2xl">
        <svg
          className="w-16 h-16 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-red-400">Error</h3>
          <p className="text-red-300 max-w-md">{message}</p>
        </div>
        {showRetry && onRetry && (
          <Button size="sm" variant="primary" onClick={onRetry}>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export const EmptyState = ({
  title = "No results found",
  description = "Try adjusting your search or filters to find what you're looking for.",
  onClear,
  showClearButton = false,
  icon = "search",
}: {
  title?: string;
  description?: string;
  onClear?: () => void;
  showClearButton?: boolean;
  icon?: "search" | "empty" | "sad";
}) => {
  const icons = {
    search: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    ),
    empty: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    ),
    sad: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16"
    >
      <svg
        className="w-24 h-24 mx-auto mb-6 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {icons[icon]}
      </svg>
      <h3 className="text-2xl font-bold mb-2 text-gray-300">{title}</h3>
      <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">{description}</p>
      {showClearButton && onClear && (
        <Button size="sm" variant="outline" onClick={onClear}>
          Clear Filters
        </Button>
      )}
    </motion.div>
  );
};
