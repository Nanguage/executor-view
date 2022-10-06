import React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import MuiInput from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';

import { ITask, ITaskArg, IJob } from '../types'
import useStore from '../store';
import Alert from '../components/Alert';
import { getAlertCloseHandler } from '../utils';


const Input = styled(MuiInput)`
  height: 50px;
  width: 300px;
`;


const Dropdown = styled(Select)`
  width: 300px;
`;


interface IArgInput {
  arg: ITaskArg;
  val: any;
  setVal: (val: any) => void;
};


const ArgInput = (props: IArgInput) => {
  const { arg, val, setVal } = props;

  const getChangeHandler = (parseFunc: (v: any) => any) => {
    const handleChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
      const val = parseFunc(e.target.value)
      setVal(val)
    }
    return handleChange
  }

  if (arg.type === 'int') {
    const inputProps = {
      step: 1,
      min: 0,
      max: 1000000,
      type: 'number'
    }
    if (arg.range !== null) {
      inputProps.min = arg.range[0] as number
      inputProps.max = arg.range[1] as number
    }
    return <Input
            value={val} inputProps={inputProps}
            onChange={getChangeHandler(parseInt)}/>
  } else if (arg.type === 'float') {
    const inputProps = {
      step: 0.1,
      min: 0.0,
      max: 1000000000.0,
      type: 'number'
    }
    if (arg.range !== null) {
      inputProps.min = arg.range[0] as number
      inputProps.max = arg.range[1] as number
    }
    return <Input
            value={val} inputProps={inputProps}
            onChange={getChangeHandler(parseFloat)}/>
  } else {
    return <Input
            value={val}
            onChange={getChangeHandler((v) => v)}
            />
  }
}


const getInitValues = (args: ITaskArg[]) => {
  const vals: any = {}
  for (let arg of args) {
    let val: any
    if (arg.default !== null) {
      val = arg.default
    } else if (arg.range !== null) {
      val = arg.range[0]
    } else {
      if (arg.type === 'int') {
        val = 0
      } else if (arg.type === 'float') {
        val = 0.0
      } else {
        val = ""
      }
    }
    vals[arg.name] = val
  }
  return vals
}


interface IArgWidgetsProps {
  args: ITaskArg[],
  vals: any,
  setVals: (vals: any) => void,
}


const ArgWidgets = ( props: IArgWidgetsProps) => {
  const { args, vals, setVals } = props

  return (
    <>
    {
      args.map((arg) => (
        <ListItem key={arg.name}>
          <Grid container>
            <Grid item xs={3} key={`label-${arg.name}`}>
              <ListItemText primary={arg.name} secondary={arg.type}/>
            </Grid>
            <Grid item xs={9} key={`widget-${arg.name}`}>
              <ArgInput
                arg={arg} val={vals[arg.name]}
                setVal={
                  (val: any) => {
                    const newVals = {...vals}
                    newVals[arg.name] = val
                    setVals(newVals)
                  }
                }
                />
            </Grid>
          </Grid>
        </ListItem>
      ))
    }
    </>
  )
}


interface IJobRunSetting {
  validJobTypes: string[],
  jobType: string,
  setJobType: (t: string) => void,
}


const JobRunSettings = ( props: IJobRunSetting ) => {
  const { jobType, validJobTypes, setJobType } = props

  return (<>
    <ListItem key="job_type_selection">
      <Grid container>
        <Grid item xs={3}>
          <ListItemText>Job type</ListItemText>
        </Grid>
        <Grid item xs={9}>
          <Dropdown
            value={jobType}
            onChange={(e) => {setJobType(e.target.value as string)}}
          >
            {validJobTypes.map(
              (j) => <MenuItem key={j} value={j}>{j}</MenuItem>
            )}
          </Dropdown>
        </Grid>
      </Grid>
    </ListItem>
  </>)
}


interface IProps {
  open: boolean;
  onClose: () => void;
  task: ITask;
}

export default function TaskLaunchDialog(props: IProps) {
  const { open, onClose, task } = props;
  const [ vals, setVals ] = React.useState<any>(getInitValues(task.args))
  const serverAddr = useStore((state) => state.serverAddr)
  const validJobTypes = useStore((state) => state.validJobTypes)
  const [ jobType, setJobType ] = React.useState<string>("")
  React.useEffect(() => {
    setJobType(validJobTypes[0])
  }, [validJobTypes])

  const alertHidenDuration = 8000
  const [errorOpen, setErrorOpen] = React.useState<boolean>(false)
  const [errorMsg, setErrorMsg] = React.useState<string>("")
  const [infoOpen, setInfoOpen] = React.useState<boolean>(false)
  const [infoMsg, setInfoMsg] = React.useState<string>("")

  const handleErrorClose = getAlertCloseHandler(setErrorOpen)
  const handleInfoClose = getAlertCloseHandler(setInfoOpen)

  const handleClose = () => {
    onClose()
  }

  const launchTask = () => {
    const addr = serverAddr + "/call"
    const req = {
      task_name: task.name,
      args: [],
      kwargs: vals,
      job_type: jobType,
    }
    axios.post(addr, req).then((resp) => {
      const job: IJob = resp.data
      setInfoMsg(`Successful launch job: ${job.id}`)
      setInfoOpen(true)
    })
    .catch((error) => {
      console.log(error)
      setErrorMsg(`${error.message}: query on ${addr}`)
      setErrorOpen(true)
    })
  }

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={'xs'} fullWidth={true}>
      <DialogTitle>{"Launch task: " + task.name}</DialogTitle>
      <List>
        <JobRunSettings validJobTypes={validJobTypes} jobType={jobType} setJobType={setJobType}/>
        <Divider/>
        <ArgWidgets args={task.args} vals={vals} setVals={setVals}/>
      </List>

      <DialogActions>
        <Button onClick={launchTask}>Launch</Button>
        <Button onClick={handleClose} autoFocus>Cancel</Button>
      </DialogActions>

      <Snackbar open={infoOpen} autoHideDuration={alertHidenDuration} onClose={handleInfoClose}>
        <Alert onClose={handleInfoClose} severity="info" sx={{ width: '100%' }}>
          {infoMsg}
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={alertHidenDuration} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
