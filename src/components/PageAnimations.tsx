'use client'

import gsap from 'gsap'
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

      // REVEAL ANIMATION
      const staggeredEls = gsap.utils.selector(document)(STAGGER_ELEMENTS)

      staggeredEls.forEach((child, index) => {
        const isCard = Object.values(child.classList).includes('card')
        const top = child.getBoundingClientRect().top
        const isLast = index === staggeredEls.length - 1

        gsap.set(child, {
          opacity: 0,
          y: 20,
          scale: isCard ? 0.95 : 1,
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: child,
            start: 'top bottom',
            end: isLast ? 'top 50%' : 'bottom top',
            fastScrollEnd: true,
            scrub: 2,
          },
        })

        tl.to(child, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
          .to({}, { duration: top < window.innerHeight ? 4 : 1 })
          .to(child, {
            opacity: 0,
            y: -20,
            scale: isCard ? 0.95 : 1,
            duration: 0.3,
            ease: 'power2.out',
          })

        animations.push(tl)
      })

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
