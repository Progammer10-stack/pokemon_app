import { Link } from 'react-router-dom'
import { TEAM_SIZE } from '../../constants.js'
import './TeamCard.css'

function TeamCard({ team, onRemove }) {
  const slots = []
  for (let i = 0; i < TEAM_SIZE; i++) {
    slots.push(i)
  }

  function removeThisTeam() {
    onRemove(team.id)
  }

  return (
    <article className="team-card">
      <div className="team-card-top">
        <h2>{team.name}</h2>
        <span>{team.members.length} / {TEAM_SIZE}</span>
      </div>
      <div className="dots">
        {slots.map(function (index) {
          let className = 'dot'
          if (index < team.members.length) {
            className = 'dot filled'
          }

          return <span key={index} className={className} />
        })}
      </div>
      <div className="team-actions">
        <Link to={'/team/' + team.id}>Open</Link>
        <button type="button" onClick={removeThisTeam}>Remove</button>
      </div>
    </article>
  )
}

export default TeamCard
