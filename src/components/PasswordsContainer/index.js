import './index.css'

const PasswordsContainer = props => {
  const {details, isClickedCheckbox, onDeletePassword} = props
  const {id, website, username, password} = details
  const firstLetter = website.slice(0, 1).toUpperCase()

  console.log(isClickedCheckbox)

  const deleteThisPassword = () => {
    onDeletePassword(id)
  }

  return (
    <li className="list-container">
      <p className="first-letter">{firstLetter}</p>
      <div className="website-username">
        <p>{website}</p>
        <p>{username}</p>

        {isClickedCheckbox ? (
          `${password}`
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
      </div>
      <button type="button" onClick={deleteThisPassword}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete" data-testid="delete"
        />
      </button>
    </li>
  )
}
export default PasswordsContainer
