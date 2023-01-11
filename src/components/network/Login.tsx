import React from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import { useSnackbar } from 'notistack';

import useStore from "../../store";


const Login = () => {
  const {
    serverAddr,
    currentUsername, currentPassword, nLogin,
    refreshJobs
  } = useStore((state) => state)

  const { enqueueSnackbar } = useSnackbar()

  const addr = serverAddr + "/user/token"
  React.useEffect(() => {
    if (currentUsername === null) {return}
    const form = new FormData()
    form.append("grant_type", "password")
    form.append("username", currentUsername as string)
    form.append("password", currentPassword as string)
    axios.post(addr, form).then((resp) => {
      const token = resp.data['access_token']
      const cookies = new Cookies()
      cookies.set("Authorization", `Bearer ${token}`, {path: "/"})
      enqueueSnackbar("Login success!", {variant: "success"})
      refreshJobs()
    })
    .catch((error) => {
      console.log(error)
      enqueueSnackbar("Login failed", {variant: "error"})
    })
  }, [nLogin])

  return (<></>)
}

export default Login;