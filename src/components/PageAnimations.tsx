'use client'

import gsap from 'gsap'
import { useCallback, useEffect, useRef } from 'react'
import { useDeviceOrientation } from '@/components/DeviceOrientationContext'

const GLOSSY_ELEMENTS = 'h1,h2,h3'

export default function PageAnimations() {
  const { orientationPermissionGranted } = useDeviceOrientation()
  const neutralBetaRef = useRef<number | null>(null)
  const neutralGammaRef = useRef<number | null>(null)

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
          y: 50,
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        })
      })
  }, [])

  const setNeutralMotionValues = useCallback((beta: number, gamma: number) => {
    // capture user's natural hold angle once
    if (neutralBetaRef.current === null) {
      neutralBetaRef.current = beta
    }
    if (neutralGammaRef.current === null) {
      neutralGammaRef.current = gamma
    }
  }, [])

  const resetNeutralMotionValues = useCallback(() => {
    neutralBetaRef.current = null
    neutralGammaRef.current = null
  }, [])

  const tiltBgImages = useCallback((beta: number, gamma: number, isPortrait: boolean) => {
    const images = gsap.utils.selector(document.body)('.bg-image')

    const xTiltImages = Math.max(-30, Math.min(30, gamma))
    const yTiltImages = Math.max(-30, Math.min(30, beta))
    const maxMove = 20
    const xTranslate = -(xTiltImages / 30) * maxMove
    const yTranslate = -(yTiltImages / 30) * maxMove

    gsap.to(images, {
      x: isPortrait ? xTranslate : yTranslate,
      y: isPortrait ? yTranslate : -xTranslate,
      ease: 'power2.out',
      duration: 0.2,
    })
  }, [])

  const tiltCards = useCallback((beta: number, gamma: number, isPortrait: boolean) => {
    const cards = gsap.utils.selector(document.body)('.card')

    const xTiltCards = Math.max(-30, Math.min(30, gamma)) * 0.5
    const yTiltCards = Math.max(-30, Math.min(30, beta)) * 0.5 // clamp AFTER offset

    gsap.to(cards, {
      rotateX: isPortrait ? -yTiltCards : xTiltCards,
      rotateY: isPortrait ? xTiltCards : yTiltCards,
      force3D: true,
      transformOrigin: '50% 50%',
      ease: 'power2.out',
      duration: 0.2,
    })
  }, [])

  const handleOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      const beta = event.beta ?? 0 // front-back tilt
      const gamma = event.gamma ?? 0 // left-right tilt
      const isPortrait = window.matchMedia('(orientation: portrait)').matches

      // rotation for cards: use a neutral offset for beta and gamma so it doesn't sit on the clamp
      setNeutralMotionValues(beta, gamma)

      const betaRel = beta - (neutralBetaRef.current || 0) // now 0 ≈ user's normal posture
      const gammaRel = gamma - (neutralGammaRef.current || 0) // now 0 ≈ user's normal posture

      tiltBgImages(betaRel, gammaRel, isPortrait)
      tiltCards(betaRel, gammaRel, isPortrait)
    },
    [setNeutralMotionValues, tiltBgImages, tiltCards],
  )

  useEffect(() => {
    if (!orientationPermissionGranted) return animateFloating()

    gsap.getTweensOf('.bg-image').forEach((tween) => tween.kill())
    window.addEventListener('deviceorientation', handleOrientation, true)
    window.addEventListener('orientationchange', resetNeutralMotionValues, true)

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true)
      window.removeEventListener('orientationchange', resetNeutralMotionValues, true)
    }
  }, [handleOrientation, orientationPermissionGranted, animateFloating, resetNeutralMotionValues])

  return null
}
