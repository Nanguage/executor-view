import React, { useRef } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import useStore from '../../store';
import { getAxiosInstance } from '../../utils';


const FetchTasks = () => {
  const {
    serverAddr, refreshServer,
    nRefreshTasks, setTasks,
  } = useStore((state) => state)

  const { enqueueSnackbar } = useSnackbar()
  const fetchInterval = 90000

  const fetchTasks = (serverURL: string) => {
    const source = axios.CancelToken.source()
    const instance = getAxiosInstance(serverURL)
    const addr = "/task/list_all"
    instance.get(addr, {cancelToken: source.token}).then((resp) => {
      setTasks(resp.data)
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log("fetchTasks request cancelled")
      } else {
        console.log(error)
        enqueueSnackbar(error.message + `: fetch ${addr}`, {variant: "error"})
        refreshServer()
      }
    })
    return source.cancel
  }

  React.useEffect(() => {
    const cancelRequest = fetchTasks(serverAddr)
    const myInterval = setInterval(() => fetchTasks(serverAddr), fetchInterval)
    return () => {
      clearInterval(myInterval)
      cancelRequest()
    }
  }, [serverAddr, nRefreshTasks])

  return (
    <></>
  )
}


export default FetchTasks
