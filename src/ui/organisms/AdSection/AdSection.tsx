"use client"
// Built-in
import { useEffect, useState } from "react"
// Libraries
import Image from "next/image"
// Components
import { Container, ScrollTranslateText } from "@/ui"
import Link from "next/link"

// Utility: split long text into chunks by sentence or max length
function splitText(text: string, maxLen = 60): string[] {
  if (!text) return []
  // Split by ". " or ".\n" or "\n" or "! " or "? "
  const sentences = text.split(/(?<=[.!?])\s+|\n/)
  const result: string[] = []
  let current = ""
  for (const s of sentences) {
    if ((current + s).length > maxLen && current) {
      result.push(current.trim())
      current = s
    } else {
      current += (current ? " " : "") + s
    }
  }
  if (current) result.push(current.trim())
  return result
}

const AdSection = ({
  texts,
  imageSrc,
  imageAlt,
}: {
  texts:
    | string[]
    | {
        first: string
        firstPartTwo?: string
        second: string
        third: string
      }
  imageSrc: string
  imageAlt: string
}) => {
  // Riduci la distanza del 30%
  const [distance, setDistance] = useState(70)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 540px)")
    const update = () => setDistance(mq.matches ? 28 : 70)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  // Support both old and new API for texts
  let textParts: string[] = []
  if (Array.isArray(texts)) {
    textParts = texts.flatMap((t) => splitText(t))
  } else {
    textParts = [
      ...splitText(texts.first),
      ...(texts.firstPartTwo ? splitText(texts.firstPartTwo) : []),
      ...splitText(texts.second),
      ...splitText(texts.third),
    ]
  }

  // Alternate directions for each part
  const directions = ["left", "right"]

  return (
    <section className="px-8 md:px-16 py-24 md:py-32 overflow-hidden">
      <Container>
        {/* Accent line above */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div className="w-16 h-1.5 bg-primary rounded-full border border-black" />
        </div>

        {/* Wrapper: image is the base, texts overlay on top */}
        <div className="relative w-full h-100 md:h-160 rounded-2xl overflow-hidden shadow-xs">
          {/* Background image */}
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1560px) calc(100vw - 128px), 1432px"
            style={{ objectFit: "cover", objectPosition: "center" }}
            draggable={false}
          />

          {/* Text overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 md:gap-10 text-white">
            {textParts.map((part, i) => (
              <ScrollTranslateText
                key={i}
                direction={
                  directions[i % directions.length] as "left" | "right"
                }
                distance={distance}
                className={
                  "text-[24px] md:text-[42px] xl:text-[70px] leading-[1em] font-medium text-center drop-shadow-text" +
                  (i % 2 === 1 ? " italic" : "")
                }
              >
                <h2>{part}</h2>
              </ScrollTranslateText>
            ))}
          </div>
        </div>

        {/* Accent line below */}
        <div className="flex justify-center mt-10 md:mt-14">
          <Link
            href="#choose-pentolo"
            className="inline-block bg-primary text-black text-sm font-semibold tracking-wider py-4 px-16 rounded-full border-2 border-primary hover:bg-black hover:border-white transition-all duration-300 hover:text-white"
            onClick={(e) => {
              e.preventDefault()
              const target = document.getElementById("choose-pentolo")
              if (target) {
                const rect = target.getBoundingClientRect()
                // Se il target è già visibile (vicino al top), scrolla in cima
                if (Math.abs(rect.top) < 10) {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                } else {
                  target.scrollIntoView({ behavior: "smooth" })
                }
              }
            }}
          >
            SCEGLI IL TUO PENTOLO
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default AdSection
