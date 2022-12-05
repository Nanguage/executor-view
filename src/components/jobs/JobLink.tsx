import React from 'react';
import Button from '@mui/material/Button';

import useStore from '../../store';
import MessageBar from '../common/MessageBar'


const JobLink = () => {
  const { selectedJobs, allowedRouters, serverAddr } = useStore((state) => state)
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")

  const handleClick = () => {
    const sjob = selectedJobs[0]
    if (sjob.job_type === "webapp") {
      let url: string
      if (allowedRouters.includes("proxy")) {
        url = `${serverAddr}/proxy/app/${sjob.id}/`
      }
      else {
        const addr = sjob.attrs['address']
        if (addr === undefined) {
          setErrorText("Error when get address of job.")
          setAlertOpen(true)
          return
        }
        url = "http://" + addr
      }
      window.open(url, "_blank")
    }
  }

  return (
    <>
    <MessageBar
      alertOpen={alertOpen}
      setAlertOpen={setAlertOpen}
      alertHidenDuration={6000}
      text={errorText}
    />
    <Button
      onClick={handleClick}
      disabled={(selectedJobs.length != 1) || (selectedJobs[0].job_type !== "webapp")}
    >Link</Button>
    </>
  )
}

export default JobLink
