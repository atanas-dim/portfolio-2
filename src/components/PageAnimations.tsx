'use client'

import gsap from 'gsap'
import { useEffect } from 'react'

const STAGGER_ELEMENTS = 'h1,h2,p,.social-link,.card,.tool'
const GLOSSY_ELEMENTS = 'h1,h2,h3'

export default function PageAnimations() {
  useEffect(() => {
    // TRANSITION IN STAGGERED
    gsap.set('main', {
      opacity: 0,
    })
    gsap.set(STAGGER_ELEMENTS, {
      opacity: 0,
      y: 6,
    })

    gsap
      .timeline()
      .to('main', {
        opacity: 1,
      })
      .to(STAGGER_ELEMENTS, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
      })

    // SCROLL TRIGGERED GLOSSY EFFECT
    const glossyEls = gsap.utils.selector('main')(GLOSSY_ELEMENTS)

    gsap.to(glossyEls, {
      scrollTrigger: {
        trigger: 'main',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
        fastScrollEnd: true,
      },
      backgroundPositionX: (i) => `${30 + (i + 1) * 10}vmax`,
    })
  }, [])

  return null
}
