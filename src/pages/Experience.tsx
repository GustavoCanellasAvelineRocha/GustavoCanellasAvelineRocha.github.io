import PageHero from '../components/PageHero'
import Jobs from '../components/Jobs'

export default function Experience() {
  return (
    <>
      <PageHero title="Experience" lead="Three years building enterprise systems for global teams, from internship to full-stack developer." />
      <section className="section pad" style={{ paddingTop: 0 }}>
        <Jobs level={2} />
      </section>
    </>
  )
}
