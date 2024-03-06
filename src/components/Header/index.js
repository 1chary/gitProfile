import {Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'
import ActiveTab from '../../context/ActiveTab'

const Header = () => (
  <ActiveTab.Consumer>
    {value => {
      const {activeTab, changeActiveTab} = value

      const changeToHomeTab = () => {
        changeActiveTab('Home')
      }

      const changeToRepositoryTab = () => {
        changeActiveTab('Repositories')
      }

      const changeToAnalysisTab = () => {
        changeActiveTab('Analysis')
      }

      return (
        <div className="headerContainer">
          <Link to="/" className="navStyle">
            <h1 className="githubHeading">Github Profile Visualizer</h1>
          </Link>
          <GiHamburgerMenu size={30} color="white" className="hamBurger" />
          <ul className="unOrderList">
            <Link to="/" className="navStyle">
              <li
                className={`individualListItem ${
                  activeTab === 'Home' ? 'blueColor' : 'whiteColor'
                }`}
                onClick={changeToHomeTab}
              >
                Home
              </li>
            </Link>
            <Link to="/repositories" className="navStyle">
              <li
                className={`individualListItem ${
                  activeTab === 'Repositories' ? 'blueColor' : 'whiteColor'
                }`}
                onClick={changeToRepositoryTab}
              >
                Repositories
              </li>
            </Link>
            <Link to="/Analysis" className="navStyle">
              <li
                className={`individualListItem ${
                  activeTab === 'Analysis' ? 'blueColor' : 'whiteColor'
                }`}
                onClick={changeToAnalysisTab}
              >
                Analysis
              </li>
            </Link>
          </ul>
        </div>
      )
    }}
  </ActiveTab.Consumer>
)

export default Header
