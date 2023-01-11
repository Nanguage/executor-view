import React from "react"
import { useSnackbar } from 'notistack';

import useStore from '../../store'
import { getAxiosInstance } from "../../utils"


const FetchUserInfo = () => {

  const {
    serverAddr, setUserInfo, refreshUserInfo,
    nRefreshUserInfo, setLoginDialogOpen, loginDialogOpen,
    userMode,
  } = useStore((state) => state)

  const { enqueueSnackbar } = useSnackbar()

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
          enqueueSnackbar(error.message + `: fetch ${addr}`, {variant: "error"})
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
    <></>
  )
}


export default FetchUserInfo
