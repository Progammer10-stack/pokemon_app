import { Link, useParams } from 'react-router-dom'

function Detail() {
  const { id } = useParams()

  return (
    <section>
      <h1>Detail</h1>
      <p className="placeholder">Details van {id} komen hier</p>
      <nav className="page-arrows">
        <Link to="/list">← Lijst</Link>
      </nav>
    </section>
  )
}

export default Detail
