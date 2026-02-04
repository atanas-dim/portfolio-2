'use client'
import gsap from 'gsap'
import { useRef, useEffect, type FC } from 'react'

type ShootingStarsProps = {
  count?: number
  minDuration?: number
  maxDuration?: number
}

const FPS = 30
const FRAME_INTERVAL = 1000 / FPS

const MIN_STAR_LENGTH = 80
const MAX_STAR_LENGTH = 160
const LINE_WIDTH = 4
const COLOR_START = [255, 100, 103] as const // red
const COLOR_END = [255, 255, 255] as const // white

const MAX_SCROLL_OFFSET = -400 // px

type Star = {
  x: number
  y: number
  dx: number
  dy: number
  length: number
  angle: number
  duration: number
  delay: number
  startTime: number
  opacity: number
  phase: 'waiting' | 'fading-in' | 'moving' | 'fading-out'
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const drawStar = ({
  ctx,
  star,
  moveT,
  colorT,
  globalAlpha = 1,
  scrollOffset = 0,
}: {
  ctx: CanvasRenderingContext2D
  star: Star
  moveT: number
  colorT: number
  globalAlpha?: number
  scrollOffset?: number
}) => {
  // Calculate position along movement path
  const x1 = star.x + star.dx * moveT
  const y1 = star.y + star.dy * moveT + scrollOffset

  // Calculate line endpoints (along movement direction)
  const moveDist = Math.sqrt(star.dx * star.dx + star.dy * star.dy)
  const normDx = star.dx / moveDist
  const normDy = star.dy / moveDist
  const x2 = x1 - normDx * star.length
  const y2 = y1 - normDy * star.length

  // Interpolate color from white to pink/red
  const r = Math.round(lerp(COLOR_START[0], COLOR_END[0], colorT))
  const g = Math.round(lerp(COLOR_START[1], COLOR_END[1], colorT))
  const b = Math.round(lerp(COLOR_START[2], COLOR_END[2], colorT))

  // Create gradient from transparent to opaque
  const grad = ctx.createLinearGradient(x2, y2, x1, y1)
  grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
  grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.5)`)

  // Draw the line
  ctx.save()
  ctx.globalAlpha = globalAlpha
  ctx.strokeStyle = grad
  ctx.lineWidth = LINE_WIDTH
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(x2, y2)
  ctx.lineTo(x1, y1)
  ctx.stroke()
  ctx.restore()
}

const createStar = (now: number, w: number, h: number, minDuration: number, maxDuration: number): Star => {
  const angle = Math.random() * 2 * Math.PI
  const maxDistance = Math.min(w, h) * 0.5
  const dx = Math.cos(angle) * maxDistance
  const dy = Math.sin(angle) * maxDistance
  const startX = Math.random() * w
  const startY = Math.random() * h
  const endX = Math.min(Math.max(startX + dx, 0), w)
  const endY = Math.min(Math.max(startY + dy, 0), h)
  // const movementDistance = Math.sqrt(dx * dx + dy * dy)
  const duration = lerp(minDuration, maxDuration, Math.random()) * 1000
  const delay = Math.random() * 6000
  const length = lerp(MIN_STAR_LENGTH, MAX_STAR_LENGTH, Math.random())

  return {
    x: startX,
    y: startY,
    dx: endX - startX,
    dy: endY - startY,
    length,
    angle,
    duration,
    delay,
    startTime: now,
    opacity: 0,
    phase: 'waiting',
  }
}

const ShootingStars: FC<ShootingStarsProps> = ({ count = 3, minDuration = 7, maxDuration = 18 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const starsRef = useRef<Star[]>([])
  const scrollProgressRef = useRef({ value: 0 })

  useEffect(() => {
    gsap.to(scrollProgressRef.current, {
      value: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    })
  }, [])

  const getCanvasSize = () => {
    const w = canvasRef.current?.clientWidth || window.innerWidth
    const h = canvasRef.current?.clientHeight || window.innerHeight
    return { w, h }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { w, h } = getCanvasSize()

    canvas.width = w * window.devicePixelRatio
    canvas.height = h * window.devicePixelRatio

    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)

    // Initialize stars
    const now = performance.now()
    starsRef.current = Array.from({ length: count }, () => createStar(now, w, h, minDuration, maxDuration))

    let lastFrameTime = now

    function animate() {
      if (!ctx) return
      const t = performance.now()
      const elapsed = t - lastFrameTime

      if (elapsed < FRAME_INTERVAL) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      lastFrameTime = t - (elapsed % FRAME_INTERVAL)

      ctx.clearRect(0, 0, w, h)

      const scrollOffset = scrollProgressRef.current.value * MAX_SCROLL_OFFSET

      for (const star of starsRef.current) {
        const elapsed = t - star.startTime

        if (star.phase === 'waiting') {
          if (elapsed >= star.delay) {
            star.phase = 'fading-in'
            star.startTime = t
          }
          continue
        }

        if (star.phase === 'fading-in') {
          const fadeInT = Math.min((t - star.startTime) / 400, 1)
          star.opacity = fadeInT
          drawStar({ ctx, star, moveT: 0, colorT: 0, globalAlpha: star.opacity, scrollOffset }) // moveT=0 (start), colorT=0 (white), fade in
          if (fadeInT >= 1) {
            star.phase = 'moving'
            star.startTime = t
          }
          continue
        }

        if (star.phase === 'moving') {
          const moveT = Math.min((t - star.startTime) / star.duration, 1)
          star.opacity = moveT
          drawStar({ ctx, star, moveT, colorT: moveT, globalAlpha: 1, scrollOffset }) // moveT for position and color interpolation
          if (moveT >= 1) {
            star.phase = 'fading-out'
            star.startTime = t
          }
        } else if (star.phase === 'fading-out') {
          const fadeT = Math.min((t - star.startTime) / 400, 1)
          star.opacity = 1 - fadeT
          drawStar({ ctx, star, moveT: 1, colorT: 1, globalAlpha: star.opacity, scrollOffset }) // moveT=1 (end), colorT=1 (pink/red), fade out
          if (fadeT >= 1) {
            Object.assign(star, createStar(t, w, h, minDuration, maxDuration))
          }
        }
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)

    const onResize = () => {
      const { w, h } = getCanvasSize()
      canvas.width = w * window.devicePixelRatio
      canvas.height = h * window.devicePixelRatio
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationRef.current!)
    }
  }, [count, minDuration, maxDuration])

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed top-0 left-0 -z-5 h-svh w-svw" aria-hidden="true" />
  )
}

export default ShootingStars
