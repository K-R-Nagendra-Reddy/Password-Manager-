import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordsContainer from '../PasswordsContainer'
import './index.css'

class UserForm extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    searchedPassword: '',
    checkboxClicked: false,
    listOfPasswords: [],
    count: 0,
  }

  element1 = document.getElementById('check')

  AddNewPassword = event => {
    event.preventDefault()
    const {website, username, password, searchedPassword} = this.state
    const newList = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      listOfPasswords: [...prevState.listOfPasswords, newList],
      website: '',
      username: '',
      password: '',
      count: prevState.count + 1,
    }))
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  handleChange = event => {
    if (event.target.checked) {
      this.setState(prevState => ({
        checkboxClicked: !prevState.checkboxClicked,
      }))
    } else {
      console.log('nag')
    }
  }

  onSearchPassword = event => {
    this.setState({searchedPassword: event.target.value})
  }

  onDeletePassword = id => {
    this.setState(prevState => ({
      listOfPasswords: prevState.listOfPasswords.filter(each => each.id !== id),
    }))
  }

  render() {
    const {
      website,
      username,
      password,
      searchedPassword,
      checkboxClicked,
      listOfPasswords,
      count,
    } = this.state

    console.log(checkboxClicked)
    const filteredList = listOfPasswords.filter(each =>
      each.website.toLowerCase().includes(searchedPassword.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          alt="password manager"
        />
        <div className="heading">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            className="logo"
            alt="app logo"
          />
        </div>
        <form onSubmit={this.AddNewPassword}>
          <div className="all-form-elements">
            <h1>Add New Password</h1>
            <div className="input-element">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="small-image"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-element">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="small-image"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={this.onChangeUserName}
              />
            </div>
            <div className="input-element">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="small-image"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </div>
        </form>

        <div className="passwords-container">
          <div className="header-content">
            <div className="passwords-count">
              <h1>Your Passwords</h1>
              <p>{count}</p>
            </div>
            <div className="input-search">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="small-image"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.onSearchPassword}
              />
            </div>
          </div>
          <hr className="seperator" />
          <div>
            <input
              type="checkbox"
              label="Show Passwords"
              onChange={this.handleChange}
            />
          </div>
          {filteredList.length === 0 && (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          )}
          <ul>
            {filteredList.map(each => (
              <PasswordsContainer
                key={each.id}
                details={each}
                isClickedCheckbox={checkboxClicked}
                onDeletePassword={this.onDeletePassword}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default UserForm
