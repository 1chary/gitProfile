import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Counter from './components/Counter'
import ActiveTab from './context/ActiveTab'
import Home from './components/Home'
import Repository from './components/Repository'
import './App.css'

class App extends Component {
  state = {activeTab: 'Home', username: ''}

  changeActiveTab = tab => {
    this.setState({activeTab: tab})
  }

  changeUserName = name => {
    this.setState({username: name})
  }

  render() {
    const {activeTab, username} = this.state
    return (
      <ActiveTab.Provider
        value={{
          activeTab,
          username,
          changeUserName: this.changeUserName,
          changeActiveTab: this.changeActiveTab,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/repositories" component={Repository} />
        </Switch>
      </ActiveTab.Provider>
    )
  }
}

export default App
