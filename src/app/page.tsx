'use client'

import { ProjectDef, PROJECTS } from '@/resources/projects'
import { SOCIAL_LINKS } from '@/resources/socialLinks'
import { TOOLS } from '@/resources/tools'
import gsap from 'gsap'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

const STAGGER_ELEMENTS = 'h1,h2,p,.social-link,.card,.tool'
const GLOSSY_ELEMENTS = 'h1,h2,h3'

export default function Home() {
  useEffect(() => {
    gsap.set(STAGGER_ELEMENTS, {
      opacity: 0,
      y: 6,
    })

    gsap.to(STAGGER_ELEMENTS, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
    })

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

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-1000 overflow-hidden">
        <div role="presentation" className="grainy pointer-events-none absolute -inset-1/4 size-2/1" />
      </div>

      <main className="mx-auto mb-16 flex size-full min-h-fit max-w-5xl flex-col gap-28 px-6 py-8 motion-reduce:animate-none lg:py-16">
        <section className="flex flex-col gap-2">
          <h1 className="whitespace-nowrap">Atanas Dimitrov</h1>
          <p className="text-2xl whitespace-nowrap lg:text-3xl">
            React Developer <span className="text-black">🪄 ⚛️</span>
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="whitespace-nowrap">Let&apos;s connect</h2>
          <ul className="flex size-fit gap-x-4 gap-y-2 text-4xl">
            {SOCIAL_LINKS.map((link, index) => {
              return (
                <li key={'link-' + index} className="flex size-fit">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link text-lg whitespace-nowrap lg:text-2xl">
                    <span className="text-black">{link.emoji}</span>{' '}
                    <span className="border-b-3 border-b-rose-950/20 transition-colors duration-500 hover:border-b-rose-950">
                      {link.label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="lg:leading-tight">About me</h2>
          <p className="max-w-180">
            I’m a React developer with a passion for creating beautiful and functional web applications. I’m always
            excited to experiment with new ideas and technologies.
          </p>
        </section>
        <section className="flex flex-col gap-8">
          <h2 className="lg:leading-tight">Projects</h2>
          <ul className="2xs:grid-cols-2 grid grid-cols-1 gap-4 md:grid-cols-3">
            {PROJECTS.map((project, index) => {
              return (
                <li
                  key={'project-' + index}
                  style={{
                    perspective: 1200,
                  }}
                  className="card hover:z-10 active:z-10">
                  <Card project={project} />
                </li>
              )
            })}
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="lg:leading-tight">Tools</h2>
          <p className="mb-6">I use the following technologies to create my projects:</p>
          <ul className="xs:grid-rows-8 grid w-fit grid-flow-col grid-rows-12 gap-x-6 gap-y-2 sm:gap-x-10 md:grid-rows-6">
            {TOOLS.map((tool, index) => {
              return (
                <li key={'tool-' + index} className="tool whitespace-nowrap">
                  {tool}
                </li>
              )
            })}
          </ul>
        </section>
      </main>
      <footer className="relative w-full">
        <div className="mx-auto max-w-5xl px-6">
          <p className="border-t-3 border-t-red-950/10 py-6 text-xs! font-bold! lg:text-sm!">
            {new Date().getFullYear()} | Created with NextJS, TailwindCSS and GSAP
          </p>
        </div>
      </footer>
    </>
  )
}

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
        // @ts-expect-error - css vars
        '--rotate-x': `${rotate.x}deg`,
        '--rotate-y': `${rotate.y}deg`,
        '--rotate-z': `${rotate.z}deg`,
      }}>
      <div
        role="presentation"
        className="pointer-events-none absolute inset-0 top-14 scale-60 rounded-3xl bg-rose-950/40 opacity-100 blur-xl transition-all duration-500 ease-linear group-hover:scale-110 group-hover:opacity-100 group-active:scale-110 group-active:opacity-100"
      />
      <div
        className="@container relative flex size-full flex-col gap-1 overflow-hidden rounded-3xl border-2 border-rose-950 bg-rose-100 p-2 group-hover:bg-rose-50"
        onPointerEnter={handlePointerEnter}>
        <div className="relative flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-rose-950">
          <Image
            src={project.image}
            alt=""
            className="size-full object-cover grayscale"
            width={300}
            height={300}
            quality={100}
          />
          <span className="absolute inset-0 bg-rose-200 mix-blend-color" />
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
                  className="flex items-center justify-center rounded-2xl bg-rose-950 px-4 py-2 text-lg whitespace-nowrap text-rose-50 transition-all duration-300 hover:bg-rose-800 hover:bg-none active:bg-rose-700 active:bg-none active:text-rose-50">
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
