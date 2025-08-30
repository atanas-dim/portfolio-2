'use client'

import gsap from 'gsap'
import { useCallback, useEffect } from 'react'
import { useDeviceOrientation } from '@/components/DeviceOrientationContext'

const GLOSSY_ELEMENTS = 'h1,h2,h3'

export default function PageAnimations() {
  const { orientationPermissionGranted } = useDeviceOrientation()

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

    const beta = event.beta || 0 // front-back tilt
    const gamma = event.gamma || 0 // left-right tilt

    // Clamp tilt to avoid excessive movement
    const xTilt = -Math.max(-30, Math.min(30, gamma))
    const yTilt = -Math.max(-30, Math.min(30, beta))

    // Map tilt to pixel movement
    const maxMove = 20 // adjust for desired effect
    const x = (xTilt / 30) * maxMove
    const y = (yTilt / 30) * maxMove

    gsap.to(images, {
      x,
      y,
      ease: 'power2.out',
      duration: 0.2,
    })
  }, [])

  useEffect(() => {
    if (!orientationPermissionGranted) return animateFloating()

    console.log('KILL TWEENS')
    gsap.getTweensOf('.bg-image').forEach((tween) => tween.kill())
    window.addEventListener('deviceorientation', handleOrientation, true)

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true)
    }
  }, [handleOrientation, orientationPermissionGranted, animateFloating])

  return null
}
