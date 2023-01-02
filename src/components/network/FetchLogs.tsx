import React from 'react';

import useStore from '../../store';
import MessageBar from '../common/MessageBar';
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
      setLoginDialogOpen, token, userMode,
    } = useStore((state) => state)
    const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
    const [errorText, setErrorText] = React.useState<string>("")

    React.useEffect(() => {
      fetchContent()
    }, [serverAddr, nRefresh, monitorMode])

    const fetchContent = React.useCallback(() => {
      const instance = getAxiosInstance(serverAddr, userMode, token, setLoginDialogOpen)
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
        setErrorText(error.message + `: fetch ${addr}`)
        setAlertOpen(true)
      })
    }, [serverAddr, monitorMode, token, userMode])

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

export const FetchStdout = jobLogFetchFactory("stdout")
export const FetchStderr = jobLogFetchFactory("stderr")
