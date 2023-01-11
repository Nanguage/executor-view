import React from 'react';
import { useSnackbar } from 'notistack';

import useStore from '../../store';
import { getAxiosInstance } from '../../utils';


const jobLogFetchFactory = (
  logType: "stdout" | "stderr",
) => {

  const JobLogFetch = (props: {
        nRefresh: number,
        setContent: (c: string) => void,
        jobID: string,
      }) => {

    const { nRefresh } = props
    const {
      serverAddr, monitorMode,
    } = useStore((state) => state)

    const { enqueueSnackbar } = useSnackbar()

    React.useEffect(() => {
      fetchContent()
    }, [serverAddr, nRefresh, monitorMode])

    const fetchContent = React.useCallback(() => {
      const instance = getAxiosInstance(serverAddr)
      if (instance === undefined) {return}
      let addr: string
      if (monitorMode) {
        addr = `/monitor/${logType}/${props.jobID}`
      } else {
        addr = `/job/${logType}/${props.jobID}`
      }
      instance.get(addr).then((resp) => {
        props.setContent(resp.data['content'])
      })
      .catch((error) => {
        console.log(error)
        enqueueSnackbar(error.message + `: fetch ${addr}`, {variant: "error"})
      })
    }, [serverAddr, monitorMode])

    return (
      <></>
    )
  }

  return JobLogFetch
}

export const FetchStdout = jobLogFetchFactory("stdout")
export const FetchStderr = jobLogFetchFactory("stderr")
