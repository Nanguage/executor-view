import React from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';

import useStore from "../../store";
import MessageBar from '../common/MessageBar';
import { MessageBarTypes } from '../../types'


const Login = () => {
  const {
    serverAddr, setToken,
    currentUsername, currentPassword, nLogin,
  } = useStore((state) => state)

  const [msgOpen, setMsgOpen] = React.useState<boolean>(false)
  const [msg, setMsg] = React.useState<string>("")
  const [msgType, setMsgType] = React.useState<MessageBarTypes>("info")

  const addr = serverAddr + "/user/token"
  React.useEffect(() => {
    const form = new FormData()
    form.append("grant_type", "password")
    form.append("username", currentUsername as string)
    form.append("password", currentPassword as string)
    axios.post(addr, form).then((resp) => {
      const token = resp.data['access_token']
      const cookies = new Cookies()
      cookies.set("Authorization", `Bearer ${token}`, {path: "/"})
      setToken(token)
      setMsgType("info")
      setMsg("Login success!")
      setMsgOpen(true)
    })
    .catch((error) => {
      console.log(error)
      setMsgType("error")
      setMsg("Login failed!")
      setMsgOpen(true)
    })
  }, [nLogin])

  return (<>
    <MessageBar
      alertOpen={msgOpen}
      setAlertOpen={setMsgOpen}
      alertHidenDuration={8000}
      text={msg}
      type={msgType}
    /> 
  </>)
}

export default Login;