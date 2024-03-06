import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {RiBuildingLine} from 'react-icons/ri'
import {IoLocationOutline} from 'react-icons/io5'
import {IoMdLink} from 'react-icons/io'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'
import ActiveTab from '../../context/ActiveTab'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    array: [],
    apiStatus: '',
    isStringEmpty: false,
    toDisplayProfilePage: false,
  }

  updateCase = data => ({
    avatarUrl: data.avatar_url,
    bio: data.bio,
    blog: data.blog,
    company: data.company,
    createdAt: data.created_at,
    email: data.email,
    eventsUrl: data.events_url,
    followers: data.followers,
    followersUrl: data.followers_url,
    following: data.following,
    followingUrl: data.following_url,
    gistsUrl: data.gists_url,
    gravatarId: data.gravatar_id,
    hireable: data.hireable,
    htmlUrl: data.html_url,
    id: data.id,
    location: data.location,
    login: data.login,
    name: data.name,
    nodeId: data.node_id,
    organizationsUrl: data.organizations_url,
    publicGists: data.public_gists,
    publicRepos: data.public_repos,
    receivedEventsUrl: data.received_events_url,
    reposUrl: data.repos_url,
    siteAdmin: data.site_admin,
    starredUrl: data.starred_url,
    subscriptionsUrl: data.subscriptions_url,
    twitterUsername: data.twitter_username,
    type: data.type,
    updatedAt: data.updated_at,
    url: data.url,
  })

  getGitHubData = async name => {
    if (name !== '') {
      this.setState({toDisplayProfilePage: true})
      const apiUrl = `https://apis2.ccbp.in/gpv/profile-details/${name}?api_key=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`
      const response = await fetch(apiUrl)
      if (response.ok === true) {
        const data = await response.json()

        const formattedData = this.updateCase(data)
        this.setState({
          array: formattedData,
          apiStatus: apiConstants.success,
          isStringEmpty: false,
        })
      } else {
        this.setState({apiStatus: apiConstants.failure})
      }
    }
    return this.setState({
      isStringEmpty: true,
    })
  }

  renderSuccess = () => {
    const {array} = this.state
    const {
      avatarUrl,
      name,
      bio,
      followers,
      following,
      publicRepos,
      company,
      location,
      url,
    } = array
    return (
      <div className="userDetailsContainer">
        <img src={avatarUrl} alt={name} className="avatarImage" />
        <h1 className="userName">{name}</h1>
        <p className="bioPara">{bio}</p>
        <div className="followersAndReposContainer">
          <div className="followersContainer">
            <h1 className="followers">{followers}</h1>
            <p className="followersPara">FOLLOWERS</p>
          </div>
          <div className="followersContainer">
            <h1 className="followers">{following}</h1>
            <p className="followersPara">FOLLOWING</p>
          </div>
          <div className="followersContainer">
            <h1 className="followers">{publicRepos}</h1>
            <p className="followersPara">PUBLIC REPOS</p>
          </div>
        </div>
        <div className="companyAndLocationContainer">
          <div className="companyAndLocation">
            <div className="companyContainer">
              <h1 className="followers">COMPANY</h1>
              <div className="iconContainer">
                <RiBuildingLine size={35} color="white" />
                <p className="companyName">{company}</p>
              </div>
            </div>
            <div className="companyContainer">
              <h1 className="followers">LOCATION</h1>
              <div className="iconContainer">
                <IoLocationOutline size={35} color="white" />
                <p className="companyName">{location}</p>
              </div>
            </div>
          </div>
          <div className="companyUrlContainer">
            <h1 className="followers">COMPANY URL</h1>
            <div className="iconContainer">
              <IoMdLink size={30} color="white" />
              <p className="companyUrl">{url}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  getAllTypeOfViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccess()
      case apiConstants.loader:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderInitial = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dowjvitxs/image/upload/v1709456020/Group_2_isxax0.png"
        alt="github profile visualizer home page"
      />
    </div>
  )

  retryAgain = () => {
    this.renderInitial()
    this.setState({isStringEmpty: false})
  }

  renderUsernameFailure = () => (
    <div className="stringEmptyContainer">
      <img
        src="https://res.cloudinary.com/dowjvitxs/image/upload/v1709307868/Group_7522_e6aek6.png"
        alt="github profile visualizer home page"
        className="emptyStringImage"
      />
      <p>Something went wrong. Please try again</p>
      <button className="retryButton" type="button" onClick={this.retryAgain}>
        Try again
      </button>
    </div>
  )

  render() {
    return (
      <>
        <div className="displayHeader">
          <Header />
        </div>
        <ActiveTab.Consumer>
          {value => {
            const {username, changeUserName} = value
            const {isStringEmpty, toDisplayProfilePage} = this.state

            const borderColor = isStringEmpty ? 'redBorder' : ''

            const renderImage = isStringEmpty
              ? this.renderUsernameFailure()
              : this.renderInitial()

            const onSearchInput = event => {
              changeUserName(event.target.value)
            }

            return (
              <div className="container">
                <div className="searchContainer">
                  <input
                    type="search"
                    value={username}
                    className={`searchBox ${borderColor}`}
                    onChange={onSearchInput}
                    placeholder="Enter github username"
                  />
                  <div className="searchIconContainer">
                    <button
                      type="button"
                      data-testid="searchButton"
                      className="searchIcon"
                      onClick={() => this.getGitHubData(username)}
                    >
                      <HiOutlineSearch
                        size={30}
                        color="white"
                        aria-label="25"
                      />
                    </button>
                  </div>
                </div>
                {isStringEmpty && (
                  <p className="errorUserName">
                    Enter the valid github username
                  </p>
                )}
                {toDisplayProfilePage ? (
                  ''
                ) : (
                  <h1 className="mainHeading">Github Profile Visualizer</h1>
                )}
                {toDisplayProfilePage ? this.getAllTypeOfViews() : renderImage}
              </div>
            )
          }}
        </ActiveTab.Consumer>
      </>
    )
  }
}

export default Home
