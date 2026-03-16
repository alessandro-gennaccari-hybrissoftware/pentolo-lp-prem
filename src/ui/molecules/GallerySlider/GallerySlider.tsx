"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface GallerySliderProps {
  slides: { src: string; alt: string }[]
  aspectRatio?: string
  className?: string
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
}

export function GallerySlider({
  slides,
  aspectRatio = "3/4",
  className,
}: GallerySliderProps) {
  const [[index, dir], setPage] = useState([0, 0])

  const paginate = (newDir: number) => {
    const next = (index + newDir + slides.length) % slides.length
    setPage([next, newDir])
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-t-3xl group select-none${className ? ` ${className}` : ""}`}
      style={{ aspectRatio }}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={index}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) paginate(1)
            else if (info.offset.x > 60) paginate(-1)
          }}
        >
          <Image
            src={slides[index].src}
            alt={slides[index].alt}
            className="w-full h-full object-cover"
            draggable={false}
            fill
          />
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      <button
        onClick={() => paginate(-1)}
        aria-label="Immagine precedente"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary  flex items-center justify-center text-black hover:bg-primary/80 transition-colors duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={() => paginate(1)}
        aria-label="Immagine successiva"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black hover:bg-primary/80 transition-colors duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > index ? 1 : -1])}
            aria-label={`Vai all'immagine ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer border border-black ${
              i === index
                ? "w-6 bg-primary"
                : "w-1.5 bg-primary/40 hover:bg-primary/70"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
