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
    let lastScroll = 0
    let dir = 0 // -1,0,1

    // CHECK SCROLL DIRECTION
    gsap.to(
      {},
      {
        scrollTrigger: {
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const currentScroll = self.scroll() // current scroll position (vertical)

            dir = currentScroll - lastScroll > 0 ? 1 : currentScroll - lastScroll < 0 ? -1 : 0
            lastScroll = currentScroll
          },
        },
      },
    )

    glossyEls.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          fastScrollEnd: true,
          onUpdate: () => {
            // Smoothly increment/decrement background-position-x by 1px per update to avoid jumps,
            // especially during fast scrolling. Animating background-position-x directly can be performance-heavy,
            // so we keep the updates minimal for better performance and smooth visuals.
            const current = +gsap.getProperty(el, 'background-position-x').toString()
            const newValue = (current + dir).toFixed()
            el.style.backgroundPositionX = `${newValue}px`
          },
        },
      })
    })
  }, [])

  return null
}
