import { useEffect, useState } from 'react'
import CursorDrivenParticleTypography from '../CursorDrivenParticleTypography'

type IntroStage = 'brand' | 'signature' | 'complete'

export default function IntroSplash({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<IntroStage>('brand')
  const [visible, setVisible] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const brandTimer = window.setTimeout(() => {
      setIsTransitioning(true)
      window.setTimeout(() => {
        setStage('signature')
        setIsTransitioning(false)
      }, 500)
    }, 11000)

    const signatureTimer = window.setTimeout(() => {
      setIsTransitioning(true)
      window.setTimeout(() => {
        setStage('complete')
        setIsTransitioning(false)
      }, 500)
    }, 16000)

    const completeTimer = window.setTimeout(() => {
      setVisible(false)
      onComplete()
    }, 17500)

    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(brandTimer)
      window.clearTimeout(signatureTimer)
      window.clearTimeout(completeTimer)
    }
  }, [onComplete])

  const text = stage === 'brand' ? "Carpets&Beyond" : 'By Dinesh Sethi'
  const fontSize = typeof window !== 'undefined' ? Math.min(160, Math.max(52, window.innerWidth * 0.105)) : 160
  const signatureFontSize = typeof window !== 'undefined' ? Math.min(100, Math.max(42, window.innerWidth * 0.07)) : 100

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050505] transition-all duration-[1200ms] ease-out ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-live="polite"
    >
      <div
        className={`relative flex h-screen w-screen items-center justify-center transition-all duration-700 ease-out ${
          isTransitioning ? 'scale-95 opacity-0 blur-sm' : 'scale-100 opacity-100 blur-0'
        } ${stage === 'complete' ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_rgba(0,0,0,0.8)_55%,_rgba(0,0,0,1)_100%)]" />

        <div className="relative flex h-[45vh] w-[92vw] max-w-[1200px] items-center justify-center px-2 sm:h-[55vh] sm:px-6">
          <CursorDrivenParticleTypography
            key={stage}
            text={text}
            fontSize={stage === 'brand' ? fontSize : signatureFontSize}
            particleSize={stage === 'brand' ? 1.8 : 1.5}
            particleDensity={stage === 'brand' ? 6 : 5}
            dispersionStrength={stage === 'brand' ? 18 : 16}
            returnSpeed={0.09}
            color="#f4efe6"
            className="h-full w-full max-w-[90vw] min-h-[180px]"
          />
        </div>
      </div>
    </div>
  )
}
