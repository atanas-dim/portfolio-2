'use client'
import Image from 'next/image'
import { useEffect, useRef, type FC } from 'react'
import marsImg from '@/assets/images/mars-landscape.png'
import gsap from 'gsap'

const Background: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const landscapeRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    gsap.to(landscapeRef.current, {
      scale: 1.1,
      repeat: -1,
      yoyo: true,
      duration: 20,
      ease: 'slow',
      repeatDelay: 3,
    })

    gsap.set(landscapeRef.current, { y: 40 })

    gsap.to(landscapeRef.current, {
      y: 0,
      ease: 'slow',
      scrollTrigger: {
        trigger: landscapeRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    })
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 -z-1 w-full overflow-hidden mix-blend-overlay">
      <Image
        ref={landscapeRef}
        src={marsImg}
        alt="Illustration of an astronaut walking on rocky Mars landscape with a planet and UFO visible in the background"
        className="absolute bottom-0 left-0 w-full opacity-100 grayscale"
      />
    </div>
  )
}

export default Background
