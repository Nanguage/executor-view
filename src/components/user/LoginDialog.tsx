import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';

import useStore from '../../store';


interface LoginDialogProps {
}


const LoginDialog = (props: LoginDialogProps) => {

  const { loginDialogOpen, setLoginDialogOpen } = useStore((state) => state)

  const handleClose = () => {
    setLoginDialogOpen(false)
  }

  const login = () => {

  }

  return (
    <Dialog onClose={handleClose} open={loginDialogOpen} maxWidth={'xs'} fullWidth={true}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <TextField
              autoFocus
              fullWidth
              id="username"
              label="username"
              variant='standard'
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              id="password"
              label="password"
              variant='standard'
              type="password"
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={login}>Login</Button>
        <Button onClick={handleClose} style={{color: "gray"}}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}


export default LoginDialog;
