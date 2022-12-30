import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import TaskCard from '../components/launch/TaskCard';
import FetchTasks from '../components/network/FetchTasks';
import { Task } from '../types';


export default function LaunchPanel(props: {}) {
  const [tasks, setTasks] = React.useState<Array<Task>>([])
  const [nRefresh, setNRefresh] = React.useState<number>(0)

  return (
    <div>
      <div>
        <Button onClick={(e) => {setNRefresh(nRefresh+1)}}>Refresh</Button>
      </div>

      <FetchTasks nRefresh={nRefresh} setTasks={(tasks) => {setTasks(tasks)}}/>

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
