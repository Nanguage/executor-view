import React from 'react';
import axios from 'axios';

import useStore from '../../store';
import { Task } from '../../types';
import MessageBar from '../../components/common/MessageBar';


const FetchTasks = (
      props: {
        nRefresh: number,
        setTasks: (tasks: Task[]) => void
      }
    ) => {
  const { setTasks, nRefresh } = props
  const { serverAddr, refreshServer } = useStore((state) => state)
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")
  const fetchInterval = 90000

  React.useEffect(() => {
    fetchTasks(serverAddr)
    const myInterval = setInterval(() => fetchTasks(serverAddr), fetchInterval)

    return () => {
      clearInterval(myInterval)
    }
  }, [serverAddr, nRefresh])

  const fetchTasks = (serverAddr: string) => {
    const addr = serverAddr + "/task/list_all"
    axios.get(addr).then((resp) => {
      setTasks(resp.data)
    })
    .catch((error) => {
      console.log(error)
      setErrorText(error.message + `: fetch ${addr}`)
      setAlertOpen(true)
      refreshServer()
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


export default FetchTasks
