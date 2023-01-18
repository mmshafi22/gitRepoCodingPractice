import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {repoList: [], isActive: languageFiltersData[0].id, isLoading: true}

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    this.setState({isLoading: true})
    const {isActive} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${isActive}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const popularRepos = [...data.popular_repos]
      const updatedData = popularRepos.map(each => ({
        id: each.id,
        name: each.name,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({isLoading: false, repoList: updatedData})
    } else {
      this.setState({isLoading: false, repoList: []})
    }
  }

  filterRepo = id => {
    this.setState({isActive: id}, this.getRepos)
  }

  renderRepoCard = () => {
    const {repoList} = this.state
    if (repoList.length === 0) {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-img"
        />
      )
    }
    return (
      <ul className="repo-list-items">
        {repoList.map(each => (
          <RepositoryItem details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, isActive} = this.state
    return (
      <div className="git-bg-container">
        <div className="git-card-container">
          <h1 className="page-heading">Popular</h1>
          <ul className="filter-list-items">
            {languageFiltersData.map(each => (
              <LanguageFilterItem
                details={each}
                key={each.id}
                isActive={isActive}
                filterRepo={this.filterRepo}
              />
            ))}
          </ul>
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
            </div>
          ) : (
            this.renderRepoCard()
          )}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
