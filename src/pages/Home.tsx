import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { profile } from '../data/profile'
import { CountUp, Magnetic, Photo, Reveal, RotatingWord, ScrollWords, SplitText, VelocityMarquee } from '../components/motion'
import { useReady } from '../components/ready'
import ProjectGlass from '../components/ProjectGlass'
import Graduation from '../components/Graduation'
import Jobs from '../components/Jobs'
import StageLights from '../components/StageLights'
import { useFinePointer, useReduce } from '../components/motion-utils'

const numbers = [
  { value: 3, suffix: '+', label: 'years building enterprise software' },
  { value: 4, label: 'countries on the teams I work with today' },
  { value: 4, label: 'graduation awards, including Best Thesis' },
  { value: 10, label: 'out of 10, the final grade of my thesis' },
]

function Hero() {
  const ready = useReady()
  const reduce = useReduce()
  const fine = useFinePointer()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 18 })
  const sy = useSpring(my, { stiffness: 80, damping: 18 })
  const nameX = useTransform(sx, [-1, 1], [16, -16])
  const rotY = useTransform(sx, [-1, 1], [-9, 9])
  const rotX = useTransform(sy, [-1, 1], [7, -7])
  const glassX = useTransform(sx, [-1, 1], [-14, 14])
  const live = fine && !reduce

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!live) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <section className="hero hero--glow pad" ref={ref} aria-labelledby="hero-name" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="hero__orbs" aria-hidden="true">
        <i />
        <i />
      </div>
      <StageLights play={ready} />
      <motion.h1 id="hero-name" className="hero__name" style={reduce ? undefined : { y: nameY, x: live ? nameX : 0 }}>
        <span className="hero__name-line">
          <SplitText text="Gustavo" by="char" play={ready} delay={0.05} />
        </span>
        <span className="hero__name-line">
          <SplitText text="Aveline" by="char" play={ready} delay={0.2} />
        </span>
      </motion.h1>
      {profile.photo && (
        <motion.div className="hero__glass" style={reduce ? undefined : { y: photoY }}>
          <motion.div
            className="hero__glass-inner"
            style={live ? { rotateX: rotX, rotateY: rotY, x: glassX } : undefined}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 40 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            <Photo
              className="hero__photo"
              src={profile.photo.src}
              alt={profile.photo.alt}
              width={profile.photo.width}
              height={profile.photo.height}
              position={profile.photo.position}
              play={ready}
              delay={0.45}
              priority
            />
          </motion.div>
        </motion.div>
      )}
      <div className="hero__bottom">
        <div className="hero__copy">
          <Reveal as="p" className="hero__intro" delay={0.5}>
            Full-stack developer with 3 years building enterprise systems in Java, Spring Boot, React and TypeScript, for teams across four countries.
          </Reveal>
          <Reveal as="p" className="hero__role" delay={0.6}>
            I build <RotatingWord words={['Kafka microservices', 'React interfaces', 'Kubernetes platforms', 'REST APIs', 'cloud deployments']} />
          </Reveal>
        </div>
        <Reveal className="hero__actions" delay={0.7}>
          <Magnetic>
            <a className="pill-btn pill-btn--solid" href={`mailto:${profile.links.email}`}>
              Get in touch
            </a>
          </Magnetic>
          <Magnetic>
            <Link className="pill-btn pill-btn--glass" to="/projects">
              See my work
            </Link>
          </Magnetic>
        </Reveal>
      </div>
      <motion.div
        className="hero__meta"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <span>Porto Alegre, Brazil</span>
        <span className="scroll-cue">
          <i aria-hidden="true" /> Scroll
        </span>
        <span>Now at Eldorado × Dell</span>
      </motion.div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section pad" aria-label="Introduction">
        <div className="statement-row">
          <ScrollWords
            className="statement"
            text="I put real effort into everything I build and always give my best, from the first idea to the last pixel."
          />
          <aside>
            <Reveal>
              <p style={{ marginBottom: 28 }}>
                Three years in enterprise teams at Dell and TicketLog. Top of my Information Systems class at PUCRS, with the Best Thesis award.
              </p>
              <Magnetic>
                <Link to="/about" className="pill-btn">
                  About me
                </Link>
              </Magnetic>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="section pad work-glass" aria-labelledby="work">
        <div className="section-head">
          <h2 id="work" className="section-title">
            <SplitText text="Selected" by="char" />
            <br />
            <SplitText text="work" by="char" delay={0.15} />
          </h2>
          <Magnetic>
            <Link to="/projects" className="pill-btn">
              All projects
            </Link>
          </Magnetic>
        </div>
        <ProjectGlass projects={profile.projects} />
      </section>

      <section className="pad" aria-label="Impact in numbers">
        <ul className="numbers">
          {numbers.map((n, i) => (
            <Reveal as="li" key={n.label} delay={i * 0.08}>
              <strong>
                <CountUp value={n.value} suffix={n.suffix} />
              </strong>
              <span>{n.label}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      <Graduation />

      <section className="section pad" aria-labelledby="experience">
        <div className="section-head">
          <h2 id="experience" className="section-title">
            <SplitText text="Experience" by="char" />
          </h2>
          <Magnetic>
            <Link to="/experience" className="pill-btn">
              Full experience
            </Link>
          </Magnetic>
        </div>
        <Jobs compact />
      </section>

      <div className="marquee-band">
        <VelocityMarquee items={['Java', 'Spring Boot', 'React', 'TypeScript', 'Kafka', 'Kubernetes', 'AWS', 'PostgreSQL']} />
      </div>
    </>
  )
}
