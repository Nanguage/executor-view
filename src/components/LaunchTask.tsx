import React from 'react';
import axios from 'axios';

import useStore from '../store';
import MessageBar from './MessageBar';
import { Job, CallReq } from '../types'


export default function LaunchTask() {

  const { serverAddr, currentCallReq } = useStore((state) => state)

  const [errorOpen, setErrorOpen] = React.useState<boolean>(false)
  const [errorMsg, setErrorMsg] = React.useState<string>("")
  const [infoOpen, setInfoOpen] = React.useState<boolean>(false)
  const [infoMsg, setInfoMsg] = React.useState<string>("")

  const launchTask = (req: CallReq) => {
    const addr = serverAddr + "/task/call"
    axios.post(addr, req).then((resp) => {
      const job: Job = resp.data
      setInfoMsg(`Successful launch job: ${job.id}`)
      setInfoOpen(true)
    })
    .catch((error) => {
      console.log(error)
      setErrorMsg(`${error.message}: query on ${addr}`)
      setErrorOpen(true)
    })
  }

  React.useEffect(() => {
    if (currentCallReq !== null) {
      launchTask(currentCallReq)
    }
  }, [currentCallReq])


  return (
    <>
      <MessageBar
        alertOpen={infoOpen}
        setAlertOpen={setInfoOpen}
        alertHidenDuration={8000}
        text={infoMsg}
        type={"info"}
        />

      <MessageBar
        alertOpen={errorOpen}
        setAlertOpen={setErrorOpen}
        alertHidenDuration={8000}
        text={errorMsg}
        />
    </>
  )
}
