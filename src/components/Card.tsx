'use client'
import { type ProjectDef } from '@/resources/projects'

import Image from 'next/image'
import { FC, useState } from 'react'

type CardProps = {
  project: ProjectDef
}

const Card: FC<CardProps> = ({ project }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0, z: 0 })

  const handlePointerEnter = () => {
    setRotate({
      x: Math.floor(Math.random() * 8) + 3,
      y: Math.floor(Math.random() * 7) - 3,
      z: Math.floor(Math.random() * 5) - 2,
    })
  }

  return (
    <div
      className="hover:rotate-card-3d active:rotate-card-3d group relative size-full transition-all duration-500 ease-linear *:select-none"
      style={{
        // @ts-expect-error: Inline CSS custom properties are not typed by React style prop
        '--rotate-x': `${rotate.x}deg`,
        '--rotate-y': `${rotate.y}deg`,
        '--rotate-z': `${rotate.z}deg`,
      }}>
      <div
        role="presentation"
        className="pointer-events-none absolute inset-0 top-14 scale-60 rounded-3xl bg-red-950/40 opacity-100 blur-xl transition-all duration-500 ease-linear group-hover:scale-110 group-hover:opacity-100 group-active:scale-110 group-active:opacity-100"
      />
      <div
        className="@container relative flex size-full flex-col gap-1 overflow-hidden rounded-3xl border-2 border-red-950 bg-red-50 p-2 group-hover:bg-white"
        onPointerEnter={handlePointerEnter}>
        <div className="relative flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-red-950">
          <Image
            src={project.image}
            alt=""
            className="size-full object-cover grayscale"
            width={300}
            height={300}
            quality={100}
          />
          <span className="absolute inset-0 bg-red-400 mix-blend-soft-light" />
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
                  className="font-souvenir flex items-center justify-center rounded-2xl bg-red-950 px-4 py-2 text-lg whitespace-nowrap text-red-50 transition-all duration-300 hover:bg-red-800 hover:bg-none active:bg-red-700 active:bg-none active:text-red-50">
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
