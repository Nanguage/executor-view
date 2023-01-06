import React from 'react';

import useStore from '../../store';
import MessageBar from '../common/MessageBar';
import { MessageBarTypes, Job } from '../../types';
import { getAxiosInstance } from '../../utils';


const ModifyJobs = () => {
  const {
    serverAddr, jobModify, jobsForModify,
    nJobModify, refreshJobs,
  } = useStore((state) => state)

  const [msgOpen, setMsgOpen] = React.useState<boolean>(false)
  const [msg, setMsg] = React.useState<string>("")
  const [msgType, setMsgType] = React.useState<MessageBarTypes>("info")

  const modifyJobs = React.useCallback((jobs: Job[]) => {
    const promises = []
    const instance = getAxiosInstance(serverAddr)
    for (const job of jobs) {
      const addr = `/job/${jobModify}/${job.id}`
      const promise = instance.get(addr)
      promises.push(promise)
    }
    Promise.all(promises).then((vals) => {
      setMsgType("info")
      setMsg(`Successfully ${jobModify} ${jobs.length} jobs.`)
      setMsgOpen(true)
      refreshJobs()
    }).catch((errors) => {
      console.log(errors)
      setMsgType("error")
      setMsg(`Error occured when ${jobModify} jobs.`)
      setMsgOpen(true)
    })
  }, [serverAddr, jobModify])

  React.useEffect(() => {
    if (jobModify !== undefined) {
      modifyJobs(jobsForModify)
    }
  }, [nJobModify])

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

export default ModifyJobs
