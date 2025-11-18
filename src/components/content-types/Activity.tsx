import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import imageLoader from "@/src/utils/imageLoader";
import { useRouter } from "next/navigation";
import Button from "../Button";

interface ActivityCardProps {
  title: string;
  description?: string;
  shortDescription?: string;
  image?: string;
  inode?: string;
  urlMap?: string;
}

const ActivityCard = ({
  title,
  description,
  shortDescription,
  image,
  inode,
  urlMap,
}: ActivityCardProps) => {
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  return (
    <motion.article
      className="group relative lg:mt-4 w-full h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
      onClick={() => {
        router.push(urlMap ?? "/");
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-full flex flex-col">
        <motion.div className="relative w-full transition-all duration-500 overflow-hidden h-full">
          <motion.div
            className="w-full h-full relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            {(image && !imageError) && (
              <Image
                src={inode ?? ""}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loader={imageLoader}
                className="object-cover object-top md:object-center"
                onError={() => setImageError(true)}
              />
            )}
          </motion.div>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

          {/* Title - Always Visible on Image */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-2xl font-bold  group-hover:text-amber-300 transition-colors duration-300">
              {title}
            </h3>
          </div>
        </motion.div>

        {/* Expandable Content Section - Hidden by default, slides on hover */}
        <div className="flex flex-col gap-6 p-4 rounded-xl absolute bottom-0 left-0 right-0 group-hover:bottom-2 group-hover:left-2 group-hover:right-2 bg-stone-800/65 backdrop-blur-2xl translate-y-full group-hover:translate-y-0 transition-all  ease-in-out">
          <h3 className="text-2xl font-bold">
            {title}
          </h3>

          {shortDescription && (
            <p className="text-sm font-medium">
              {shortDescription}
            </p>
          )}

          {description && (
            <p className="leading-relaxed text-sm">
              {description}
            </p>
          )}

          {/* Action Indicator */}
          <Button size="sm" variant="secondary">
            Learn more
            <svg
              className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
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

export default ActivityCard;
