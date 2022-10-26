import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import PseudoTerminal from './PseudoTerminal';
import Button from '@mui/material/Button';

import { Job } from "../types";


interface IProps {
  job: Job;
  open: boolean;
  onClose: () => void;
}


export default function JobDetailDialog(props: IProps) {
  const handleClose = () => {
    props.onClose()
  }

  const content = JSON.stringify(props.job, null, 2)

  return (
    <Dialog open={props.open} onClose={handleClose} maxWidth={'sm'} fullWidth={true}>
      <DialogTitle>Job detail</DialogTitle>
      <PseudoTerminal content={content}/>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
