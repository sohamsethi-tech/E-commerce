import { useEffect, useState } from 'react'

interface ParallaxHeroImagesProps {
  images: string[]
  className?: string
}

export default function ParallaxHeroImages({ images, className = '' }: ParallaxHeroImagesProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const updateMobile = () => setIsMobile(mediaQuery.matches)

    updateMobile()
    mediaQuery.addEventListener('change', updateMobile)

    return () => mediaQuery.removeEventListener('change', updateMobile)
  }, [])

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    setPointer({ x: x * 18, y: y * 18 })
  }

  const visibleImages = images.slice(0, 6)

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.18),_rgba(12,16,22,0.4)_45%,_rgba(12,16,22,0.82)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1724]/75 via-[#0f1724]/25 to-[#0f1724]/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(12,16,22,0.6)_100%)]" />

      {visibleImages.map((image, index) => {
        const transforms = [
          { x: pointer.x * 0.5, y: pointer.y * 0.5, rotate: -3 },
          { x: pointer.x * -0.7, y: pointer.y * -0.5, rotate: 4 },
          { x: pointer.x * 0.9, y: pointer.y * 0.8, rotate: -5 },
          { x: pointer.x * -1.1, y: pointer.y * -0.8, rotate: 4 },
          { x: pointer.x * 0.6, y: pointer.y * 0.6, rotate: -2 },
          { x: pointer.x * -0.9, y: pointer.y * -0.9, rotate: 6 },
        ]

        const config = transforms[index] ?? { x: 0, y: 0, rotate: 0 }

        const widths = ['w-[42%]', 'w-[30%]', 'w-[38%]', 'w-[28%]', 'w-[34%]', 'w-[32%]']
        const placements = [
          'left-[5%] top-[12%]',
          'right-[6%] top-[9%]',
          'left-[18%] top-[42%]',
          'right-[15%] top-[38%]',
          'left-[35%] top-[25%]',
          'right-[30%] top-[54%]',
        ]

        return (
          <div
            key={`${image}-${index}`}
            className={`absolute ${widths[index % widths.length]} ${placements[index % placements.length]} overflow-hidden rounded-[24px] border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.35)] ${isMobile ? 'transform-none' : ''}`}
            style={{
              height: index % 2 === 0 ? '42%' : '34%',
              transform: isMobile ? 'none' : `translate3d(${config.x}px, ${config.y}px, 0) rotate(${config.rotate}deg)`,
              transition: 'transform 0.4s ease-out',
            }}
          >
            <img
              src={image}
              alt="Luxury rug and interior detail"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        )
      })}
    </div>
  )
}
