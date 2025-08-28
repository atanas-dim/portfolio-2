'use client'

import gsap from 'gsap'
import { useEffect } from 'react'

const STAGGER_ELEMENTS = '.heading,p,.social-link,.card,.tool'
const GLOSSY_ELEMENTS = 'h1,h2,h3'

export default function PageAnimations() {
  useEffect(() => {
    const main = gsap.utils.selector(document)('main')
    if (!main) return

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

      gsap
        .timeline({
          scrollTrigger: {
            trigger: child,
            start: 'top bottom',
            end: isLast ? 'top 50%' : 'bottom top',
            fastScrollEnd: true,
            scrub: 2,
          },
        })
        .to(child, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
        .to(
          {},
          {
            duration: () => {
              if (top < window.innerHeight) return 2
              return 1
            },
          },
        ) // delay for scrollTrigger scrub
        .to(child, {
          opacity: 0,
          y: -20,
          scale: isCard ? 0.95 : 1,
          duration: 0.3,
          ease: 'power2.out',
        })
    })

    // Reveal main after all initial opacity and offsets are set on elements
    gsap.to(main, { opacity: 1, duration: 0.6 })

    // GLOSSY SCROLL EFFECT
    const glossyEls = gsap.utils.selector(main)(GLOSSY_ELEMENTS)

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

  return null
}
