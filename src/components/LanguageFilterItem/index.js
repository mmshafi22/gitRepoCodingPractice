import './index.css'

const LanguageFilterItem = props => {
  const {details, isActive, filterRepo} = props
  const {id, language} = details
  const btnStyle = isActive === id ? 'btn-active' : 'btn-un-active'

  const onClickRepo = () => {
    filterRepo(id)
  }

  return (
    <li>
      <button type="button" className={btnStyle} onClick={onClickRepo}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
