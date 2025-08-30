'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useCallback, useEffect } from 'react'

const GLOSSY_ELEMENTS = 'h1,h2,h3'

export default function PageAnimations() {
  useEffect(() => {
    let animations: Array<GSAPTimeline | GSAPTween> = []

    const setupAnimations = async () => {
      // Kill previous timelines
      animations.forEach((anim) => anim.kill())
      animations = []
      ScrollTrigger.getAll().forEach((st) => st.kill())

      // REVEAL MAIN
      gsap.to('main', { opacity: 1, duration: 0.8 })

      // GLOSSY SCROLL EFFECT
      const glossyEls = gsap.utils.selector(document)(GLOSSY_ELEMENTS)
      glossyEls.forEach((el) => {
        const tl = gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            fastScrollEnd: true,
            scrub: 2,
          },
          backgroundPositionX: Math.min(window.innerWidth / 3, 260),
        })
        animations.push(tl)
      })

      gsap.utils
        .selector(document.body)('.bg-image')
        .forEach((img) => {
          const tl = gsap.to(img, {
            y: gsap.utils.random(10, 30),
            yoyo: true,
            repeat: -1,
            duration: 8,
          })
          animations.push(tl)
        })
    }

    setupAnimations()

    const resetAnimations = async () => {
      await gsap.delayedCall(1.5, () => {}) // wait a tick for layout to stabilize
      setupAnimations()
    }

    window.addEventListener('orientationchange', resetAnimations)

    return () => {
      window.removeEventListener('orientationchange', resetAnimations)
      animations.forEach((tl) => tl.kill())
    }
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
    const enableMotion = () => {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        // iOS 13+ requires permission
        ;(DeviceOrientationEvent as any)
          .requestPermission()
          .then((response: string) => {
            if (response === 'granted') {
              gsap.getTweensOf('.bg-image').forEach((tween) => tween.kill())
              window.addEventListener('deviceorientation', handleOrientation, true)
            } else {
              console.warn('Permission denied for device orientation')
            }
          })
          .catch(console.error)
      } else {
        // Non-iOS mobile or Android
        gsap.getTweensOf('.bg-image').forEach((tween) => tween.kill())
        window.addEventListener('deviceorientation', handleOrientation, true)
      }

      removeGestureListeners()
    }

    const removeGestureListeners = () => {
      document.removeEventListener('click', enableMotion)
      // document.removeEventListener('touchstart', enableMotion)
      // document.removeEventListener('keydown', enableMotion)
      // document.removeEventListener('scroll', enableMotion)
    }

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isAndroid = /Android/i.test(navigator.userAgent)
    const isMobile = isIOS || isAndroid

    if (isMobile) {
      const gestureOptions = { once: true }
      document.addEventListener('click', enableMotion, gestureOptions)
      // document.addEventListener('touchstart', enableMotion, gestureOptions)
      // document.addEventListener('keydown', enableMotion, gestureOptions)
      // document.addEventListener('scroll', enableMotion, gestureOptions)
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true)
      removeGestureListeners()
    }
  }, [handleOrientation])

  return null
}
