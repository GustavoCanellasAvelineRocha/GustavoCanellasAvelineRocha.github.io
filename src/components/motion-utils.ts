import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import Lenis from 'lenis'
import { useAppSelector } from '../store'

export const ease = [0.76, 0, 0.24, 1] as const
export const easeOut = [0.16, 1, 0.3, 1] as const

export function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return fine
}

export function useSmoothScroll() {
  const reduce = useReduce()
  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({ lerp: 0.09, autoRaf: true })
    return () => lenis.destroy()
  }, [reduce])
}

export function useReduce() {
  const pref = useAppSelector((s) => s.motion.pref)
  const system = useReducedMotion()
  if (pref === 'full') return false
  if (pref === 'reduced') return true
  return !!system
}
