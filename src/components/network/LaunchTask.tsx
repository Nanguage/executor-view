import React from 'react';
import { useSnackbar } from 'notistack';

import useStore from '../../store';
import { Job, CallReq } from '../../types';
import { getAxiosInstance } from '../../utils';


export default function LaunchTask() {

  const {
    serverAddr, currentCallReq,
  } = useStore((state) => state)

  const { enqueueSnackbar } = useSnackbar()

  const launchTask = React.useCallback((req: CallReq) => {
    const addr = "/task/call"
    const instance = getAxiosInstance(serverAddr)
    instance.post(addr, req).then((resp) => {
      const job: Job = resp.data
      enqueueSnackbar(`Successful launch job: ${job.id}`, {variant: "success"})
    })
    .catch((error) => {
      console.log(error)
      enqueueSnackbar(`${error.message}: query on ${addr}`, {variant: "error"})
    })
  }, [serverAddr])

  React.useEffect(() => {
    if (currentCallReq !== null) {
      launchTask(currentCallReq)
    }
  }, [currentCallReq])


  return (
    <></>
  )
}
