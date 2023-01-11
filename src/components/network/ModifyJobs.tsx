import React from 'react';
import { useSnackbar } from 'notistack';

import useStore from '../../store';
import { Job } from '../../types';
import { getAxiosInstance } from '../../utils';


const ModifyJobs = () => {
  const {
    serverAddr, jobModify, jobsForModify,
    nJobModify, refreshJobs,
  } = useStore((state) => state)

  const { enqueueSnackbar } = useSnackbar()

  const modifyJobs = React.useCallback((jobs: Job[]) => {
    const promises = []
    const instance = getAxiosInstance(serverAddr)
    for (const job of jobs) {
      const addr = `/job/${jobModify}/${job.id}`
      const promise = instance.get(addr)
      promises.push(promise)
    }
    Promise.all(promises).then((vals) => {
      enqueueSnackbar(`Successfully ${jobModify} ${jobs.length} jobs.`, {variant: "success"})
    }).catch((errors) => {
      console.log(errors)
      enqueueSnackbar(`Error occured when ${jobModify} jobs.`, {variant: "error"})
    })
  }, [serverAddr, jobModify])

  React.useEffect(() => {
    if (jobModify !== undefined) {
      modifyJobs(jobsForModify)
    }
  }, [nJobModify])

  return (
    <></>
  )
}

export default ModifyJobs
