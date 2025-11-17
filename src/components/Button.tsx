"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

const Button = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-2xl hover:rounded-4xl ease-in-out transition-all cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-slate-500 text-white hover:bg-slate-700 shadow-lg hover:shadow-xl",
    secondary: "text-blue-300 hover:bg-slate-700/50 shadow-none hover:shadow-xl w-fit",
    outline: "border-2 border-slate-600 text-slate-600 hover:bg-slate-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <div
        className="flex justify-center items-center gap-3"
      >
        <Link href={href} className={buttonClasses}>
          {children}
        </Link>
      </div>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={buttonClasses}
    >
      {children}
    </motion.button>
  );
};

export default Button;
