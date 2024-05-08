import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import useStore from '../../store';
import FileBrowser from './FileBrowser';


interface FileSelectDialogProps {
}


const FileSelectDialog = (props: FileSelectDialogProps) => {
  const {
    fileSelectDialogOpen, setFileSelectDialogOpen, selectedFiles,
    currentPath, setReturnFile, fieldSetter
  } = useStore()

  const handleClose = () => {
    setFileSelectDialogOpen(false)
  }

  let retFile: string | null
  if (selectedFiles.length === 0) {
    retFile = null
  } else {
    const firstFile = selectedFiles[0]
    if (firstFile) {
      const path = (currentPath.map((p) => p.name)).join("/")
      retFile = path + "/" + firstFile.name
    } else {
      retFile = null
    }
  }

  const handleConfirm = () => {
    if (selectedFiles.length === 0) {
      return
    }
    setFileSelectDialogOpen(false)
    console.log(retFile)
    setReturnFile(retFile)
    fieldSetter(retFile)
  }

  return (
    <Dialog onClose={handleClose} open={fileSelectDialogOpen} maxWidth={'xl'} fullWidth={true}>
      <DialogTitle>Select file</DialogTitle>
      <DialogContent>
        <FileBrowser />
        <div>
          {
            retFile === null ? "No file selected" : `Selected file: ${retFile}`
          }
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>Select</Button>
        <Button onClick={handleClose} style={{color: "gray"}}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}


export default FileSelectDialog;
