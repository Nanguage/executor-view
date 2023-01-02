import React from 'react';

import useStore from '../../store';
import MessageBar from '../common/MessageBar';
import { Job, CallReq, MessageBarTypes } from '../../types';
import { getAxiosInstance } from '../../utils';


export default function LaunchTask() {

  const {
    serverAddr, currentCallReq,
    token, userMode, setLoginDialogOpen,
  } = useStore((state) => state)

  const [msgOpen, setMsgOpen] = React.useState<boolean>(false)
  const [msg, setMsg] = React.useState<string>("")
  const [msgType, setMsgType] = React.useState<MessageBarTypes>("info")

  const launchTask = React.useCallback((req: CallReq) => {
    const addr = "/task/call"
    const instance = getAxiosInstance(serverAddr, userMode, token, setLoginDialogOpen)
    if (instance === undefined) {return}
    instance.post(addr, req).then((resp) => {
      const job: Job = resp.data
      setMsgType("info")
      setMsg(`Successful launch job: ${job.id}`)
      setMsgOpen(true)
    })
    .catch((error) => {
      console.log(error)
      setMsgType("error")
      setMsg(`${error.message}: query on ${addr}`)
      setMsgOpen(true)
    })
  }, [token, userMode, serverAddr])

  React.useEffect(() => {
    if (currentCallReq !== null) {
      launchTask(currentCallReq)
    }
  }, [currentCallReq])


  return (
    <>
      <MessageBar
        alertOpen={msgOpen}
        setAlertOpen={setMsgOpen}
        alertHidenDuration={8000}
        text={msg}
        type={msgType}
        />
    </>
  )
}
