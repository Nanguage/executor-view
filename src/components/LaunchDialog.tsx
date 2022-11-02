import React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';

import { Task, Job } from '../types';
import useStore from '../store';
import { ArgWidgets, getInitValues, JobRunSettings } from './ArgWidgets';


interface IProps {
  open: boolean;
  onClose: () => void;
  task: Task;
}


export default function TaskLaunchDialog(props: IProps) {
  const { open, onClose, task } = props;
  const [ vals, setVals ] = React.useState<any>(getInitValues(task.args))
  const { launchTask } = useStore((state) => state)
  const [ jobType, setJobType ] = React.useState<string>("")
  const [ afterJob, setAfterJob ] = React.useState<Job | null>(null)

  const handleClose = () => {
    onClose()
  }

  const launch = React.useCallback(() => {
    const req: any = {
      task_name: task.name,
      args: [],
      kwargs: vals,
      job_type: jobType,
      condition: null
    }
    if (afterJob !== null) {
      req['condition'] = {
        type: "AfterAnother",
        arguments: {
          job_id: afterJob.id,
          status: "done"
        }
      }
    }
    launchTask(req)
  }, [afterJob])

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={'xs'} fullWidth={true}>
      <DialogTitle>{"Launch task: " + task.name}</DialogTitle>
      <List>
        {(task.args.length > 0) &&
          <>
            <Divider/>
            <ArgWidgets args={task.args} vals={vals} setVals={setVals}/>
          </>
        }
        <Divider/>
        <JobRunSettings
          jobType={jobType} setJobType={setJobType}
          afterJob={afterJob} setAfterJob={setAfterJob}
          />
        <Divider/>
      </List>

      <DialogActions>
        <Button onClick={launch}>Launch</Button>
        <Button onClick={handleClose} autoFocus>Cancel</Button>
      </DialogActions>

    </Dialog>
  );
}
