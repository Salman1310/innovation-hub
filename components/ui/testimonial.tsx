"use client"

import * as React from "react"
import { motion, PanInfo } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

export interface TeamMember {
  id: number | string
  name: string
  role: string
  avatar: string
  description: string
}

interface TeamCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  members: TeamMember[]
  showArrows?: boolean
  showDots?: boolean
}

const TeamCarousel = React.forwardRef<HTMLDivElement, TeamCarouselProps>(
  (
    { className, members, showArrows = true, showDots = true, ...props },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [exitX, setExitX] = React.useState<number>(0)

    const handleDragEnd = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => {
      if (Math.abs(info.offset.x) > 80) {
        const direction = info.offset.x > 0 ? -1 : 1
        setExitX(info.offset.x)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + direction + members.length) % members.length)
          setExitX(0)
        }, 200)
      }
    }

    const next = () => {
      setExitX(-200)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % members.length)
        setExitX(0)
      }, 200)
    }

    const prev = () => {
      setExitX(200)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + members.length) % members.length)
        setExitX(0)
      }, 200)
    }

    return (
      <div
        ref={ref}
        className={cn("h-80 w-full flex items-center justify-center", className)}
        {...props}
      >
        <div className="relative w-80 h-64">
          {members.map((member, index) => {
            const isCurrentCard = index === currentIndex
            const isPrevCard = index === (currentIndex + 1) % members.length
            const isNextCard = index === (currentIndex + 2) % members.length

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null

            return (
              <motion.div
                key={member.id}
                className={cn(
                  "absolute w-full h-full rounded-2xl cursor-grab active:cursor-grabbing overflow-hidden",
                )}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                  background: isCurrentCard
                    ? "rgba(255,255,255,0.90)"
                    : "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid rgba(236,171,35,${isCurrentCard ? "0.34" : "0.16"})`,
                  boxShadow: isCurrentCard
                    ? "0 18px 52px rgba(236,171,35,0.18), 0 2px 8px rgba(0,0,0,0.05)"
                    : "0 4px 18px rgba(236,171,35,0.10)",
                }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 10 : 20,
                  rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 10 : 20,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                {showArrows && isCurrentCard && (
                  <div className="absolute inset-x-0 top-3 flex justify-between px-4 z-10">
                    <button
                      onClick={prev}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#082F3A] bg-[#F8D56A] hover:bg-[#ECAB23] transition-colors text-sm"
                    >
                      ←
                    </button>
                    <button
                      onClick={next}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#082F3A] bg-[#F8D56A] hover:bg-[#ECAB23] transition-colors text-sm"
                    >
                      →
                    </button>
                  </div>
                )}

                <div className="p-6 pt-8 flex flex-col items-center gap-3">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-[#ECAB23]/45"
                  />
                  <div className="text-center">
                    <h3
                      className="font-bold text-[#1F2A2E] text-base"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {member.name}
                    </h3>
                    <div
                      className="text-xs font-medium mt-0.5 px-3 py-0.5 rounded-full inline-block"
                      style={{
                        background: "linear-gradient(135deg, #FFF7E3, #F8D56A)",
                        color: "#0E3846",
                      }}
                    >
                      {member.role}
                    </div>
                  </div>
                  <p className="text-center text-sm text-[#5B6770] leading-relaxed line-clamp-3">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            )
          })}

          {showDots && (
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {members.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="transition-all duration-200"
                >
                  <div
                    className={cn(
                      "rounded-full transition-all",
                      index === currentIndex
                        ? "w-6 h-2 bg-[#ECAB23]"
                        : "w-2 h-2 bg-[#ECAB23]/30 hover:bg-[#ECAB23]/55",
                    )}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)
TeamCarousel.displayName = "TeamCarousel"

export { TeamCarousel }
