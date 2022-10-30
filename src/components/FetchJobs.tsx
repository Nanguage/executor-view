import React from 'react';
import axios from 'axios';

import useStore from '../store'
import MessageBar from '../components/MessageBar'


export default function FetchJobs() {
  const { serverAddr, setJobs, monitorMode, refreshServer } = useStore((state) => state)
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")
  const fetchInterval = 5000
  React.useEffect(() => {
    fetchJobs()

    const myInterval = setInterval(() => fetchJobs(), fetchInterval)

    return () => {
      clearInterval(myInterval)
    }
  }, [serverAddr, monitorMode])

  const fetchJobs = React.useCallback(
    () => {
      let addr: string;
      if (monitorMode) {
        addr = serverAddr + "/monitor/list_all"
      } else {
        addr = serverAddr + "/job/list_all"
      }
      axios.get(addr).then((resp) => {
        setJobs(resp.data)
      })
      .catch((error) => {
        console.log(error)
        setErrorText(error.message + `: fetch ${addr}`)
        setAlertOpen(true)
        refreshServer()
      })
    }, [serverAddr, monitorMode]
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