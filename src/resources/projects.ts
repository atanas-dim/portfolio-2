import { StaticImageData } from 'next/image'

import earthImg from '@/assets/images/3d-earth.jpg'
import searchingMapboxImg from '@/assets/images/mapbox-search.jpg'
import shadersPlaygroundImg from '@/assets/images/shaders-playground.jpg'
import tiledImageLoaderImg from '@/assets/images/tiled-image-loader.jpg'
import calendarImg from '@/assets/images/react-grid-calendar.jpg'
import nextLocalizationImg from '@/assets/images/next-localization.jpg'

export type ProjectDef = {
  videoSrc?: string
  image: StaticImageData
  title: string
  technologies: string
  links: { href: string; label: string }[]
}

export const PROJECTS: ProjectDef[] = [
  {
    image: nextLocalizationImg,
    title: 'Next Localization',
    technologies: 'TypeScript, Next.js, html-react-parser',
    links: [
      {
        label: 'Code',
        href: 'https://github.com/atanas-dim/next-localization',
      },
      {
        label: 'Live',
        href: 'https://next-localization-phi.vercel.app',
      },
    ],
  },
  {
    image: earthImg,
    title: '3D Earth',
    technologies: 'Three.js, TypeScript, Next.js',
    links: [
      {
        label: 'Gist',
        href: 'https://gist.github.com/atanas-dim/92177b10c2286ebfd865e1743c40354d',
      },
      {
        label: 'Live',
        href: 'https://earth-model-3d.vercel.app/',
      },
    ],
  },
  {
    image: calendarImg,
    title: 'React Grid Calendar',
    technologies: 'TypeScript, Next.js, date-fns, TailwindCSS',
    links: [
      {
        label: 'Code',
        href: 'https://github.com/atanas-dim/react-grid-calendar',
      },
      {
        label: 'Live',
        href: 'https://react-grid-calendar.vercel.app/',
      },
    ],
  },
  {
    image: tiledImageLoaderImg,
    title: 'Tiled Image Loader',
    technologies: 'Next.js, TypeScript, TailwindCSS',
    links: [
      {
        label: 'Code',
        href: 'https://github.com/atanas-dim/tiled-image-loader',
      },
      {
        label: 'Live',
        href: 'https://tiled-image-loader.vercel.app/',
      },
    ],
  },
  {
    image: shadersPlaygroundImg,
    title: 'Shaders Playground',
    technologies: 'Next.js, TypeScript, Three.js, GLSL',
    links: [
      {
        label: 'Code',
        href: 'https://github.com/atanas-dim/shaders-playground',
      },
      {
        label: 'Live',
        href: 'https://shaders-playground-psi.vercel.app/',
      },
    ],
  },
  {
    image: searchingMapboxImg,
    title: 'Searching Mapbox',
    technologies: 'React, TypeScript, Mapbox GL, SASS',
    links: [
      {
        label: 'Code',
        href: 'https://github.com/atanas-dim/searching-mapbox',
      },
      {
        label: 'Live',
        href: 'https://searching-mapbox.netlify.app/',
      },
    ],
  },
]
