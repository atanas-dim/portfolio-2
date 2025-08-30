'use client'
import Image from 'next/image'
import { useEffect, useRef, type FC } from 'react'
import marsImg from '@/assets/images/mars-landscape.png'
import gsap from 'gsap'

const Background: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const landscapeRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let animations: Array<GSAPTimeline | GSAPTween> = []

    const setupAnimations = async () => {
      // Kill previous timelines
      animations.forEach((anim) => anim.kill())
      animations = []

      const infiniteZoom = gsap.to(landscapeRef.current, {
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        duration: 20,
        ease: 'linear',
        repeatDelay: 3,
      })
      animations.push(infiniteZoom)

      gsap.set(landscapeRef.current, { y: 40 })

      const slideY = gsap.to(landscapeRef.current, {
        y: 0,
        ease: 'slow',
        scrollTrigger: {
          trigger: landscapeRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })

      animations.push(slideY)
    }

    setupAnimations()

    const resetAnimations = async () => {
      await gsap.delayedCall(0.5, () => {}) // wait a tick for layout to stabilize
      setupAnimations()
    }

    window.addEventListener('orientationchange', resetAnimations)

    return () => {
      window.removeEventListener('orientationchange', resetAnimations)
      animations.forEach((tl) => tl.kill())
    }
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
