'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect } from 'react'

const STAGGER_ELEMENTS = '.heading,p,.social-link,.card,.tool'
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

  return null
}
