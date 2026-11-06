import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="notfound pad">
      <h1 className="page-title">Not found</h1>
      <p className="page-lead" style={{ marginLeft: 0 }}>
        This page does not exist. It may have moved, or the link has a typo.
      </p>
      <p>
        <Link to="/" className="pill-btn pill-btn--solid">
          Back to the homepage
        </Link>
      </p>
    </section>
  )
}
