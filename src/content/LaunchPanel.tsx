import React from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import useStore from '../store';
import Alert from '../components/Alert';
import TaskCard from '../components/TaskCard'
import { ITask } from '../types'
import { getAlertCloseHandler } from '../utils';


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
    })
  }

  const handleAlertClose = getAlertCloseHandler(setAlertOpen)

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
      }
    ) => {
  const { nRefresh } = props
  const setValidJobTypes = useStore((state) => state.setValidJobTypes)
  const serverAddr = useStore((state) => state.serverAddr)
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")
  const alertHidenDuration = 21000
  const fetchInterval = 90000

  React.useEffect(() => {
    fetchValidJobTypes(serverAddr)
    const myInterval = setInterval(() => fetchValidJobTypes(serverAddr), fetchInterval)

    return () => {
      clearInterval(myInterval)
    }
  }, [serverAddr, nRefresh])

  const fetchValidJobTypes = (serverAddr: string) => {
    const addr = serverAddr + "/job/valid_types"
    axios.get(addr).then((resp) => {
      setValidJobTypes(resp.data)
    })
    .catch((error) => {
      console.log(error)
      setErrorText(error.message + `: fetch ${addr}`)
      setAlertOpen(true)
    })
  }

  const handleAlertClose = getAlertCloseHandler(setAlertOpen)

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
  const [nRefresh, setNRefresh] = React.useState<number>(0)

  return (
    <div>
      <div>
        <Button onClick={(e) => {setNRefresh(nRefresh+1)}}>Refresh</Button>
      </div>

      <TasksFetch nRefresh={nRefresh} setTasks={(tasks) => {setTasks(tasks)}}/>
      <ValidJobTypesFetch nRefresh={nRefresh}/>

      <Grid container rowSpacing={1} columnSpacing={1}>
        {
          tasks.map(
            (t) =>
            <Grid item xs={12} key={t.name}>
              <TaskCard name={t.name} description={t.description} task={t}/>
            </Grid>
          )
        }
      </Grid>

    </div>
  )
}