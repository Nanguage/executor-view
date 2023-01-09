import React from 'react';

import useStore from '../../store';
import MessageBar from '../../components/common/MessageBar';
import { getAxiosInstance } from '../../utils';


const FetchTasks = () => {
  const {
    serverAddr, refreshServer, nRefreshTasks, setTasks,
  } = useStore((state) => state)
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")
  const fetchInterval = 90000

  React.useEffect(() => {
    fetchTasks()
    const myInterval = setInterval(() => fetchTasks(), fetchInterval)

    return () => {
      clearInterval(myInterval)
    }
  }, [serverAddr, nRefreshTasks])

  const fetchTasks = React.useCallback(() => {
    const addr = "/task/list_all"
    const instance = getAxiosInstance(serverAddr)
    instance.get(addr).then((resp) => {
      setTasks(resp.data)
    })
    .catch((error) => {
      console.log(error)
      setErrorText(error.message + `: fetch ${addr}`)
      setAlertOpen(true)
      refreshServer()
    })
  }, [serverAddr])

  return (
    <MessageBar
      alertOpen={alertOpen}
      setAlertOpen={setAlertOpen}
      alertHidenDuration={21000}
      text={errorText}
    />
  )
}


export default FetchTasks
