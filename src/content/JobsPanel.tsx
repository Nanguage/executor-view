import React from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';

import useStore from '../store'
import JobsTable from '../components/JobsTable';
import { Job } from '../types';
import MessageBar from '../components/MessageBar'


export default function JobsPanel(props: {}) {

  const serverAddr = useStore((state) => state.serverAddr)
  const [jobs, setJobs] = React.useState<Array<Job>>([])
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
    <div>
      <div>
        <Button onClick={(e) => fetchJobs(serverAddr)}>Refresh</Button>
      </div>

      <JobsTable jobs={jobs}/>

      <MessageBar
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        alertHidenDuration={8000}
        text={errorText}
      />
    </div>
  )
}
