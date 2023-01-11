import React from "react"

import useStore from '../../store'
import MessageBar from '../common/MessageBar'
import { getAxiosInstance } from "../../utils"


const FetchUserInfo = () => {

  const {
    serverAddr, setUserInfo, refreshUserInfo,
    nRefreshUserInfo, setLoginDialogOpen, loginDialogOpen,
    userMode,
  } = useStore((state) => state)
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")

  const fetchUserInfo = React.useCallback(
    () => {
      const addr = "/user/info"
      const instance = getAxiosInstance(serverAddr)
      instance.get(addr).then((resp) => {
        if (userMode != "free") {
          setUserInfo(resp.data)
        }
      })
      .catch((error: any) => {
        console.log(error)
        if ([403, 401].includes(error.response.status)) {
          setLoginDialogOpen(true)
        }
        if (loginDialogOpen === false) {
          setErrorText(error.message + `: fetch ${addr}`)
          setAlertOpen(true)
        }
        setUserInfo(null)
      })
    }, [serverAddr, userMode, loginDialogOpen]
  )

  React.useEffect(() => {
    const fetchInterval = 5000

    const interval = setInterval(() => refreshUserInfo(), fetchInterval)

    return () => {
      clearInterval(interval)
    }
  }, [serverAddr])

  React.useEffect(() => {
    fetchUserInfo()
  }, [nRefreshUserInfo])

  return (
    <MessageBar
      alertOpen={alertOpen}
      setAlertOpen={setAlertOpen}
      alertHidenDuration={8000}
      text={errorText}
      />
  )
}


export default FetchUserInfo
