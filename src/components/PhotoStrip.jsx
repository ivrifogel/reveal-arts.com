import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame
} from "framer-motion";

const images = [
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695b4def8c7c0e48cd96be5e/855614201_IMG_83881.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695b4def8c7c0e48cd96be5e/d76310fa2_80210c55-6e86-4421-9f42-cd485ecef981.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695b4def8c7c0e48cd96be5e/ebea4aecd_IMG_9371.png",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695b4def8c7c0e48cd96be5e/7ba892432_IMG_9476.png",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695b4def8c7c0e48cd96be5e/4bbf79ea0_IMG_3289.png",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695b4def8c7c0e48cd96be5e/5e5238969_IMG_5034.png",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695b4def8c7c0e48cd96be5e/8ca851ffa_IMG_8314.png",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695b4def8c7c0e48cd96be5e/35cc61b21_IMG_9356.png",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695b4def8c7c0e48cd96be5e/71596740f_IMG_9363.png"
];

export default function PhotoStrip() {
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // 3 sets of images for seamless infinite loop
  const allImages = [...images, ...images, ...images]; 

  useEffect(() => {
    if (containerRef.current) {
        const measure = () => {
             if (containerRef.current) {
                 setContentWidth(containerRef.current.scrollWidth / 3);
             }
        };
        measure();
        // Wait for images to potentially load/layout to settle
        setTimeout(measure, 100);
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }
  }, []);

  useAnimationFrame(() => {
    if (!isDragging && contentWidth > 0) {
      // Speed: 0.5px per frame for slower movement
      const speed = 0.5; 
      let newX = x.get() - speed;
      
      // Wrap logic
      if (newX <= -contentWidth) {
        newX += contentWidth;
      } 
      
      x.set(newX);
    }
  });

  const handlePan = (_, info) => {
     let newX = x.get() + info.delta.x;
     // Wrap immediately for seamless drag
     if (contentWidth > 0) {
         if (newX <= -contentWidth) newX += contentWidth;
         if (newX > 0) newX -= contentWidth;
     }
     x.set(newX);
  };

  return (
    <div className="w-full bg-[#3b93a8]/5 overflow-hidden py-12 cursor-grab active:cursor-grabbing touch-pan-y">
      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex gap-8 w-max px-4"
        onPanStart={() => setIsDragging(true)}
        onPan={handlePan}
        onPanEnd={() => setIsDragging(false)}
      >
        {allImages.map((src, idx) => (
             <div 
              key={idx} 
              className="relative w-80 h-56 flex-shrink-0 rounded-xl overflow-hidden shadow-lg border-4 border-white transform hover:scale-105 transition-transform duration-300 select-none"
            >
              <img
                src={src}
                alt={`Gallery image ${idx}`}
                className="w-full h-full object-cover pointer-events-none"
                draggable="false"
              />
            </div>
        ))}
      </motion.div>
    </div>
  );
}