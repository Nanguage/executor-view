import React from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import useStore from '../../store';


export default function FetchServerSetting() {
  const {
    nRefreshServer, serverAddr,
    setAllowedRouters,
    setMonitorMode,
    setUserMode,
    setConnected,
  } = useStore((state) => state)

  const { enqueueSnackbar } = useSnackbar()

  const fetchInterval = 30000

  React.useEffect(() => {
    fetchServerSetting(serverAddr)
    const myInterval = setInterval(() => fetchServerSetting(serverAddr), fetchInterval)

    return () => {
      clearInterval(myInterval)
    }
  }, [serverAddr, nRefreshServer])

  const fetchServerSetting = (serverAddr: string) => {
    const addr = serverAddr + "/server_setting"
    axios.get(addr).then((resp) => {
      setAllowedRouters(resp.data.allowed_routers)
      setMonitorMode(resp.data.monitor_mode)
      setUserMode(resp.data.user_mode)
      setConnected(true)
    })
    .catch((error) => {
      console.log(error)
      enqueueSnackbar(error.message + `: fetch ${addr}`, {variant: "error"})
      setConnected(false)
    })
  }

  return (
    <></>
  )

}
