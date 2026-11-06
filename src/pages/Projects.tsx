import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { profile } from '../data/profile'
import { useAppDispatch, useAppSelector } from '../store'
import { setTechFilter } from '../store/projectsSlice'
import PageHero from '../components/PageHero'
import { easeOut, useReduce } from '../components/motion-utils'
import { Photo } from '../components/motion'

const AREAS = ['Backend', 'Front-end', 'Cloud & DevOps', 'Data & AI']

export default function Projects() {
  const filter = useAppSelector((s) => s.projects.techFilter)
  const dispatch = useAppDispatch()
  const reduce = useReduce()
  const { hash } = useLocation()
  const visible = filter ? profile.projects.filter((p) => p.areas.includes(filter)) : profile.projects

  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => {
      const el = document.getElementById(hash.slice(1))
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - 96
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
      el.focus({ preventScroll: true })
    }, 900)
    return () => clearTimeout(t)
  }, [hash, reduce])

  return (
    <>
      <PageHero title="Projects" lead="Work from production systems, research and university, with the result each one delivered." />
      <section className="section pad" style={{ paddingTop: 0 }}>
        <div className="filters" role="group" aria-label="Filter by area">
          <button type="button" className="filter" aria-pressed={!filter} onClick={() => dispatch(setTechFilter(null))}>
            All ({profile.projects.length})
          </button>
          {AREAS.map((t) => (
            <button
              key={t}
              type="button"
              className="filter"
              aria-pressed={filter === t}
              onClick={() => dispatch(setTechFilter(filter === t ? null : t))}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {visible.length} projects shown
        </p>
        <ul style={{ borderTop: '1px solid var(--line)' }}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.li
                key={p.id}
                id={p.id}
                tabIndex={-1}
                layout={!reduce}
                className="project-full"
                initial={reduce ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: easeOut, delay: i * 0.05 }}
              >
                <div className="project-full__head">
                  <p className="label">{[p.context, p.subtitle].filter(Boolean).join(' · ')}</p>
                  <h2 className="project-full__title">{p.title}</h2>
                  {p.image && (
                    <Photo
                      className="project-full__photo"
                      src={p.image.src}
                      alt={p.image.alt}
                      width={p.image.width}
                      height={p.image.height}
                      position={p.image.position}
                    />
                  )}
                </div>
                <div className="project-full__body">
                  <p>{p.description}</p>
                  <ul className="bullets">
                    {p.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  {p.result && <p className="result">{p.result}</p>}
                  <ul className="chips" aria-label="Technologies">
                    {p.tech.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                  {(p.repoUrl || p.liveUrl) && (
                    <p className="chips">
                      {p.repoUrl && <a href={p.repoUrl}>Source code</a>}
                      {p.liveUrl && <a href={p.liveUrl}>Live demo</a>}
                    </p>
                  )}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {visible.length === 0 && <p className="empty">No projects in {filter} yet.</p>}
      </section>
    </>
  )
}
