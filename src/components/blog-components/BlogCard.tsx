"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import imageLoader from "@/src/utils/imageLoader";
import { useRouter } from "next/navigation";
import Button from "../Button";

interface BlogCardProps {
  title: string;
  description?: string;
  teaser?: string;
  image?: string;
  inode?: string;
  urlMap?: string;
  postingDate?: string;
  author?: { firstName: string; lastName: string; inode: string };
}

const BlogCard = ({
  title,
  description,
  teaser,
  image,
  inode,
  urlMap,
  postingDate,
  author,
}: BlogCardProps) => {
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const formattedDate = postingDate
    ? new Date(postingDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <motion.article
      className="group relative w-full flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-black/40 border border-white/10 hover:border-white/30 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onClick={() => {
        if (urlMap) router.push(urlMap);
      }}
    >
      {/* Image Section */}
      <div className="relative w-full h-56 bg-black/20 overflow-hidden">
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
              className="w-16 h-16 text-gray-600"
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
      <div className="flex flex-col gap-4 p-6 flex-1">
        {/* Meta Info */}
        <div className="flex gap-0.5 flex-col">
          {(postingDate || author) && (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              {formattedDate && <span>{formattedDate}</span>}
              {formattedDate && author && <span>•</span>}
              {author && (
                <span>
                  By {author.firstName} {author.lastName}
                </span>
              )}
            </div>
          )}
          {/* Title */}
          <h3 className="text-xl font-bold group-hover:text-slate-300 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Teaser/Description */}
        {(teaser || description) && (
          <div className="text-sm text-gray-400 line-clamp-3">
            {teaser || description}
          </div>
        )}

        {/* Read More Button */}
        <div className="mt-auto">
          <Button size="sm" variant="secondary" className="w-full">
            Read More
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
