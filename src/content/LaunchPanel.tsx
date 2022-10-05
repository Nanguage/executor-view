import React from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import useStore from '../store';
import Alert from '../components/Alert';
import TaskCard from '../components/TaskCard'


interface ITask {
  name: string,
  description: string,
}

interface IProps {}


export default function LaunchPanel(props: IProps) {
  const serverAddr = useStore((state) => state.serverAddr)
  const [tasks, setTasks] = React.useState<Array<ITask>>([])
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")
  const alertHidenDuration = 21000
  const fetchInterval = 20000

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  React.useEffect(() => {
    fetchTasks(serverAddr)
    const myInterval = setInterval(() => fetchTasks(serverAddr), fetchInterval)

    return () => {
      clearInterval(myInterval)
    }
  }, [serverAddr])

  const fetchTasks = (serverAddr: string) => {
    const addr = serverAddr + "/tasks"
    axios.get(addr).then((resp) => {
      console.log(resp)
      setTasks(resp.data)
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
        <Button onClick={(e) => fetchTasks(serverAddr)}>Refresh</Button>
      </div>

      <Grid container rowSpacing={1} columnSpacing={1}>
        {
          tasks.map(
            (t) =>
            <Grid item xs={12}>
              <TaskCard name={t.name} description={t.description}/>
            </Grid>
          )
        }
      </Grid>

      <Snackbar open={alertOpen} autoHideDuration={alertHidenDuration} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          {errorText}
        </Alert>
      </Snackbar>
    </div>
  )
}