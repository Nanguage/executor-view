import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { Job } from "../../types";
import { Accordion, AccordionSummary, AccordionDetails } from '../common/Accordion';
import PseudoTerminal from './PseudoTerminal';
import { FetchStdout, FetchStderr } from '../network/FetchLogs';


interface IProps {
  job: Job;
  open: boolean;
  onClose: () => void;
}


export default function JobDetailDialog(props: IProps) {

  const handleClose = () => {
    props.onClose()
  }
  const [stdoutContent, setStdoutContent] = React.useState("")
  const [stderrContent, setStderrContent] = React.useState("")
  const [nRefresh, setNRefresh] = React.useState(0)
  const jobJSON = JSON.stringify(props.job, null, 2)

  return (
    <Dialog open={props.open} onClose={handleClose} maxWidth={'sm'} fullWidth={true}>
      <DialogTitle>Detail: {props.job.id}</DialogTitle>

      <Accordion>
        <AccordionSummary>JSON</AccordionSummary>
        <AccordionDetails>
          <PseudoTerminal content={jobJSON}/>
        </AccordionDetails>
      </Accordion>

      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary>stdout</AccordionSummary>
        <AccordionDetails>
          <PseudoTerminal content={stdoutContent}/>
        </AccordionDetails>
        <FetchStdout
          nRefresh={nRefresh}
          setContent={(c) => setStdoutContent(c)}
          jobID={props.job.id}
          />
      </Accordion>

      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary>stderr</AccordionSummary>
        <AccordionDetails>
          <PseudoTerminal content={stderrContent}/>
        </AccordionDetails>
        <FetchStderr
          nRefresh={nRefresh}
          setContent={(c) => setStderrContent(c)}
          jobID={props.job.id}
          />
      </Accordion>

      <DialogActions>
        <Button onClick={() => {setNRefresh(nRefresh + 1)}}>Refresh</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
