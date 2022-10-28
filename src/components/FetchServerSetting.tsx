import React from 'react';
import axios from 'axios';

import useStore from '../store';
import MessageBar from '../components/MessageBar'


export default function FetchServerSetting() {
  const {
    nRefreshServer, serverAddr,
    setValidJobTypes, setAllowedRouters,
    setMonitorMode
  } = useStore((state) => state)
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")
  const fetchInterval = 90000

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
      setValidJobTypes(resp.data.valid_job_types)
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
