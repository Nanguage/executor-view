import React from 'react';
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
  const {
    loginDialogOpen, setLoginDialogOpen, login, userInfo
  } = useStore((state) => state)
  const _username = userInfo === null ? "" : userInfo.username

  const [username, setUsername] = React.useState(_username)
  const [password, setPassword] = React.useState("")

  const handleClose = () => {
    setLoginDialogOpen(false)
  }

  const handleLogin = () => {
    login(username, password)
    handleClose()
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              id="password"
              label="password"
              variant='standard'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogin}>Login</Button>
        <Button onClick={handleClose} style={{color: "gray"}}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}


export default LoginDialog;
