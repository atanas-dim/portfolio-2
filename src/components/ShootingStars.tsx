'use client'
import React, { useEffect } from 'react'
import { gsap } from 'gsap'

type ShootingStarsProps = {
  count?: number
  minDuration?: number
  maxDuration?: number
}

const MAX_STAR_WIDTH = 80

const ShootingStars: React.FC<ShootingStarsProps> = ({ count = 15, minDuration = 7, maxDuration = 18 }) => {
  useEffect(() => {
    const main = document.getElementsByTagName('main')[0]
    if (!main) return

    let stars: HTMLDivElement[] = []

    const startStarsAnimation = () => {
      const { width, height } = document.body.getBoundingClientRect()

      for (let i = 0; i < count; i++) {
        const star = document.createElement('div')
        star.classList.add('shooting-star')
        main.appendChild(star)
        stars.push(star)
      }

      function animateStar(star: HTMLDivElement) {
        // Random angle (0 → 2π)
        const angle = Math.random() * 2 * Math.PI
        const maxDistance = Math.min(width, height) * 0.5

        // Movement vector along rotated axis
        const dx = Math.cos(angle) * maxDistance
        const dy = Math.sin(angle) * maxDistance

        // Random start inside container
        const startX = gsap.utils.random(MAX_STAR_WIDTH, width - MAX_STAR_WIDTH)
        const startY = gsap.utils.random(MAX_STAR_WIDTH, height - MAX_STAR_WIDTH)

        // Clamp dx/dy so that end stays inside container
        const endX = Math.min(Math.max(startX + dx, 0), width - MAX_STAR_WIDTH) - startX
        const endY = Math.min(Math.max(startY + dy, 0), height - MAX_STAR_WIDTH) - startY

        const rotation = (angle * 180) / Math.PI

        const movementDistance = Math.sqrt(dx * dx + dy * dy)
        const duration = gsap.utils.mapRange(0, maxDistance, minDuration, maxDuration, movementDistance)

        gsap.set(star, {
          left: startX,
          top: startY,
          x: 0,
          y: 0,
          width: gsap.utils.random(MAX_STAR_WIDTH / 2, MAX_STAR_WIDTH),
          rotate: rotation,
          opacity: 0,
          '--star-color': 'rgb(255, 100, 103)',
        })

        gsap.to(star, {
          x: endX,
          y: endY,
          opacity: 1,
          '--star-color': 'rgb(255, 255, 255)',
          duration,
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

      stars.forEach((star) => {
        animateStar(star)
      })
    }

    startStarsAnimation()

    const resetAnimations = async () => {
      stars.forEach((star) => star.remove())
      stars = []
      await gsap.delayedCall(2, () => {}) // wait for layout to stabilize
      startStarsAnimation()
    }

    window.addEventListener('orientationchange', resetAnimations)

    return () => {
      window.removeEventListener('orientationchange', resetAnimations)
      stars.forEach((star) => star.remove())
    }
  }, [count, minDuration, maxDuration])

  return null
}

export default ShootingStars
