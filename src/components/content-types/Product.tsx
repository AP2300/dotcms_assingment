"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import imageLoader from "@/src/utils/imageLoader";
import { useRouter } from "next/navigation";
import Button from "../Button";
import { ProductProps } from "@/src/types";

const Product = ({
  title,
  description,
  image,
  inode,
  retailPrice,
  urlMap,
  ...rest
}: ProductProps) => {
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  const handleAddToCart = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setIsAdding(true);
    // Simulate add to cart action
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleViewDetails = () => {
    if (urlMap) router.push(urlMap);
  };

  return (
    <motion.article
      className="group relative w-full flex flex-col gap-6 p-3 mb-4 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 border border-white/10 hover:border-white/30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-200px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      {/* Image Section */}
      <div className="relative w-full h-72 bg-black/20 overflow-hidden rounded-2xl">
        {image && !imageError ? (
          <Image
            src={inode ?? ""}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loader={imageLoader}
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-800 to-gray-900">
            <svg
              className="w-20 h-20 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-4">
        {/* Title and Price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold transition-colors duration-300 line-clamp-3">
            {title}
          </h3>
          {retailPrice !== undefined && (
            <span className="text-2xl font-bold whitespace-nowrap">
              ${retailPrice}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <div 
            className="text-sm text-gray-400 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-2">
          <Button
            size="sm"
            variant="primary"
            onClick={handleAddToCart}
            className="flex-1"
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <motion.svg
                  className="w-5 h-5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
                </motion.svg>
                Adding...
              </>
            ) : (
              <>
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </>
            )}
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleViewDetails}
          >
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Details
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default Product;
