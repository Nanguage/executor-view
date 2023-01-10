import React from 'react';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MuiInput from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { TaskArg, Job } from '../../types';
import useStore from '../../store';


const Input = styled(MuiInput)`
  height: 50px;
  width: 300px;
`;


const Dropdown = styled(Select)`
  width: 300px;
`;


interface IArgInput {
  arg: TaskArg;
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


export const getInitValues = (args: TaskArg[]) => {
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
  args: TaskArg[],
  vals: any,
  setVals: (vals: any) => void,
}


export const ArgWidgets = ( props: IArgWidgetsProps) => {
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
  afterJob: Job | null,
  setAfterJob: (i: Job | null) => void,
}


export const JobRunSettings = ( props: IJobRunSetting ) => {
  const { afterJob, setAfterJob } = props
  const { jobs, refreshJobs } = useStore((state) => state)

  React.useEffect(() => {
    refreshJobs()
  }, [])

  return (<>
    <ListItem key="job_type_selection">
      <Grid container rowGap={1}>
        <Grid item xs={3}>
          <ListItemText>After another</ListItemText>
        </Grid>
        <Grid item xs={9}>
          <Autocomplete
            value={afterJob}
            onChange={(event: any, newValue: Job | null) => {
              setAfterJob(newValue)
            }}
            options={jobs}
            sx={{ width: "300px" }}
            getOptionLabel={(option: Job) => `${option.name} id=(${option.id})`}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => <TextField {...params} label="job" />}
          />
        </Grid>
      </Grid>
    </ListItem>
  </>)
}
