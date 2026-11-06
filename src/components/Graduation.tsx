import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from 'motion/react'
import { profile } from '../data/profile'
import { Magnetic, SplitText } from './motion'
import { useReduce } from './motion-utils'

const awards = profile.awards.slice(0, 4)

function AwardLine({ i, progress, title, text }: { i: number; progress: MotionValue<number>; title: string; text?: string }) {
  const start = 0.42 + i * 0.12
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1])
  const y = useTransform(progress, [start, start + 0.1], [40, 0])
  return (
    <motion.li className="grad__award" style={{ opacity, y }}>
      <span className="grad__award-title">{title}</span>
      {text && <span className="grad__award-text">{text}</span>}
    </motion.li>
  )
}

export default function Graduation() {
  const reduce = useReduce()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const inset = useTransform(scrollYProgress, [0, 0.4], [26, 0])
  const side = useTransform(scrollYProgress, [0, 0.4], [32, 0])
  const radius = useTransform(scrollYProgress, [0, 0.4], [4, 0])
  const clipPath = useMotionTemplate`inset(${inset}% ${side}% ${inset}% ${side}% round ${radius}px)`
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.18, 1])
  const shade = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  if (reduce) {
    return (
      <section className="grad grad--static" aria-labelledby="grad-title">
        <img className="grad__static-img" src="/images/award-stage.jpg" alt="Gustavo on stage at the PUCRS graduation, receiving an award at the PUCRS graduation ceremony" width={2048} height={1365} loading="lazy" />
        <div className="grad__static-body pad">
          <h2 id="grad-title" className="grad__title">Top of the class</h2>
          <ul className="grad__awards">
            {awards.map((a) => (
              <li key={a.title} className="grad__award">
                <span className="grad__award-title">{a.title}</span>
                {a.description && <span className="grad__award-text">{a.description}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="grad" aria-labelledby="grad-title">
      <div className="grad__sticky" data-spot>
        <motion.h2 id="grad-title" className="grad__title grad__title--intro pad" style={{ opacity: titleOpacity }}>
          <SplitText text="Top of" by="char" stagger={0.03} />
          <br />
          <SplitText text="the class" by="char" stagger={0.03} delay={0.15} />
        </motion.h2>
        <motion.div className="grad__frame" style={{ clipPath }}>
          <motion.img
            src="/images/award-stage.jpg"
            alt="Gustavo on stage at the PUCRS graduation, receiving an award at the PUCRS graduation ceremony"
            width={2048}
            height={1365}
            loading="lazy"
            style={{ scale }}
          />
          <motion.div className="grad__shade" style={{ opacity: shade }} aria-hidden="true" />
        </motion.div>
        <div className="grad__overlay pad">
          <ul className="grad__awards">
            {awards.map((a, i) => (
              <AwardLine key={a.title} i={i} progress={scrollYProgress} title={a.title} text={a.description} />
            ))}
          </ul>
          <Magnetic>
            <Link to="/awards" className="pill-btn pill-btn--light">
              All awards and photos
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
