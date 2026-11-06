import {
  animate,
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  type MotionValue,
} from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ease, easeOut, useReduce } from './motion-utils'

export function Preloader({ name, onDone }: { name: string; onDone: () => void }) {
  const reduce = useReduce()
  const [count, setCount] = useState(0)
  const [seen] = useState(() => {
    try {
      return sessionStorage.getItem('intro-seen') === '1'
    } catch {
      return false
    }
  })
  const skip = !!reduce || seen
  const [show, setShow] = useState(!skip)

  useEffect(() => {
    if (skip) {
      onDone()
      return
    }
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        try {
          sessionStorage.setItem('intro-seen', '1')
        } catch {}
        setShow(false)
      },
    })
    return () => controls.stop()
  }, [skip, onDone])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="preloader"
          aria-hidden="true"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.9, ease }}
        >
          <span className="preloader__name">{name}</span>
          <span className="preloader__role">Full-stack Developer · Porto Alegre</span>
          <span className="preloader__count">{count}</span>
          <motion.span className="preloader__bar" style={{ scaleX: count / 100 }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Magnetic({ children }: { children: ReactNode; strength?: number }) {
  return <div className="magnetic">{children}</div>
}

export function SplitText({
  text,
  by = 'word',
  delay = 0,
  stagger,
  onView = true,
  play,
  className,
}: {
  text: string
  by?: 'word' | 'char'
  delay?: number
  stagger?: number
  onView?: boolean
  play?: boolean
  className?: string
}) {
  const reduce = useReduce()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  const parts = by === 'char' ? Array.from(text) : text.split(' ')
  const step = stagger ?? (by === 'char' ? 0.035 : 0.06)
  const shown = play !== undefined ? play : onView ? inView : true
  const hidden = { y: '110%', rotate: by === 'char' ? 0 : 4 }
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {parts.map((p, i) => (
        <span className="mask" key={i} aria-hidden="true">
          <motion.span
            initial={reduce ? false : hidden}
            animate={reduce || shown ? { y: '0%', rotate: 0 } : hidden}
            transition={{ duration: 1, ease: easeOut, delay: delay + i * step }}
          >
            {p === ' ' ? '\u00a0' : p}
          </motion.span>
          {by === 'word' && i < parts.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  )
}

export function Reveal({
  children,
  delay = 0,
  y = 50,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'p' | 'section' | 'article'
}) {
  const reduce = useReduce()
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.1, ease: easeOut, delay }}
    >
      {children}
    </Comp>
  )
}

export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReduce()
  const [n, setN] = useState(reduce ? value : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, value, { duration: 2, ease: easeOut, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, reduce, value])
  return (
    <span ref={ref}>
      <span className="sr-only">{`${value.toLocaleString('en-US')}${suffix}`}</span>
      <span aria-hidden="true">
        {n.toLocaleString('en-US')}
        {suffix}
      </span>
    </span>
  )
}

export function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const reduce = useReduce()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [reduce, words.length, interval])
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '')
  return (
    <span className="mask rotator" style={{ verticalAlign: 'bottom' }}>
      <span className="hero__role-word rotator__sizer" aria-hidden="true">
        {longest}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={words[i]}
          className="hero__role-word rotator__word"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function VelocityMarquee({ items, baseVelocity = -2 }: { items: string[]; baseVelocity?: number }) {
  const reduce = useReduce()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const vf = velocityFactor.get()
    if (vf < 0) direction.current = -1
    else if (vf > 0) direction.current = 1
    moveBy += direction.current * moveBy * vf
    baseX.set(baseX.get() + moveBy)
  })

  const row = [...items, ...items]
  return (
    <div className="vmarquee">
      <p className="sr-only">{items.join(', ')}</p>
      <motion.div className="vmarquee__track" style={{ x }} aria-hidden="true">
        {row.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </motion.div>
    </div>
  )
}

export function Photo({
  src,
  alt,
  className,
  width,
  height,
  delay = 0,
  play,
  position,
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  width: number
  height: number
  delay?: number
  play?: boolean
  position?: string
  priority?: boolean
}) {
  const reduce = useReduce()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const shown = play !== undefined ? play && inView : inView
  return (
    <figure ref={ref} className={`photo ${className ?? ''}`}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={position ? { objectPosition: position } : undefined}
        initial={reduce ? false : { scale: 1.25, clipPath: 'inset(100% 0 0 0)' }}
        animate={reduce || shown ? { scale: 1, clipPath: 'inset(0% 0 0 0)' } : { scale: 1.25, clipPath: 'inset(100% 0 0 0)' }}
        transition={{ duration: 1.1, ease, delay: delay + 0.2 }}
      />
      {!reduce && (
        <motion.span
          className="photo__curtain"
          aria-hidden="true"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={shown ? { clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)', 'inset(0 0 100% 0)'] } : { clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: 1, ease, delay, times: [0, 0.45, 1] }}
        />
      )}
    </figure>
  )
}

function ScrollWord({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <>
      <motion.span style={{ opacity }}>{word}</motion.span>{' '}
    </>
  )
}

export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const reduce = useReduce()
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  if (reduce) return <p className={className}>{text}</p>
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <ScrollWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </span>
    </p>
  )
}
