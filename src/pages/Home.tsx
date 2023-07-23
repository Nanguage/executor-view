import React from "react"
import Paper from '@mui/material/Paper';

import useStore from "../store"


const NotConnectedPanel = () => {
  return (
    <div style={{
      height: 100,
    }}>
      <div style={{
        textAlign: "center",
      }}>
        <p style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#d32f2f",
        }}>
          Not connected.
        </p>
        <p>
          Please check your server status, or
          try to change the server address (upper right ↗️).
        </p>
      </div>
    </div>
  )
}


const UserInfoPanel = () => {
  const { userInfo, refreshUserInfo, userMode } = useStore((state) => state)

  React.useEffect(() => {
    refreshUserInfo()
  }, [])

  if (userInfo !== null) {
    return (
      <div>
        <p style={{
          fontWeight: "bold",
        }}>Logined as: </p>
        <div style={{
          textIndent: "1em",
        }}>
          <p>user id: {userInfo.id}</p>
          <p>username: {userInfo.username}</p>
          <p>role: {userInfo.role}</p>
        </div>
      </div>
    )
  } else if (userMode !== "free") {
    return (
      <div style={{textAlign: "center"}}>
        <p style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#d32f2f",
        }}>
          Login is needed in {userMode} mode.
        </p>
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}


const ConnectInfoPanel = () => {
  const {
    serverAddr,
    userMode,
    allowedRouters,
  } = useStore((state) => state)

  return (
    <div>
      <p style={{fontWeight: "bold"}}>Server status:</p>
      <div style={{
        textIndent: "1em",
      }}>
        <p>Connected to: {serverAddr}</p>
        <p>user mode: {userMode}</p>
        <p>Allowed routers: {allowedRouters.join(" ")}</p>
      </div>
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