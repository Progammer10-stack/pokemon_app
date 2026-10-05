import { Link } from 'react-router-dom'
import { TEAM_SIZE } from '../../constants.js'
import './TeamCard.css'

function TeamCard({ team, onRemove }) {
  const slots = []
  for (let i = 0; i < TEAM_SIZE; i++) {
    slots.push(i)
  }

  return (
    <article className="team-card">
      <div className="team-card-top">
        <h2>{team.name}</h2>
        <span>{team.members.length} / {TEAM_SIZE}</span>
      </div>
      <div className="dots">
        {slots.map((index) => (
          <span
            key={index}
            className={index < team.members.length ? 'dot filled' : 'dot'}
          />
        ))}
      </div>
      <div className="team-actions">
        <Link to={'/team/' + team.id}>Open</Link>
        <button type="button" onClick={() => onRemove(team.id)}>Remove</button>
      </div>
    </article>
  )
}

export default TeamCard
