import { StaticImageData } from 'next/image'

import earthImg from '@/assets/images/3d-earth.jpg'
import searchingMapboxImg from '@/assets/images/mapbox-search.jpg'
import shadersPlaygroundImg from '@/assets/images/shaders-playground.jpg'
import tiledImageLoaderImg from '@/assets/images/tiled-image-loader.jpg'
import calendarImg from '@/assets/images/react-grid-calendar.jpg'
import nextLocalisationImg from '@/assets/images/next-localisation.jpg'
import workoutDirectoryImg from '@/assets/images/workout-directory.jpg'
import zeuxieImg from '@/assets/images/zeuxie.jpg'

export type ProjectDef = {
  videoSrc?: string
  image: StaticImageData
  title: string
  technologies: string
  description: string
  links: { href: string; label: string }[]
}

export const PROJECTS: ProjectDef[] = [
  {
    image: zeuxieImg,
    title: 'Zeuxie File Converter',
    technologies: 'TypeScript, Next.js, TailwindCSS, AWS, FFmpeg, Supabase',
    description:
      'A free online file converter for images, videos, and audio formats. Supports PNG, JPG, WEBP, MP4, MOV, WebM, and more. Fast, secure, cloud-powered conversion with no sign-up required.',
    links: [{ label: 'Live', href: 'https://zeuxie.com/' }],
  },
  {
    image: workoutDirectoryImg,
    title: 'Workout Directory',
    technologies: 'PWA, TypeScript, Next.js, Supabase, TailwindCSS',
    description:
      'A workout builder and logger where you can track weights, create exercises, group them into workouts and routines, and browse embedded YouTube videos. Built as a PWA for home screen access and fullscreen view.',
    links: [{ label: 'Live', href: 'https://workoutdirectory.com/' }],
  },
  {
    image: nextLocalisationImg,
    title: 'Next Localisation',
    technologies: 'TypeScript, Next.js, html-react-parser',
    description:
      'A lightweight example of handling localisation in Next.js App Router with TypeScript, without external i18n libraries. Features locale-based routing, a custom parseT function, Google Sheets-powered translations, and an automated sync script for seamless updates.',
    links: [
      { label: 'Code', href: 'https://github.com/atanas-dim/next-localization' },
      { label: 'Live', href: 'https://next-localization-phi.vercel.app' },
    ],
  },
  {
    image: earthImg,
    title: '3D Earth',
    technologies: 'Three.js, TypeScript, Next.js',
    description:
      'A 3D scene of Earth and the Moon orbiting in space, built with React Three Fiber and Drei. Demonstrates the use of emissive and alpha maps on spherical textures, lighting, and basic orbital animation in a lightweight interactive environment.',
    links: [
      { label: 'Code', href: 'https://github.com/atanas-dim/solar-system-3d' },
      { label: 'Live', href: 'https://earth-model-3d.vercel.app/' },
    ],
  },
  {
    image: calendarImg,
    title: 'React Grid Calendar',
    technologies: 'TypeScript, Next.js, date-fns, TailwindCSS',
    description:
      'A responsive React calendar with a clean grid layout. Built using TailwindCSS and date-fns, it supports date navigation and can be easily extended for event scheduling or productivity tools. Designed to be lightweight, flexible, and developer-friendly.',
    links: [
      { label: 'Code', href: 'https://github.com/atanas-dim/react-grid-calendar' },
      { label: 'Live', href: 'https://react-grid-calendar.vercel.app/' },
    ],
  },
  {
    image: tiledImageLoaderImg,
    title: 'Tiled Image Loader',
    technologies: 'Next.js, TypeScript, TailwindCSS',
    description:
      'Efficiently loads and displays large images in tiles, enabling smooth zooming and panning without long waits. Originally built for a mini competition game, it’s useful for exploring detailed graphics, maps, or blueprints.',
    links: [
      { label: 'Code', href: 'https://github.com/atanas-dim/tiled-image-loader' },
      { label: 'Live', href: 'https://tiled-image-loader.vercel.app/' },
    ],
  },
  {
    image: shadersPlaygroundImg,
    title: 'Shaders Playground',
    technologies: 'Next.js, TypeScript, Three.js, GLSL',
    description:
      'An experimental playground for graphics with GLSL shaders. Explores vertex and fragment shaders to create wavy fabric-like motion and water surface effects, showcasing how custom shaders can add dynamic realism to 3D scenes.',
    links: [
      { label: 'Code', href: 'https://github.com/atanas-dim/shaders-playground' },
      { label: 'Live', href: 'https://shaders-playground-psi.vercel.app/' },
    ],
  },
  {
    image: searchingMapboxImg,
    title: 'Searching Mapbox',
    technologies: 'React, TypeScript, Mapbox GL, SASS',
    description:
      'An interactive map with a custom search bar, built on Mapbox GL. Demonstrates location search functionality with a styled React UI, making it easy to find and visualise places on the map while experimenting with Mapbox’s core features.',
    links: [
      { label: 'Code', href: 'https://github.com/atanas-dim/searching-mapbox' },
      { label: 'Live', href: 'https://searching-mapbox.netlify.app/' },
    ],
  },
]
