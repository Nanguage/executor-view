import React from 'react';
import axios from 'axios';

import useStore from '../store';
import MessageBar from './MessageBar';
import { MessageBarTypes, Job } from '../types';


const JobsModify = () => {
  const { serverAddr, jobModify, jobsForModify, nJobModify, refreshJobs } = useStore((state) => state)

  const [msgOpen, setMsgOpen] = React.useState<boolean>(false)
  const [msg, setMsg] = React.useState<string>("")
  const [msgType, setMsgType] = React.useState<MessageBarTypes>("info")

  const modifyJobs = (jobs: Job[]) => {
    const promises = []
    for (const job of jobs) {
      const addr = `${serverAddr}/job/${jobModify}/${job.id}`
      console.log(addr)
      const promise = axios.get(addr)
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
  }

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

export default JobsModify
