import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import TaskCard from '../components/launch/TaskCard';
import useStore from '../store';


export default function LaunchPanel(props: {}) {

  const { refreshTasks, tasks, serverAddr } = useStore((state) => state)

  React.useEffect(() => {
    const fetchInterval = 90000

    const myInterval = setInterval(() => refreshTasks(), fetchInterval)

    return () => {
      clearInterval(myInterval)
    }
  }, [serverAddr])

  return (
    <div>
      <div>
        <Button onClick={(e) => {refreshTasks}}>Refresh</Button>
      </div>


      <Grid container rowGap={1} columnGap={1}>
        {
          tasks.map(
            (t) =>
            <Grid item xs={5} key={t.name}>
              <TaskCard name={t.name} description={t.description} task={t}/>
            </Grid>
          )
        }
      </Grid>

    </div>
  )
}
