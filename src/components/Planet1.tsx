'use client'

import Image from 'next/image'
import planet1Img from '@/assets/images/planet-1.png'
import { useRef, type FC } from 'react'

const Planet1: FC = () => {
  const planet1Ref = useRef<HTMLImageElement>(null)

  return (
    <div className="mix-blend-color-burn">
      <Image
        role="presentation"
        ref={planet1Ref}
        src={planet1Img}
        alt=""
        className="xs:-right-10 pointer-events-none absolute top-1/50 -right-38 -z-1 size-100 max-w-none opacity-50 grayscale md:top-1/30 md:-right-16 md:size-120 xl:-right-50 xl:size-140"
        quality={100}
      />
    </div>
  )
}

export default Planet1
