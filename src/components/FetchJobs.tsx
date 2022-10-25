import React from 'react';
import axios from 'axios';

import useStore from '../store'
import MessageBar from '../components/MessageBar'


export default function FetchJobs(props: {}) {
  const serverAddr = useStore((state) => state.serverAddr)
  const { setJobs } = useStore((state) => state)
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")
  const fetchInterval = 5000
  React.useEffect(() => {
    fetchJobs(serverAddr)

    const myInterval = setInterval(() => fetchJobs(serverAddr), fetchInterval)

    return () => {
      clearInterval(myInterval)
    }
  }, [serverAddr])


  const fetchJobs = (serverAddr: string) => {
    const addr = serverAddr + "/job/list_all"
    axios.get(addr).then((resp) => {
      setJobs(resp.data)
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
      alertHidenDuration={8000}
      text={errorText}
      />
  )
}