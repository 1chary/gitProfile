import React from 'react'

const ActiveTab = React.createContext({
  activeTab: 'Home',
  username: '',
  changeUserName: () => {},
  changeActiveTab: () => {},
})

export default ActiveTab
