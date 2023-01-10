import React from "react"

import useStore from '../../store'
import MessageBar from '../common/MessageBar'
import { getAxiosInstance } from "../../utils"


const FetchUserInfo = () => {

  const {
    serverAddr, setUserInfo,
    nRefreshUserInfo, setLoginDialogOpen,
    userMode,
  } = useStore((state) => state)
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")

  const fetchInterval = 5000

  React.useEffect(() => {
    fetchUserInfo()

    const interval = setInterval(() => fetchUserInfo(), fetchInterval)
    
    return () => {
      clearInterval(interval)
    }
  }, [serverAddr, nRefreshUserInfo])


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
        if (error.response.status === 403) {
          setLoginDialogOpen(true)
        }
        setErrorText(error.message + `: fetch ${addr}`)
        setAlertOpen(true)
      })
    }, [serverAddr]
  )

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
