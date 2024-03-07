import {Component, React} from 'react'
import Loader from 'react-loader-spinner'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import Header from '../Header'
import FailureContainer from '../FailureContainer'
import ActiveTab from '../../context/ActiveTab'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Analysis extends Component {
  state = {apiStatus: '', analysisData: [], quarterCommitCount: []}

  componentDidMount() {
    this.renderAnalysisData()
  }

  onClickTryAgain = () => {
    this.renderAnalysisData()
  }

  goToHome = changeActiveTab => {
    const {history} = this.props
    history.replace('/')
    changeActiveTab('Home')
  }

  emptyUsernameAnalysis = () => (
    <ActiveTab.Consumer>
      {value => {
        const {changeActiveTab} = value
        return (
          <div className="emptyStringContainer">
            <img
              src="https://res.cloudinary.com/dowjvitxs/image/upload/v1709613446/Empty_Box_Illustration_1_wlrmwp.png"
              alt="empty analysis"
              className="noDataFoundImage"
            />
            <h1 className="noDataHeading">No Data Found</h1>
            <p className="gitPara">
              GitHub Username is empty, please provide a valid username for
              analysis
            </p>
            <button
              type="button"
              className="goToHomeButton"
              onClick={() => this.goToHome(changeActiveTab)}
            >
              Go to Home
            </button>
          </div>
        )
      }}
    </ActiveTab.Consumer>
  )

  renderAnalysisData = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const analysisUrl = `https://apis2.ccbp.in/gpv/profile-summary/kentcdodds?api_key=`
    const response = await fetch(analysisUrl)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        quarterCommitCount: data.quarterCommitCount,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderResponseAnalysis = () => {
    const {quarterCommitCount} = this.state
    return <h1 className="analysisHeading">Analysis</h1>
  }

  renderZeroAnalysis = () => (
    <div className="noAnalysisContainer">
      <img
        src="https://res.cloudinary.com/dowjvitxs/image/upload/v1709723769/Layer_3_1_fjwpct.png"
        alt="no analysis"
        className="noDataAnalysisImage"
      />
      <h1 className="noAnalysisHeading">No Analysis Found</h1>
    </div>
  )

  renderSuccessAnalysis = () => {
    const {analysisData} = this.state
    return (
      <div>
        {analysisData === 0
          ? this.renderZeroAnalysis()
          : this.renderResponseAnalysis()}
      </div>
    )
  }

  renderFailureAnalysis = () => (
    <FailureContainer onClickTryAgain={this.onClickTryAgain} />
  )

  renderLoadingAnalysis = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderAllAnalysisViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessAnalysis()
      case apiConstants.failure:
        return this.renderFailureAnalysis()
      case apiConstants.loading:
        return this.renderLoadingAnalysis()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <ActiveTab.Consumer>
          {value => {
            const {username} = value
            return (
              <div className="repositoryContainer">
                <div className="insideAnalysisContainer">
                  {username !== ''
                    ? this.renderAllAnalysisViews()
                    : this.emptyUsernameAnalysis()}
                </div>
              </div>
            )
          }}
        </ActiveTab.Consumer>
      </>
    )
  }
}

export default Analysis
