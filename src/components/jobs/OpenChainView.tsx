import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import ChainView from './ChainView';


const ChainViewDialog = (props: {
  open: boolean,
  onClose: () => void,
}) => {
  const {open, onClose} = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={false}>
      <DialogTitle>View chains:</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Visualization of the dependency between jobs.
        </DialogContentText>
      </DialogContent>


      <div style={{
        width: "1000px",
        height: "600px",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#ccc"
      }}>
        <ChainView/>
      </div>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}


const OpenChainView = () => {
  const [ chainsDialogOpen, setChainsDialogOpen ] = React.useState(false)

  return (
    <>
      <ChainViewDialog open={chainsDialogOpen} onClose={() => {setChainsDialogOpen(false)}} />
      <Button
        onClick={() => {setChainsDialogOpen(true)}}
      >Chains</Button>
    </>
  )
}


export default OpenChainView
