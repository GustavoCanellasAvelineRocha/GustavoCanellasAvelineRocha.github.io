import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { profile } from '../data/profile'
import { Photo, Reveal } from './motion'
import { useReduce } from './motion-utils'

export default function Jobs({ compact = false, level = 3 }: { compact?: boolean; level?: 2 | 3 }) {
  const Role = level === 2 ? 'h2' : 'h3'
  const reduce = useReduce()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  return (
    <div className="jobs-wrap" ref={ref}>
      <span className="jobs__rail" aria-hidden="true">
        <motion.span className="jobs__beam" style={reduce ? undefined : { scaleY: draw }} />
      </span>
      <ol className="jobs">
      {profile.experience.map((e) => (
        <li key={e.company + e.start} className="job">
          <motion.span
            className="job__dot"
            aria-hidden="true"
            initial={reduce ? false : { scale: 0.4, opacity: 0.3 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -30% 0px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="job__when">
            <span className="job__year">{e.start.slice(-4)}</span>
            <span className="job__range">
              {e.start} – {e.end ?? 'Present'}
            </span>
          </div>
          <Reveal className="job__body">
            <Role className="job__role">{e.role}</Role>
            <p className="job__org">
              {e.company}
              {e.client && <span> at {e.client}</span>}
            </p>
            {e.note && <span className="tag">{e.note}</span>}
            {e.summary && <p className="job__summary">{e.summary}</p>}
            <ul className="bullets">
              {(compact ? e.highlights.slice(0, 2) : e.highlights).map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </Reveal>
          {e.image && (
            <Photo
              className="job__photo"
              src={e.image.src}
              alt={e.image.alt}
              width={e.image.width}
              height={e.image.height}
              position={e.image.position}
            />
          )}
        </li>
      ))}
      </ol>
    </div>
  )
}
