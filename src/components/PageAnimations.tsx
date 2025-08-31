'use client'

import gsap from 'gsap'
import { useCallback, useEffect, useRef } from 'react'
import { useDeviceOrientation } from '@/components/DeviceOrientationContext'

const GLOSSY_ELEMENTS = 'h1,h2,h3'

export default function PageAnimations() {
  const { orientationPermissionGranted } = useDeviceOrientation()
  const neutralBetaRef = useRef<number | null>(null)

  useEffect(() => {
    // REVEAL MAIN
    gsap.to('main', { opacity: 1, duration: 0.8 })

    // GLOSSY SCROLL EFFECT
    const glossyEls = gsap.utils.selector(document)(GLOSSY_ELEMENTS)
    glossyEls.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          fastScrollEnd: true,
          scrub: 2,
        },
        backgroundPositionX: Math.min(window.innerWidth / 3, 260),
      })
    })
  }, [])

  const animateFloating = useCallback(() => {
    gsap.utils
      .selector(document.body)('.bg-image')
      .forEach((img) => {
        gsap.to(img, {
          y: gsap.utils.random(10, 30),
          yoyo: true,
          repeat: -1,
          duration: 8,
        })
      })
  }, [])

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const images = gsap.utils.selector(document.body)('.bg-image')
    const cards = gsap.utils.selector(document.body)('.card')

    const beta = event.beta ?? 0 // front-back tilt
    const gamma = event.gamma ?? 0 // left-right tilt

    // --- translation for images ---
    const xTiltImages = Math.max(-30, Math.min(30, gamma))
    const yTiltImages = Math.max(-30, Math.min(30, beta))
    const maxMove = 20
    const x = -(xTiltImages / 30) * maxMove
    const y = -(yTiltImages / 30) * maxMove

    gsap.to(images, {
      x,
      y,
      ease: 'power2.out',
      duration: 0.2,
    })

    // --- rotation for cards: use a neutral offset for beta so it doesn't sit on the clamp ---
    if (neutralBetaRef.current === null) {
      neutralBetaRef.current = beta // capture user's natural hold angle once
    }
    const betaRel = beta - neutralBetaRef.current // now 0 ≈ user's normal posture
    const xTiltCards = xTiltImages
    const yTiltCards = Math.max(-30, Math.min(30, betaRel)) // clamp AFTER offset

    gsap.to(cards, {
      rotateX: yTiltCards * 0.5,
      rotateY: xTiltCards * 0.5,
      force3D: true,
      transformOrigin: '50% 50%',
      ease: 'power2.out',
      duration: 0.2,
    })
  }, [])

  useEffect(() => {
    if (!orientationPermissionGranted) return animateFloating()

    gsap.getTweensOf('.bg-image').forEach((tween) => tween.kill())
    window.addEventListener('deviceorientation', handleOrientation, true)

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true)
    }
  }, [handleOrientation, orientationPermissionGranted, animateFloating])

  return null
}
