import TeamCard from '../../components/team/TeamCard.jsx'
import './Teams.css'

function Teams({ teams, onAdd, onRemove }) {
  return (
    <section className="teams">
      <div className="title-row">
        <h1>Teams</h1>
        <button className="dark-button" type="button" onClick={onAdd}>New team</button>
      </div>
      <p className="subtitle">Create and manage teams</p>

      <div className="team-grid">
        {teams.map(function (team) {
          return <TeamCard key={team.id} team={team} onRemove={onRemove} />
        })}
      </div>
    </section>
  )
}

export default Teams
