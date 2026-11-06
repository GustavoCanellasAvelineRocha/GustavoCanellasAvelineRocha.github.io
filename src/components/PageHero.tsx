import { SplitText, Reveal } from './motion'
import { useReady } from './ready'
import StageLights from './StageLights'

export default function PageHero({ title, lead }: { title: string; lead?: string }) {
  const ready = useReady()
  return (
    <header className="page-hero page-hero--stage pad" data-spot>
      <StageLights play={ready} />
      <h1 className="page-title">
        <SplitText text={title} by="char" play={ready} delay={0.35} stagger={0.03} />
      </h1>
      {lead && (
        <Reveal as="p" className="page-lead" delay={0.6}>
          {lead}
        </Reveal>
      )}
    </header>
  )
}
