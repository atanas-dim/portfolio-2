'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ShootingStarsProps {
  count?: number
  minDuration?: number
  maxDuration?: number
}

const ShootingStars: React.FC<ShootingStarsProps> = ({ count = 25, minDuration = 7, maxDuration = 18 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const { width, height } = container.getBoundingClientRect()

    for (let i = 0; i < count; i++) {
      const star = document.createElement('div')
      star.classList.add('shooting-star')
      container.appendChild(star)
      animateStar(star)
    }

    function animateStar(star: HTMLDivElement) {
      // Completely random angle (0 → 2π)
      const angle = Math.random() * 2 * Math.PI
      const distance = Math.max(width, height) * 0.5 // adjust distance to fit inside container

      // Calculate movement along the rotated axis
      const dx = Math.cos(angle) * distance
      const dy = Math.sin(angle) * distance

      // Start somewhere inside the container (random positions)
      const startX = Math.random() * width
      const startY = Math.random() * height

      const endX = startX + dx
      const endY = startY + dy

      const rotation = (angle * 180) / Math.PI

      gsap.set(star, {
        x: startX,
        y: startY,
        rotate: rotation,
        opacity: 0,
        '--star-color': 'rgb(255, 100, 103)',
      })

      gsap.to(star, {
        x: endX,
        y: endY,
        opacity: 1,
        '--star-color': 'rgb(255, 255, 255)',
        duration: minDuration + Math.random() * (maxDuration - minDuration),
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(star, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => animateStar(star), // loop forever
          })
        },
        delay: Math.random() * 4,
      })
    }
  }, [count, minDuration, maxDuration])

  return <div ref={containerRef} className="pointer-events-none absolute inset-0 z-1000 overflow-hidden" />
}

export default ShootingStars
