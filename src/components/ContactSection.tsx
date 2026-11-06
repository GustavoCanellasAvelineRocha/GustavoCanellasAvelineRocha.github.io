import { profile } from '../data/profile'
import { Magnetic, Reveal, SplitText } from './motion'
import { ArrowIcon } from './Icons'
import StageLights from './StageLights'

const YEAR = new Date().getFullYear()

export default function ContactSection({ asPage = false }: { asPage?: boolean }) {
  const { email, linkedin, github } = profile.links
  const Title = asPage ? 'h1' : 'h2'
  return (
    <footer data-spot className="contact pad" style={asPage ? { minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' } : undefined}>
      <StageLights />
      <Title className="contact__title">
        <SplitText text="Let’s work" by="char" stagger={0.025} />
        <br />
        <SplitText className="accent" text="together" by="char" stagger={0.025} delay={0.2} />
      </Title>
      <div className="contact__row">
        <Magnetic strength={0.4}>
          <a className="pill-btn circle-btn" href={`mailto:${email}`} data-cursor="Write">
            Get in
            <br />
            touch
          </a>
        </Magnetic>
        <Reveal className="contact__links">
          <Magnetic>
            <a className="pill-btn" href={`mailto:${email}`}>
              {email} <ArrowIcon />
            </a>
          </Magnetic>
          <Magnetic>
            <a className="pill-btn" href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </Magnetic>
          <Magnetic>
            <a className="pill-btn" href={github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </Magnetic>
          {profile.cv && (
            <Magnetic>
              <a className="pill-btn" href={profile.cv} download>
                Download CV
              </a>
            </Magnetic>
          )}
        </Reveal>
      </div>
      <div className="contact__bottom">
        <span>
          © {YEAR} {profile.name}
        </span>
        <span>{profile.location}</span>
      </div>
    </footer>
  )
}
