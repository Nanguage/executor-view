import React from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

import useStore from '../store'
import Alert from '../components/Alert';
import JobsTable from '../components/JobsTable';
import { Job } from '../types';


interface IProps {}

export default function JobsPanel(props: IProps) {

  const serverAddr = useStore((state) => state.serverAddr)
  const [jobs, setJobs] = React.useState<Array<Job>>([])
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")
  const alertHidenDuration = 8000
  const fetchInterval = 5000

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

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

      <Snackbar open={alertOpen} autoHideDuration={alertHidenDuration} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          {errorText}
        </Alert>
      </Snackbar>
    </div>
  )
}
