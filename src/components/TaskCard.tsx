import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import TaskLaunchDialog from '../components/LaunchDialog';
import { ITask } from '../types';


interface IProps {
  name: string;
  description: string;
  task: ITask;
}


export default function TaskCard(props: IProps) {
  const [launchDialogOpen, setLaunchDialogOpen] = React.useState<boolean>(false)

  return (
    <Card sx={{ minWidth: 275 }}>

      <CardContent>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>

        <Typography variant="body2">
          {props.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => {setLaunchDialogOpen(true)}}>
          Launch
        </Button>
      </CardActions>

      <TaskLaunchDialog
        task={props.task}
        open={launchDialogOpen}
        onClose={() => {setLaunchDialogOpen(false)}}/>
    </Card>
  );
}
