"use client"
// Built-in
import Image from "next/image"
// Libraries
import { motion } from "framer-motion"

const Hero = ({
  title,
  description,
  overlay = false,
  backgroundSrc,
}: {
  title: {
    start: string
    end?: string
  }
  description: string
  overlay?: boolean
  backgroundSrc?: string
}) => {
  return (
    <section className="relative h-dvh w-full overflow-hidden pb-15 pt-5 px-10">
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 2 }}
        animate={{ scale: 1 }}
        transition={{
          type: "tween",
          duration: 1,
          delay: 0,
          ease: [0.44, 0, 0.56, 1],
        }}
        style={{ willChange: "transform", perspective: "1200px" }}
      >
        <Image
          fill
          priority
          sizes="100vw"
          src={backgroundSrc || ""}
          alt="a blue speaker with a wire attached to it"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            aspectRatio: "16/9",
          }}
          draggable={false}
        />
      </motion.div>

      {/* Overlay leggero opzionale */}
      {overlay && (
        <motion.div
          className="absolute inset-0 bg-white/25 backdrop-blur-[0px] z-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            ease: "easeOut",
          }}
        />
      )}

      <div className="relative z-20 flex items-center justify-center flex-col text-black">
        <div className="flex flex-col items-center gap-x-2 md:gap-x-3">
          <Image
            src="/short-logo.svg"
            alt="Pentolo logo"
            width={300}
            height={80}
            priority
            className="-mb-3 sm:-mb-6 w-90 sm:w-130 md:w-176 lg:w-220 h-auto"
          />
          <div className="md:text-3xl sm:w-130 w-90 md:w-176 lg:w-220 flex justify-between uppercase font-light tracking-widest text-xl px-[4.3%]">
            <div>Premium</div>
            <div>Superior</div>
          </div>
        </div>
      </div>

      {/* Text in foreground */}
      <div className="relative z-20 h-[calc(100%-5rem)] flex items-center justify-center flex-col text-black">
        <h1 className="mt-5 md:mt-0 text-[30px] md:text-[40px] max-w-280 flex items-center text-center flex-wrap justify-center gap-3 leading-none">
          {title?.start && (
            <div className="overflow-hidden pr-[0.15em]">
              <motion.span
                className="block italic font-bold"
                initial={{ y: -160 }}
                animate={{ y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 40,
                  mass: 1,
                }}
              >
                {title?.start}
              </motion.span>
            </div>
          )}
          {title?.end && (
            <div className="overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: 160 }}
                animate={{ y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 40,
                  mass: 1,
                }}
              >
                {title?.end}
              </motion.span>
            </div>
          )}
        </h1>
        <p className="mt-10 md:mt-6 text-sm md:text-lg uppercase text-center">
          {description}
        </p>
      </div>
    </section>
  )
}

export default Hero
