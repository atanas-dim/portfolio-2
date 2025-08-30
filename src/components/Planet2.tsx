'use client'

import Image from 'next/image'
import planet2Img from '@/assets/images/planet-2.png'
import { useRef, type FC } from 'react'

const Planet2: FC = () => {
  const planet2Ref = useRef<HTMLImageElement>(null)

  return (
    <Image
      role="presentation"
      ref={planet2Ref}
      src={planet2Img}
      alt=""
      className="pointer-events-none absolute -top-5/50 -left-40 -z-1 size-90 max-w-none opacity-20 mix-blend-color-burn grayscale md:-left-40 lg:-left-50 xl:-left-120 xl:size-120"
      quality={100}
    />
  )
}

export default Planet2
