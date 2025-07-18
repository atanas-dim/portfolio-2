'use client'
import { ProjectDef, PROJECTS } from '@/resources/projects'
import { SOCIAL_LINKS } from '@/resources/socialLinks'
import { TOOLS } from '@/resources/tools'
import gsap from 'gsap'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

const ELEMENTS = 'main,section,h1,h2,h3,p,.social-link,.card,.tool,footer'

export default function Home() {
  useEffect(() => {
    gsap.set(ELEMENTS, {
      opacity: 0,
      y: 6,
      transition: 'none',
    })

    gsap.to(ELEMENTS, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      onComplete: () => {
        gsap.set(ELEMENTS, {
          clearProps: 'transition,transform',
        })
      },
    })
  }, [])

  return (
    <>
      <div role="presentation" className="grainy pointer-events-none absolute inset-0 z-50" />
      <main className="mx-auto mb-16 flex size-full min-h-fit max-w-5xl flex-col gap-28 px-6 py-8 opacity-0 motion-reduce:animate-none lg:py-16">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="glossy text-3xl font-extrabold whitespace-nowrap lg:text-6xl">
              Atanas Dimitrov <span className="text-2xl text-black lg:text-5xl lg:leading-tight">🪄</span>
            </h1>
            <h2 className="glossy text-3xl font-extrabold whitespace-nowrap lg:text-6xl">
              React Developer <span className="text-2xl text-black lg:text-5xl lg:leading-tight">⚛️</span>
            </h2>
          </div>
          <ul className="flex size-fit gap-x-4 gap-y-2 text-4xl">
            {SOCIAL_LINKS.map((link, index) => {
              return (
                <li key={'link-' + index} className="flex size-fit">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link glossy text-lg whitespace-nowrap lg:text-2xl">
                    <span className="text-black">{link.emoji}</span>{' '}
                    <span className="border-b-2 border-b-rose-950/20 transition-colors duration-500 hover:border-b-rose-950">
                      {link.label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="glossy text-3xl font-extrabold lg:text-5xl lg:leading-tight">About me</h2>
          <p className="glossy max-w-180 text-xl lg:text-2xl">
            I’m a React developer with a passion for creating beautiful and functional web applications. I’m always
            excited to experiment with new ideas and technologies.
          </p>
        </section>
        <section className="flex flex-col gap-8">
          <h2 className="glossy text-3xl font-extrabold lg:text-5xl lg:leading-tight">Projects</h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, index) => {
              return (
                <li
                  key={'project-' + index}
                  style={{
                    perspective: 1200,
                  }}
                  className="card hover:z-10">
                  <Card project={project} />
                </li>
              )
            })}
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="glossy text-3xl font-extrabold lg:text-5xl lg:leading-tight">Tools</h2>
          <p className="glossy text-xl lg:text-2xl">I use the following technologies to create my projects:</p>
          <ul className="grid w-fit grid-flow-col grid-rows-12 gap-x-6 gap-y-2 sm:grid-rows-8 sm:gap-x-10 md:grid-rows-6">
            {TOOLS.map((tool, index) => {
              return (
                <li key={'tool-' + index} className="tool glossy text-xl whitespace-nowrap lg:text-2xl">
                  {tool}
                </li>
              )
            })}
          </ul>
        </section>
      </main>
      <footer className="w-full opacity-0">
        <div className="mx-auto max-w-5xl px-6">
          <p className="border-t border-t-red-950/20 py-6 text-xs text-rose-950 lg:text-sm">
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
      className="hover:rotate-card-3d group relative size-full transition-all duration-500 ease-linear"
      style={{
        // @ts-expect-error - css vars
        '--rotate-x': `${rotate.x}deg`,
        '--rotate-y': `${rotate.y}deg`,
        '--rotate-z': `${rotate.z}deg`,
      }}>
      <div
        role="presentation"
        className="absolute inset-0 top-10 scale-60 rounded-3xl bg-rose-950/50 opacity-0 blur-xl transition-all duration-300 ease-linear group-hover:scale-100 group-hover:opacity-100"
      />
      <div
        className="relative flex flex-col gap-1 rounded-3xl border-2 border-rose-950 bg-rose-100 p-2 group-hover:bg-rose-50"
        onPointerEnter={handlePointerEnter}>
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-rose-950">
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
        <div className="flex flex-col p-2">
          <span className="glossy font-souvenir mb-1 text-2xl font-extrabold">{project.title}</span>
          <span className="glossy mb-3 h-12 text-base">{project.technologies}</span>
          <div className="flex gap-2">
            {project.links.map((link, index) => {
              return (
                <a
                  key={project.title + '-link-' + index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-souvenir flex items-center justify-center rounded-2xl bg-rose-950 px-4 py-2 text-lg whitespace-nowrap text-rose-50 transition-all duration-300 hover:bg-rose-800 active:bg-rose-700 active:text-rose-50">
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
