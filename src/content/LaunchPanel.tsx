import React from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import useStore from '../store';
import Alert from '../components/Alert';
import TaskCard from '../components/TaskCard'
import { ITask } from '../types'


const TasksFetch = (
      props: {
        nRefresh: number,
        setTasks: (tasks: ITask[]) => void
      }
    ) => {
  const { setTasks, nRefresh } = props
  const serverAddr = useStore((state) => state.serverAddr)
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")
  const alertHidenDuration = 21000
  const fetchInterval = 20000

  React.useEffect(() => {
    fetchTasks(serverAddr)
    const myInterval = setInterval(() => fetchTasks(serverAddr), fetchInterval)

    return () => {
      clearInterval(myInterval)
    }
  }, [serverAddr, nRefresh])

  const fetchTasks = (serverAddr: string) => {
    const addr = serverAddr + "/tasks"
    axios.get(addr).then((resp) => {
      setTasks(resp.data)
    })
    .catch((error) => {
      console.log(error)
      setErrorText(error.message + `: fetch ${addr}`)
      setAlertOpen(true)
    })
  }

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <>
      <Snackbar open={alertOpen} autoHideDuration={alertHidenDuration} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          {errorText}
        </Alert>
      </Snackbar>
    </>
  )
}


const ValidJobTypesFetch = (
      props: {
        nRefresh: number,
        setJobTypes: (jtypes: string[]) => void
      }
    ) => {
  const { setJobTypes, nRefresh } = props
  const serverAddr = useStore((state) => state.serverAddr)
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")
  const alertHidenDuration = 21000
  const fetchInterval = 20000

  React.useEffect(() => {
    fetchValidJobTypes(serverAddr)
    const myInterval = setInterval(() => fetchValidJobTypes(serverAddr), fetchInterval)

    return () => {
      clearInterval(myInterval)
    }
  }, [serverAddr, nRefresh])

  const fetchValidJobTypes = (serverAddr: string) => {
    const addr = serverAddr + "/valid_job_types"
    axios.get(addr).then((resp) => {
      setJobTypes(resp.data)
    })
    .catch((error) => {
      console.log(error)
      setErrorText(error.message + `: fetch ${addr}`)
      setAlertOpen(true)
    })
  }

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <Snackbar open={alertOpen} autoHideDuration={alertHidenDuration} onClose={handleAlertClose}>
      <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
        {errorText}
      </Alert>
    </Snackbar>
  )

}


export default function LaunchPanel(props: {}) {
  const [tasks, setTasks] = React.useState<Array<ITask>>([])
  const [validJobTypes, setValidJobTypes] = React.useState<string[]>([])
  const [nRefresh, setNRefresh] = React.useState<number>(0)

  return (
    <div>
      <div>
        <Button onClick={(e) => {setNRefresh(nRefresh+1)}}>Refresh</Button>
      </div>

      <TasksFetch nRefresh={nRefresh} setTasks={(tasks) => {setTasks(tasks)}}/>
      <ValidJobTypesFetch nRefresh={nRefresh} setJobTypes={(jtypes) => {setValidJobTypes(jtypes)}} />

      <Grid container rowSpacing={1} columnSpacing={1}>
        {
          tasks.map(
            (t) =>
            <Grid item xs={12}>
              <TaskCard name={t.name} description={t.description} task={t}/>
            </Grid>
          )
        }
      </Grid>

    </div>
  )
}