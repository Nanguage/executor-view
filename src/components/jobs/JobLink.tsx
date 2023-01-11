import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';

import useStore from '../../store';


const JobLink = () => {
  const { selectedJobs, allowedRouters, serverAddr } = useStore((state) => state)

  const { enqueueSnackbar } = useSnackbar()

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
          enqueueSnackbar("Error when get address of job.", {variant: "error"})
          return
        }
        url = "http://" + addr
      }
      window.open(url, "_blank")
    }
  }

  return (
    <>
    <Button
      onClick={handleClick}
      disabled={(selectedJobs.length != 1) || (selectedJobs[0].job_type !== "webapp")}
    >Link</Button>
    </>
  )
}

export default JobLink
