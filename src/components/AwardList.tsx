import { profile } from '../data/profile'
import { Reveal } from './motion'

export default function AwardList({ limit, level = 3 }: { limit?: number; level?: 2 | 3 }) {
  const Title = level === 2 ? 'h2' : 'h3'
  const awards = limit ? profile.awards.slice(0, limit) : profile.awards
  return (
    <ul className="awards">
      {awards.map((a, i) => (
        <Reveal as="li" key={a.title} className="award" delay={i * 0.05}>
          <Title className="award__title">{a.title}</Title>
          <p className="award__text">{a.description}</p>
          <span className="award__meta">{[a.issuer, a.date].filter(Boolean).join(' · ')}</span>
        </Reveal>
      ))}
    </ul>
  )
}
