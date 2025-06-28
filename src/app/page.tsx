'use client'
import { ProjectDef, PROJECTS } from '@/resources/projects'
import { SOCIAL_LINKS } from '@/resources/socialLinks'
import { TOOLS } from '@/resources/tools'
import gsap from 'gsap'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

export default function Home() {
  useEffect(() => {
    gsap.set('main,section,h1,h2,h3,p,a,.card,footer', {
      opacity: 0,
      y: 6,
      transition: 'none',
    })

    gsap.to('main,section,h1,h2,h3,p,a,.card,footer', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      onComplete: () => {
        gsap.set('main,section,h1,h2,h3,p,a,.card,footer', {
          clearProps: 'transition,transform',
        })
      },
    })
  }, [])

  return (
    <>
      <div role="presentation" className="grainy pointer-events-none absolute inset-0 z-50" />
      <main className="mx-auto mb-16 flex size-full min-h-fit max-w-screen-lg flex-col gap-28 px-6 py-8 opacity-0 motion-reduce:animate-none lg:py-16">
        <section className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h1 className="glossy whitespace-nowrap text-3xl font-extrabold lg:text-6xl">
              Atanas Dimitrov <span className="text-2xl text-black lg:text-5xl lg:leading-tight">🪄</span>
            </h1>
            <h2 className="glossy whitespace-nowrap text-3xl font-extrabold lg:text-6xl">
              React Developer <span className="text-2xl text-black lg:text-5xl lg:leading-tight">⚛️</span>
            </h2>
          </div>
          <ul className="grid size-fit grid-cols-[repeat(2,auto)] gap-x-4 gap-y-2 text-4xl sm:grid-cols-[repeat(4,auto)]">
            {SOCIAL_LINKS.map((link, index) => {
              return (
                <li key={'link-' + index} className="flex size-fit">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glossy whitespace-nowrap text-lg">
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
          <p className="glossy text-xl lg:text-2xl">
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
          <ul className="glossy grid w-fit grid-flow-col grid-rows-12 gap-x-6 gap-y-2 sm:grid-rows-8 sm:gap-x-10 md:grid-rows-6">
            {TOOLS.map((tool, index) => {
              return (
                <li key={'tool-' + index} className="whitespace-nowrap text-lg">
                  {tool}
                </li>
              )
            })}
          </ul>
        </section>
      </main>
      <footer className="mx-auto max-w-screen-lg p-6 opacity-0">
        <p className="text-xs text-rose-950 lg:text-sm">
          {new Date().getFullYear()} | Created with NextJS, TailwindCSS and GSAP
        </p>
      </footer>
    </>
  )
}

type CardProps = {
  project: ProjectDef
}

const Card: FC<CardProps> = ({ project }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0, z: 0 })

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
        className="scale-60 absolute inset-0 top-10 rounded-3xl bg-rose-950/50 opacity-0 blur-xl transition-all duration-300 ease-linear group-hover:scale-100 group-hover:opacity-100"
      />
      <div
        className="relative flex flex-col gap-1 rounded-3xl border-2 border-rose-950 bg-rose-100 p-2 group-hover:bg-rose-50"
        onPointerEnter={() => {
          setRotate({
            x: Math.floor(Math.random() * 8) + 3,
            y: Math.floor(Math.random() * 7) - 3,
            z: Math.floor(Math.random() * 5) - 2,
          })
        }}>
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
          <h3 className="glossy mb-1 text-2xl font-bold">{project.title}</h3>
          <p className="glossy mb-3 h-12 text-base">{project.technologies}</p>
          <div className="flex gap-2">
            {project.links.map((link, index) => {
              return (
                <a
                  key={project.title + '-link-' + index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center whitespace-nowrap rounded-2xl bg-rose-950 px-4 py-2 text-lg text-rose-50 transition-all duration-300 hover:bg-rose-800 active:bg-rose-700 active:text-rose-50">
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
