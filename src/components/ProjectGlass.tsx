import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { Project } from '../data/profile'
import { CountUp, Photo } from './motion'
import { useFinePointer, useReduce } from './motion-utils'

const figures: Record<string, { value?: number; suffix?: string; text?: string; label: string }> = {
  'thesis-forecasting': { text: '10/10', label: 'final grade, and the Best Thesis award' },
  'ages-stress': { text: 'Team lead', label: 'led the team and was the go-to for technical questions' },
}

const easeOut = [0.16, 1, 0.3, 1] as const

function Card({ p, i }: { p: Project; i: number }) {
  const reduce = useReduce()
  const fine = useFinePointer()
  const live = fine && !reduce
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 140, damping: 18 })
  const sy = useSpring(my, { stiffness: 140, damping: 18 })
  const rotY = useTransform(sx, [-1, 1], [-5, 5])
  const rotX = useTransform(sy, [-1, 1], [4, -4])
  const fig = figures[p.id]

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!live || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.article
      ref={ref}
      className={`glass-card${i % 2 ? ' glass-card--flip' : ''}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={live ? { rotateX: rotX, rotateY: rotY } : undefined}
      initial={reduce ? false : { opacity: 0, y: 48, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: easeOut }}
    >
      {p.image ? (
        <Photo className="glass-card__photo" src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} position={p.image.position} />
      ) : (
        fig && (
          <div className="glass-card__panel">
            <strong>{fig.value !== undefined ? <CountUp value={fig.value} suffix={fig.suffix} /> : fig.text}</strong>
            <span>{fig.label}</span>
          </div>
        )
      )}
      <div className="glass-card__body">
        <p className="glass-card__ctx">{[p.context, p.subtitle].filter(Boolean).join(' · ')}</p>
        {fig && p.image && (
          <p className="glass-card__figure">
            <strong>{fig.value !== undefined ? <CountUp value={fig.value} suffix={fig.suffix} /> : fig.text}</strong>
            <span>{fig.label}</span>
          </p>
        )}
        <h3 className="glass-card__title">{p.title}</h3>
        <p className="glass-card__result">{fig ? p.result : p.description}</p>
        <ul className="glass-card__tech" aria-label="Technologies">
          {p.tech.slice(0, 4).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <Link to={`/projects#${p.id}`} className="glass-card__link" data-cursor="View">
          Read the case <span aria-hidden="true">→</span>
        </Link>
      </div>
    </motion.article>
  )
}

export default function ProjectGlass({ projects }: { projects: Project[] }) {
  return (
    <div className="glass-grid">
      {projects.map((p, i) => (
        <Card key={p.id} p={p} i={i} />
      ))}
    </div>
  )
}
