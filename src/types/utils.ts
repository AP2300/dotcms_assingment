// Utility types

export interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
  height?: number;
}

export interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number;
}
