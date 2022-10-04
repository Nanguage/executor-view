import React from 'react';
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import useStore from '../store'


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



interface IProps {

}

interface IJob {
  id: string,
  status: string,
  name: string,
  job_type: string,
  check_time: string,
}

export default function JobsPanel(props: IProps) {

  const serverAddr = useStore((state) => state.serverAddr)
  const [jobs, setJobs] = React.useState<Array<IJob>>([])
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
    const addr = serverAddr + "/jobs"
    axios.get(addr).then((resp) => {
      console.log(resp)
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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Job type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow
                key={job.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {job.id}
                </TableCell>
                <TableCell align="right">{job.name}</TableCell>
                <TableCell align="right">{job.status}</TableCell>
                <TableCell align="right">{job.job_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={alertOpen} autoHideDuration={alertHidenDuration} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          {errorText}
        </Alert>
      </Snackbar>
    </div>
  )
}