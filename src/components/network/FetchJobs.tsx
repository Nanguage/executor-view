import React from 'react';
import { useSnackbar } from 'notistack';

import useStore from '../../store'
import { getAxiosInstance } from '../../utils';


export default function FetchJobs() {
  const {
    serverAddr, jobs, setJobs, setId2Job,
    monitorMode, refreshServer, nRefreshJobs,
  } = useStore((state) => state)

  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    fetchJobs()
  }, [nRefreshJobs])

  const fetchJobs = React.useCallback(
    () => {
      let addr: string;
      if (monitorMode) {
        addr = "/monitor/list_all"
      } else {
        addr = "/job/list_all"
      }
      const instance = getAxiosInstance(serverAddr)
      instance.get(addr).then((resp) => {
        setJobs(resp.data)
      })
      .catch((error) => {
        console.log(error)
        enqueueSnackbar(error.message + `: fetch ${addr}`, {variant: "error"})
        refreshServer()
      })
    }, [serverAddr, monitorMode]
  )

  React.useEffect(() => {
    let map = new Map()
    for (const job of jobs) {
      map.set(job.id, job)
    }
    setId2Job(map)
  }, [JSON.stringify(jobs)])

  return (
    <></>
  )
}