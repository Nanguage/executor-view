import React from "react"
import axios from 'axios'
import { useSnackbar } from 'notistack';

import useStore from '../../store'
import { getAxiosInstance } from "../../utils"


const FetchUserInfo = () => {

  const {
    serverAddr, setUserInfo, refreshUserInfo,
    nRefreshUserInfo, setLoginDialogOpen, loginDialogOpen,
    userMode, connected,
  } = useStore((state) => state)

  const { enqueueSnackbar } = useSnackbar()
  const fetchInterval = 5000

  const fetchUserInfo = React.useCallback(
    () => {
      const source = axios.CancelToken.source()
      const addr = "/user/info"
      const instance = getAxiosInstance(serverAddr)
      instance.get(addr, {cancelToken: source.token}).then((resp) => {
        if (userMode != "free") {
          setUserInfo(resp.data)
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("fetchUserInfo request cancelled")
        } else {
          console.log(error)
          if ([403, 401].includes(error.response.status)) {
            setLoginDialogOpen(true)
          }
          if (loginDialogOpen === false) {
            enqueueSnackbar(error.message + `: fetch ${addr}`, {variant: "error"})
          }
          setUserInfo(null)
        }
      })
      return source.cancel
    }, [serverAddr, userMode, loginDialogOpen]
  )

  React.useEffect(() => {
    const cancelRequest = fetchUserInfo()

    const interval = setInterval(
      () => {
        if (connected) {
          refreshUserInfo()
        }
      }, fetchInterval)

    return () => {
      clearInterval(interval)
      cancelRequest()
    }
  }, [serverAddr, connected, nRefreshUserInfo])

  return (
    <></>
  )
}


export default FetchUserInfo
