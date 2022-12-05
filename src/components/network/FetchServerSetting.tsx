import React from 'react';
import axios from 'axios';

import useStore from '../../store';
import MessageBar from '../common/MessageBar'


export default function FetchServerSetting() {
  const {
    nRefreshServer, serverAddr,
    setAllowedRouters,
    setMonitorMode
  } = useStore((state) => state)
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")
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
    })
    .catch((error) => {
      console.log(error)
      setErrorText(error.message + `: fetch ${addr}`)
      setAlertOpen(true)
    })
  }

  return (
    <MessageBar
      alertOpen={alertOpen}
      setAlertOpen={setAlertOpen}
      alertHidenDuration={21000}
      text={errorText}
    />
  )

}
