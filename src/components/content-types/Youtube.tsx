"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface YouTubeProps {
    content?: {
        id?: string;
        title?: string;
        author?: string;
        length?: string;
        thumbnailLarge?: string;
    };
    id?: string;
    title?: string;
    author?: string;
    length?: string;
}

const YouTube = (props: YouTubeProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [iframeRef, setIframeRef] = useState<HTMLIFrameElement | null>(null);
    const content = props.content || props;
    if (!content || !content.id) return null;

    const videoId = content.id;
    const title = content.title;
    const author = content.author;
    const length = content.length;

    const handleOverlayClick = (e: React.MouseEvent) => {
        setIsPlaying(true);
        // Simulate click on iframe
        if (iframeRef) {
            iframeRef.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
    };

    return (
        <div 
            className={`max-w-4xl hover:p-0 overflow-hidden ${isPlaying ? "p-0" : "p-2"} border border-white/10 rounded-2xl mb-4 relative h-96 transition-all duration-500 ease-in-out`}
            
        >
            <div className="h-full mb-4 relative">
                {!isPlaying && (
                    <div 
                        className="absolute inset-0 z-10 cursor-pointer"
                        onClick={handleOverlayClick}
                    />
                )}
                <iframe
                    ref={setIframeRef}
                    src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg hover:rounded-2xl shadow-lg relative z-0"
                    
                />
            </div>

            <AnimatePresence>
                {!isPlaying && (
                    <motion.div 
                        initial={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2 absolute bottom-4 left-4 right-4 bg-black/35 backdrop-blur-2xl p-3 rounded-lg pointer-events-none"
                    >
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <div className="flex items-center space-x-4 text-sm text-stone-400">
                            <span>{author}</span>
                            <span>•</span>
                            <span>{length}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default YouTube;