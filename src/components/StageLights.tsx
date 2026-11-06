import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useFinePointer, useReduce } from './motion-utils'

const strips = [
  { top: 14, left: -10, width: 46, depth: 0.2, delay: 0, speed: 140 },
  { top: 27, left: 52, width: 62, depth: 0.55, delay: 0.15, speed: 95 },
  { top: 41, left: -18, width: 38, depth: 0.35, delay: 0.3, speed: 120 },
  { top: 56, left: 40, width: 70, depth: 0.8, delay: 0.1, speed: 80 },
  { top: 70, left: -6, width: 54, depth: 0.45, delay: 0.25, speed: 105 },
  { top: 84, left: 58, width: 48, depth: 0.25, delay: 0.4, speed: 130 },
]

function Strip({ s, mx, my, play, still, phase }: { s: (typeof strips)[number]; mx: ReturnType<typeof useSpring>; my: ReturnType<typeof useSpring>; play: boolean; still: boolean; phase: number }) {
  const x = useTransform(mx, (v) => v * 60 * s.depth)
  const y = useTransform(my, (v) => v * 30 * s.depth)
  return (
    <span className="stage-lights__lane" style={{ animationDuration: `${s.speed}s`, animationDelay: `${-s.speed * (((s.left + 20) / 100 + phase) % 1)}s` }}>
      <motion.span
        className="stage-lights__strip"
        style={{ top: `${s.top}%`, left: '0%', width: `${s.width}%`, x, y }}
        initial={still ? false : { scaleX: 0 }}
        animate={{ scaleX: play ? 1 : 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 + s.delay }}
      />
    </span>
  )
}

export default function StageLights({ play = true }: { play?: boolean }) {
  const reduce = useReduce()
  const fine = useFinePointer()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const mx = useSpring(px, { stiffness: 40, damping: 18 })
  const my = useSpring(py, { stiffness: 40, damping: 18 })

  useEffect(() => {
    if (!fine || reduce) return
    const move = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5)
      py.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [fine, reduce, px, py])

  return (
    <div className="stage-lights" aria-hidden="true">
      {[0, 0.5].flatMap((phase) =>
        strips.map((s, i) => (
          <Strip key={`${phase}-${i}`} s={s} mx={mx} my={my} play={play || !!reduce} still={!!reduce} phase={phase} />
        )),
      )}
    </div>
  )
}
