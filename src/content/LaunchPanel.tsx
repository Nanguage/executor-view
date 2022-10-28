import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import useStore from '../store';
import TaskCard from '../components/TaskCard'
import { Task } from '../types'
import MessageBar from '../components/MessageBar'


const TasksFetch = (
      props: {
        nRefresh: number,
        setTasks: (tasks: Task[]) => void
      }
    ) => {
  const { setTasks, nRefresh } = props
  const serverAddr = useStore((state) => state.serverAddr)
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




export default function LaunchPanel(props: {}) {
  const [tasks, setTasks] = React.useState<Array<Task>>([])
  const [nRefresh, setNRefresh] = React.useState<number>(0)

  return (
    <div>
      <div>
        <Button onClick={(e) => {setNRefresh(nRefresh+1)}}>Refresh</Button>
      </div>

      <TasksFetch nRefresh={nRefresh} setTasks={(tasks) => {setTasks(tasks)}}/>

      <Grid container rowGap={1} columnGap={1}>
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