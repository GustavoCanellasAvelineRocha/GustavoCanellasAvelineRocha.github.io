import { profile } from '../data/profile'
import PageHero from '../components/PageHero'
import { Photo, Reveal } from '../components/motion'

export default function About() {
  return (
    <>
      <PageHero title="About" lead={profile.tagline} />
      <div className="pad">
        <Photo
          className="about-photo"
          src="/images/speech-podium.jpg"
          alt="Gustavo giving a speech at the PUCRS podium during the graduation ceremony"
          width={800}
          height={533}
          position="50% 30%"
        />
      </div>
      <section className="section pad">
        <div className="about-grid">
          <p className="label">Who I am</p>
          <Reveal className="about-body prose">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <p className="label">Skills</p>
          <Reveal className="about-body">
            <dl className="kv">
              {profile.skills.map((g) => (
                <div key={g.category}>
                  <dt>{g.category}</dt>
                  <dd>{g.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <p className="label">Education</p>
          <Reveal className="about-body">
            <dl className="kv">
              {profile.education.map((e) => (
                <div key={e.institution}>
                  <dt>{e.degree}</dt>
                  <dd>
                    {e.institution}, {e.start} – {e.end}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <p className="label">Languages</p>
          <Reveal className="about-body">
            <dl className="kv">
              {profile.languages.map((l) => (
                <div key={l.name}>
                  <dt>{l.name}</dt>
                  <dd>{l.level}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <p className="label">Certifications</p>
          <Reveal className="about-body">
            <ul className="bullets">
              {profile.certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
