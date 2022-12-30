import React from 'react';
import axios from 'axios';
import useStore from '../../store';
import MessageBar from '../common/MessageBar';


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

export const FetchStdout = jobLogFetchFactory("stdout")
export const FetchStderr = jobLogFetchFactory("stderr")
