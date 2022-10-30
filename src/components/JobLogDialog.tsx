import React from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { Job } from "../types";
import { Accordion, AccordionSummary, AccordionDetails } from './Accordion';
import PseudoTerminal from './PseudoTerminal';
import useStore from '../store';
import MessageBar from './MessageBar';


const jobLogFetchFactory = (
  logType: "stdout" | "stderr",
) => {

  const JobLogFetch = (props: {
        nRefresh: number,
        setContent: (c: string) => void,
        jobID: string,
      }) => {

    const { nRefresh } = props
    const { serverAddr, monitorMode } = useStore((state) => state)
    const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
    const [errorText, setErrorText] = React.useState<string>("")

    React.useEffect(() => {
      fetchContent()
    }, [serverAddr, nRefresh, monitorMode])

    const fetchContent = React.useCallback(() => {
      let addr: string
      if (monitorMode) {
        addr = serverAddr + `/monitor/${logType}/${props.jobID}`
      } else {
        addr = serverAddr + `/job/${logType}/${props.jobID}`
      }
      axios.get(addr).then((resp) => {
        props.setContent(resp.data['content'])
      })
      .catch((error) => {
        console.log(error)
        setErrorText(error.message + `: fetch ${addr}`)
        setAlertOpen(true)
      })
    }, [serverAddr, monitorMode])

    return (
      <MessageBar
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        alertHidenDuration={6000}
        text={errorText}
        />
    )
  }

  return JobLogFetch
}

const FetchStdout = jobLogFetchFactory("stdout")
const FetchStderr = jobLogFetchFactory("stderr")


interface IProps {
  job: Job;
  open: boolean;
  onClose: () => void;
}


export default function JobLogDialog(props: IProps) {

  const handleClose = () => {
    props.onClose()
  }
  const [stdoutContent, setStdoutContent] = React.useState("")
  const [stderrContent, setStderrContent] = React.useState("")
  const [nRefresh, setNRefresh] = React.useState(0)

  return (
    <Dialog open={props.open} onClose={handleClose} maxWidth={'sm'} fullWidth={true}>
      <DialogTitle>View log: {props.job.id}</DialogTitle>

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
