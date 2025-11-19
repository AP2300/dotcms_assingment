// Component props types

import { ReactNode } from "react";
import { Blog, Activity, Product, Hero, YouTube, Recommendation } from "./content";

export interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export interface HeroProps extends Hero {}

export interface ActivityCardProps extends Activity {}

export interface ProductProps extends Product {}

export interface BlogCardProps extends Blog {}

export interface YouTubeProps {
  content?: YouTube;
  id?: string;
  title?: string;
  author?: string;
  length?: string;
  thumbnailLarge?: string;
}

export interface RecommendationsCardProps extends Recommendation {}

export interface LoadingStateProps {
  count?: number;
  type?: "grid" | "list";
}

export interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export interface EmptyStateProps {
  title?: string;
  description?: string;
  onClear?: () => void;
  showClearButton?: boolean;
  icon?: "search" | "empty" | "sad";
}

export interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}
