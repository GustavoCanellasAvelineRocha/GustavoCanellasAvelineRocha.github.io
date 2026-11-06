import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { profile } from '../data/profile'
import { useAppDispatch, useAppSelector } from '../store'
import { toggleTheme } from '../store/themeSlice'
import { CloseIcon, MenuIcon, MoonIcon, MotionIcon, StillIcon, SunIcon } from './Icons'
import { setMotion } from '../store/motionSlice'
import { Preloader } from './motion'
import { ease, useSmoothScroll, useReduce } from './motion-utils'
import { ReadyContext } from './ready'
import Contact from './ContactSection'

const links = [
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/awards', label: 'Awards' },
  { to: '/contact', label: 'Contact' },
]

const titles: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/experience': 'Experience',
  '/projects': 'Projects',
  '/awards': 'Awards',
  '/contact': 'Contact',
}

const meta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Gustavo Aveline · Full-stack Developer',
    description:
      'Full-stack developer in Porto Alegre building enterprise systems with Java, Spring Boot, React and TypeScript. Best Thesis and highest GPA at PUCRS.',
  },
  '/about': {
    title: 'About · Gustavo Aveline',
    description: 'Background, skills, education and languages of Gustavo Aveline, full-stack developer at Eldorado working with Dell.',
  },
  '/experience': {
    title: 'Experience · Gustavo Aveline',
    description: 'Three years building enterprise systems at Eldorado (Dell) and DBC Company (TicketLog), from intern to full-stack developer.',
  },
  '/projects': {
    title: 'Projects · Gustavo Aveline',
    description: 'Enterprise back-end and cloud work, a Transformer stock forecasting thesis graded 10/10 and a stress management app built as project lead.',
  },
  '/awards': {
    title: 'Awards · Gustavo Aveline',
    description: 'Best Undergraduate Thesis, Academic Excellence and Outstanding Student awards at PUCRS, with photos from the graduation.',
  },
  '/contact': {
    title: 'Contact · Gustavo Aveline',
    description: 'Get in touch with Gustavo Aveline by email, LinkedIn or GitHub.',
  },
}

function useHeaderState() {
  const { scrollY } = useScroll()
  const [state, setState] = useState({ scrolled: false, hidden: false })
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    const scrolled = y > 40
    const hidden = y > 400 && y > prev + 2 ? true : y < prev - 2 ? false : state.hidden
    if (scrolled !== state.scrolled || hidden !== state.hidden) setState({ scrolled, hidden })
  })
  return state
}

export default function Layout() {
  const mode = useAppSelector((s) => s.theme.mode)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const outlet = useOutlet()
  const reduce = useReduce()
  const [ready, setReady] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const onLoaded = useCallback(() => setReady(true), [])
  const header = useHeaderState()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  useSmoothScroll()

  useEffect(() => {
    const m = meta[location.pathname] ?? { title: 'Page not found · Gustavo Aveline', description: meta['/'].description }
    document.title = m.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  useEffect(() => {
    document.documentElement.dataset.theme = mode
  }, [mode])

  useEffect(() => {
    document.documentElement.dataset.motion = reduce ? 'reduced' : 'full'
  }, [reduce])

  const nextMode = mode === 'dark' ? 'light' : 'dark'
  const skipCurtain = location.key === 'default' || !!reduce

  return (
    <ReadyContext.Provider value={ready}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Preloader name={profile.shortName} onDone={onLoaded} />

      <header className={`header${location.pathname !== '/' ? ' header--on-dark' : ''}${header.scrolled ? ' is-scrolled' : ''}${header.hidden && !menuOpen ? ' is-hidden' : ''}`}>
        <Link to="/" className="header__name" onClick={() => setMenuOpen(false)}>
          <i className="header__mark" aria-hidden="true" />
          {profile.shortName} <span>Full-stack Developer</span>
        </Link>
        <nav aria-label="Main" className="header__nav">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="header__tools">
          {profile.cv && (
            <a className="header__cv" href={profile.cv} download>
              CV
            </a>
          )}
          <button
            type="button"
            className="icon-btn"
            aria-pressed={!reduce}
            aria-label={reduce ? 'Turn animations on' : 'Turn animations off'}
            title={reduce ? 'Turn animations on' : 'Turn animations off'}
            onClick={() => dispatch(setMotion(reduce ? 'full' : 'reduced'))}
          >
            {reduce ? <StillIcon /> : <MotionIcon />}
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label={`Switch to ${nextMode} theme`}
            title={`Switch to ${nextMode} theme`}
            onClick={() => dispatch(toggleTheme())}
          >
            {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        <motion.span className="header__progress" style={{ scaleX: progress }} aria-hidden="true" />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease }}
          >
            <nav aria-label="Mobile">
              {links.map((l, i) => (
                <span className="mask" key={l.to}>
                  <motion.span
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.06 }}
                  >
                    <NavLink to={l.to} onClick={() => setMenuOpen(false)}>
                      {l.label}
                    </NavLink>
                  </motion.span>
                </span>
              ))}
            </nav>
            <div className="mobile-menu__foot">
              <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>
              {profile.cv && (
                <a href={profile.cv} download>
                  Download CV
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div key={location.pathname} initial="initial" animate="enter" exit="exit">
          {!reduce && (
            <motion.div
              className="curtain"
              aria-hidden="true"
              variants={{
                initial: { clipPath: skipCurtain ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)' },
                enter: { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.75, ease, delay: skipCurtain ? 0 : 0.35 } },
                exit: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.6, ease } },
              }}
            >
              <motion.i
                className="curtain__beam"
                variants={{
                  initial: { x: '-110%' },
                  enter: { x: '110%', transition: { duration: 0.9, ease } },
                  exit: { x: ['-110%', '110%'], transition: { duration: 0.75, ease, delay: 0.05 } },
                }}
              />
              <motion.span
                variants={{
                  initial: { opacity: 1, y: 0 },
                  enter: { opacity: 0, y: -40, transition: { duration: 0.5, ease, delay: 0.25 } },
                  exit: { opacity: 0, transition: { duration: 0 } },
                }}
              >
                {titles[location.pathname] ?? ''}
              </motion.span>
            </motion.div>
          )}
          <main id="main">{outlet}</main>
          {location.pathname !== '/contact' && <Contact />}
        </motion.div>
      </AnimatePresence>
    </ReadyContext.Provider>
  )
}
