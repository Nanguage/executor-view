import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import MuiInput from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';


import { ITask, ITaskArg } from '../types'


const Input = styled(MuiInput)`
  height: 50px;
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
    return <TextField
            value={val}
            onChange={getChangeHandler((v) => v)}/>
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


interface IProps {
  open: boolean;
  onClose: () => void;
  task: ITask;
}

export default function TaskLaunchDialog(props: IProps) {
  const { open, onClose, task } = props;
  const [ vals, setVals ] = React.useState<any>(getInitValues(task.args))

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={'xs'} fullWidth={true}>
      <DialogTitle>{"Launch task: " + task.name}</DialogTitle>
      <List>
        <ListItem></ListItem>
        <Divider/>
        {
          task.args.map((arg) => (
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  <ListItemText primary={arg.name} secondary={arg.type}/>
                </Grid>
                <Grid item xs={9}>
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
      </List>
      <DialogActions>
        <Button>Launch</Button>
        <Button onClick={handleClose} autoFocus>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
