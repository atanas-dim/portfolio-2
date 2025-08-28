'use client'

import gsap from 'gsap'
import { useEffect } from 'react'

const STAGGER_ELEMENTS = 'section,.card,.tool,footer p'
const GLOSSY_ELEMENTS = 'h1,h2,h3'

export default function PageAnimations() {
  useEffect(() => {
    const main = gsap.utils.selector(document)('main')
    if (!main) return

    // -----------------------------
    // STAGGERED CHILDREN ANIMATION PER SECTION
    // -----------------------------
    const staggeredEls = gsap.utils.selector(document)(STAGGER_ELEMENTS)

    staggeredEls.forEach((child, index) => {
      gsap.set(child, { opacity: 0, y: 20 })

      // If element is already visible on mount → play in immediately
      if (child.getBoundingClientRect().top < window.innerHeight) {
        gsap.to(child, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
      } else {
        // Otherwise use scrub
        gsap.to(child, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: child,
            start: 'top bottom',
            end: () => (index === staggeredEls.length - 1 ? 'bottom bottom' : 'top 70%'),
            scrub: 4,
            fastScrollEnd: true,
          },
        })
      }
    })

    // Reveal main after all initial opacity and offsets are set on elements
    gsap.to(main, { opacity: 1, duration: 0.6 })

    // -----------------------------
    // GLOSSY SCROLL EFFECT
    // -----------------------------
    const glossyEls = gsap.utils.selector(main)(GLOSSY_ELEMENTS)

    glossyEls.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          fastScrollEnd: true,
          scrub: 5,
        },
        backgroundPositionX: Math.min(window.innerWidth / 2, 400),
      })
    })
  }, [])

  return null
}
