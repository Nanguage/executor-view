import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import MuiInput from '@mui/material/Input';
import TextField from '@mui/material/TextField';


import { ITask, ITaskArg } from '../types'


const Input = MuiInput


const ArgInput = (props: {arg: ITaskArg}) => {
  const { arg } = props;

  if (arg.type == 'int') {
    return <Input/>
  } else {
    return <TextField/>
  }
}


interface IProps {
  open: boolean;
  onClose: () => void;
  task: ITask;
}

export default function TaskLaunchDialog(props: IProps) {
  const { open, onClose, task } = props;

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{"Launch task: " + task.name}</DialogTitle>
      <List>
        {
          task.args.map((arg) => (
            <ListItem>
              <ListItemText>{arg.name}</ListItemText>
              <ArgInput arg={arg}/>
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
