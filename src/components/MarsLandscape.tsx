'use client'
import Image from 'next/image'
import { useRef, type FC } from 'react'
import marsImg from '@/assets/images/mars-landscape.png'

const MarsLandscape: FC = () => {
  const landscapeRef = useRef<HTMLImageElement>(null)

  return (
    <div
      role="presentation"
      className="pointer-events-none absolute bottom-0 left-0 -z-1 flex size-full h-fit justify-center overflow-hidden mix-blend-overlay">
      <Image
        ref={landscapeRef}
        src={marsImg}
        alt=""
        className="h-auto w-14/10 max-w-[2000px] grayscale md:w-full"
        quality={100}
      />
    </div>
  )
}

export default MarsLandscape
