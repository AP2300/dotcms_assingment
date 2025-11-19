'use client';

import { ImageLoaderParams } from "../types";

const DOTCMS_ASSET_PATH = '/dA/';

const DEFAULT_IMAGE_QUALITY = 75;
const DEFAULT_IMAGE_WIDTH = 300;

/**
 * Custom image loader for Next.js Image component that integrates with DotCMS.
 * 
 * @param params - The image loader parameters
 * @param params.src - The source path of the image (with or without /dA/ prefix)
 * @param params.width - The desired width for the image
 * @param params.height - Optional desired height for the image
 * @param params.quality - Optional quality parameter (1-100), defaults to 75
 * @returns The fully constructed DotCMS image URL with query parameters
 * 
 * 
 * @throws {TypeError} If NEXT_PUBLIC_DOTCMS_HOST environment variable is not set or invalid
 */
export default function imageLoader({
  src,
  width,
  height,
  quality,
}: ImageLoaderParams): string {
  const dotcmsHost = process.env.NEXT_PUBLIC_DOTCMS_HOST;
  
  if (!dotcmsHost) {
    throw new Error(
      'NEXT_PUBLIC_DOTCMS_HOST environment variable is not defined'
    );
  }

  // Extract the origin (protocol + host) from the DotCMS URL
  const dotcmsURL = new URL(dotcmsHost).origin;

  // Ensure the source path includes the DotCMS asset prefix
  const imageSrc = src.includes(DOTCMS_ASSET_PATH)
    ? src
    : `${DOTCMS_ASSET_PATH}${src}`;

  // Remove leading slash from imageSrc if present to avoid double slashes
  const cleanImageSrc = imageSrc.startsWith('/')
    ? imageSrc.substring(1)
    : imageSrc;

  // Apply default quality if not specified
  const imageQuality = quality ?? DEFAULT_IMAGE_QUALITY;
  const imageWidth = width ?? DEFAULT_IMAGE_WIDTH;

  // Construct and return the complete image URL with transformation parameters
  const heightParam = height ? `/${height}h` : '';
  return `${dotcmsURL}/${cleanImageSrc}/${imageWidth}w${heightParam}/${imageQuality}q`;
}
