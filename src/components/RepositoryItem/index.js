import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = details

  return (
    <li className="list-item">
      <img src={avatarUrl} alt={name} className="repo-img" />
      <h1 className="repo-heading">{name}</h1>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount}</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount}</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
