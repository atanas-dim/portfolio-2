'use client'

import gsap from 'gsap'
import { useEffect } from 'react'

const STAGGER_ELEMENTS = 'h1,h2,p,.social-link,.card,.tool'
const GLOSSY_ELEMENTS = 'h1,h2,h3'

export default function PageAnimations() {
  useEffect(() => {
    const main = gsap.utils.selector(document)('main')
    if (!main) return

    // -----------------------------
    // STAGGERED CHILDREN ANIMATION PER SECTION
    // -----------------------------
    const sections = gsap.utils.selector(document)('section,footer')
    console.log('sections', sections)

    sections.forEach((section) => {
      const children = gsap.utils.selector(section)(STAGGER_ELEMENTS)

      // initial state for children
      gsap.set(children, { opacity: 0, y: 6 })

      // animate children with stagger when section scrolls into view
      gsap.to(children, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.25,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          toggleActions: 'play reverse play reverse',
        },
      })
    })

    gsap.to('main', { opacity: 1 })

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
