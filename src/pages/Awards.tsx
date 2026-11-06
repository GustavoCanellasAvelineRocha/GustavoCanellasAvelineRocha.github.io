import PageHero from '../components/PageHero'
import AwardList from '../components/AwardList'
import { Photo } from '../components/motion'

const gallery = [
  {
    src: '/images/award-stage.jpg',
    alt: 'Gustavo receiving an award on stage at the PUCRS graduation, under blue stage lights',
    width: 2048,
    height: 1365,
    caption: 'Receiving an award on stage, PUCRS graduation, 2025',
    position: '50% 35%',
  },
  {
    src: '/images/award-diploma.jpg',
    alt: 'Gustavo holding his trophy next to the professor holding the Academic Excellence diploma',
    width: 800,
    height: 533,
    caption: 'Academic Excellence Award, highest GPA of the class',
    position: '50% 30%',
  },
  {
    src: '/images/speech-podium.jpg',
    alt: 'Gustavo giving a speech at the PUCRS podium during the graduation ceremony',
    width: 800,
    height: 533,
    caption: 'Speech at the graduation ceremony',
    position: '50% 30%',
  },
]

export default function Awards() {
  return (
    <>
      <PageHero
        title="Awards"
        lead="Graduated from PUCRS with four awards, including the Best Thesis and the highest GPA of the Information Systems class."
      />
      <section className="pad" aria-label="Graduation photos">
        <div className="gallery">
          {gallery.map((g, i) => (
            <figure className="gallery__item" key={g.src}>
              <Photo src={g.src} alt={g.alt} width={g.width} height={g.height} position={g.position} delay={i * 0.1} />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="section pad" style={{ paddingTop: 0 }} aria-label="All awards">
        <AwardList level={2} />
      </section>
    </>
  )
}
