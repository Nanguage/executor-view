import React from "react"
import Paper from '@mui/material/Paper';

import useStore from "../store"


const NotConnectedPanel = () => {
  return (
    <div>
      Not connected.
    </div>
  )
}


const UserInfoPanel = () => {
  const { userInfo, refreshUserInfo } = useStore((state) => state)

  React.useEffect(() => {
    refreshUserInfo()
  }, [])

  if (userInfo !== null) {
    return (
      <div>
        <p>Logined as: </p>
        <p>user id: {userInfo.id}</p>
        <p>username: {userInfo.username}</p>
        <p>role: {userInfo.role}</p>
      </div>
    )
  } else {
    return (
      <div>Login is needed!</div>
    )
  }
}


const ConnectInfoPanel = () => {
  const {
    serverAddr,
    userMode,
    allowedRouters,
    userInfo,
  } = useStore((state) => state)

  return (
    <div>
      <p>Connected to: {serverAddr}</p>
      <p>user mode: {userMode}</p>
      <p>Allowed routers: {allowedRouters.join(" ")}</p>
      <UserInfoPanel />
    </div>
  )
}


const Home = () => {


  const {
    connected
  } = useStore((state) => state)

  return (
    <Paper
      style={{
        padding: 10,
        margin: "auto",
      }}
    >
      {
        connected ?
        <ConnectInfoPanel /> :
        <NotConnectedPanel />
      }
    </Paper>
  )
}


export default Home