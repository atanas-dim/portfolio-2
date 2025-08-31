'use client'
import { type ProjectDef } from '@/resources/projects'
import gsap from 'gsap'

import Image from 'next/image'
import { FC, useEffect, useRef } from 'react'

type CardProps = {
  project: ProjectDef
}

const Card: FC<CardProps> = ({ project }) => {
  const containerSideRef = useRef<HTMLDivElement>(null)
  const frontSideRef = useRef<HTMLDivElement>(null)
  const backSideRef = useRef<HTMLDivElement>(null)

  const getRandomRotateX = () => Math.floor(Math.random() * 6) + 3 // 3 to 8
  const getRandomRotateYFront = () => Math.floor(Math.random() * (5 - -5 + 1)) + -5 // -5 to 5 inclusive
  const getRandomRotateYBack = () => Math.floor(Math.random() * (185 - 175 + 1)) + 175 // 175 to 185 inclusive
  const getRandomRotateZ = () => Math.random() * 3 - 1.5 // -1.5 to 1.5
  const getRandomTranslateZ = () => Math.floor(Math.random() * 70) + 30

  const animateTilt = () => {
    const isFrontSide = +gsap.getProperty(frontSideRef.current, 'rotateY') < 90

    gsap.to([frontSideRef.current, backSideRef.current], {
      rotateX: (isFrontSide ? 1 : -1) * getRandomRotateX(),
      rotateZ: (isFrontSide ? 1 : -1) * getRandomRotateZ(),
      translateZ: getRandomTranslateZ(),
      duration: 0.4,
      ease: 'slow',
    })
  }

  const animateFlip = () => {
    const isFrontSide = +gsap.getProperty(frontSideRef.current, 'rotateY') < 90

    gsap.to([frontSideRef.current, backSideRef.current], {
      rotateX: (isFrontSide ? -1 : 1) * getRandomRotateX(),
      rotateY: isFrontSide ? getRandomRotateYBack() : getRandomRotateYFront(),
      rotateZ: getRandomRotateZ(),
      translateZ: getRandomTranslateZ(),
      duration: 0.4,
      ease: 'slow',
    })
  }

  const resetRotation = () => {
    gsap.to([frontSideRef.current, backSideRef.current], {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      translateZ: 0,
      duration: 0.4,
      ease: 'slow',
    })
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerSideRef.current && !containerSideRef.current.contains(event.target as Node)) {
        resetRotation()
      }
    }

    document.addEventListener('pointerdown', handleClickOutside)
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={containerSideRef}
      style={{ perspective: 2000, transformStyle: 'preserve-3d' }}
      className="card @container relative size-full cursor-pointer *:select-none"
      onPointerEnter={animateTilt}
      onPointerLeave={resetRotation}
      onClick={animateFlip}>
      <div
        ref={backSideRef}
        className="absolute inset-0 rounded-3xl border-2 border-red-950 bg-red-950 px-4 py-6 text-red-200">
        <div className="flex -scale-x-100 flex-col gap-4">
          <span className="font-souvenir text-xl @2xs:text-2xl @xs:text-3xl">{project.title}</span>
          <p className="text-sm @2xs:text-base @xs:text-xl">{project.description}</p>
        </div>
      </div>

      <div
        ref={frontSideRef}
        className="group relative size-full"
        style={{
          backfaceVisibility: 'hidden',
        }}>
        <div className="relative flex size-full flex-col gap-1 overflow-hidden rounded-3xl border-2 border-red-950 bg-red-50 p-2 group-hover:bg-white">
          <div className="relative flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-red-950">
            <Image
              src={project.image}
              alt=""
              className="size-full object-cover grayscale"
              width={300}
              height={300}
              priority
            />
            <div role="presentation" className="absolute inset-0 bg-red-400 mix-blend-soft-light" />
          </div>
          <div className="flex h-full flex-col p-2">
            <h3 className="mb-1 @2xs:text-2xl">{project.title}</h3>
            <span className="mb-3 h-12 text-sm @2xs:text-base">{project.technologies}</span>
            <div className="mt-auto flex gap-2">
              {project.links.map((link, index) => {
                return (
                  <a
                    key={project.title + '-link-' + index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-souvenir flex items-center justify-center rounded-2xl bg-red-950 px-4 py-2 text-lg whitespace-nowrap text-red-50 transition-all duration-300 hover:bg-red-800 hover:bg-none active:bg-red-700 active:bg-none active:text-red-50"
                    onClick={(e) => e.stopPropagation()}>
                    {link.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
