import React from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import useStore from '../../store';
import { getAxiosInstance } from '../../utils';


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

  const fetchServerSetting = (serverURL: string) => {
    const source = axios.CancelToken.source()
    const addr = serverURL + "/server_setting"
    const instance = getAxiosInstance(serverURL)
    instance.get(addr, {cancelToken: source.token}).then((resp) => {
      setAllowedRouters(resp.data.allowed_routers)
      setMonitorMode(resp.data.monitor_mode)
      setUserMode(resp.data.user_mode)
      setConnected(true)
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log("fetchServerSetting request cancelled")
      } else {
        console.log(error)
        enqueueSnackbar(error.message + `: fetch ${addr}`, {variant: "error"})
        setConnected(false)
      }
    })
    return source.cancel
  }

  React.useEffect(() => {
    const cancelRequest = fetchServerSetting(serverAddr)
    const myInterval = setInterval(
      () => fetchServerSetting(serverAddr), fetchInterval)

    return () => {
      clearInterval(myInterval)
      cancelRequest()
    }
  }, [serverAddr, nRefreshServer])

  return (
    <></>
  )

}
