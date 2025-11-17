"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import imageLoader from "../../utils/imageLoader";
import Button from "../Button";

interface HeroProps {
  title: string;
  caption: string;
  inode: string;
  image: string;
  link: string;
  buttonText: string;
}

const Hero = ({
  title = "Welcome",
  caption,
  inode,
  image,
  link,
  buttonText,
}: HeroProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className=" h-[80dvh] md:min-h-[70vh] flex items-end lg:items-center justify-center overflow-hidden lg:mb-18">
      {/* Background Image with Error Handling */}
      {image && !imageError && (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 h-[80dvh] md:min-h-[70vh]"
        >
          <Image
            src={inode}
            alt={title}
            fill
            priority
            loader={imageLoader}
            className="object-cover"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/40" />
          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-[80dvh] md:h-[70vh] bg-linear-to-t from-[#121212] via-[#1212124f] to-transparent z-10" />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-30 container mx-auto px-6 py-20 flex flex-col gap-12">
        <div className="max-w-3xl ">
          {caption && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-sm md:text-base font-medium  tracking-wider uppercase ${
                image && !imageError ? "text-amber-300" : "text-amber-600"
              }`}
            >
              {caption}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-tight ${
              image && !imageError ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </motion.h1>
        </div>

        {buttonText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            {buttonText && (
              <Button href={link} variant="primary" size="lg">
                {buttonText}
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
