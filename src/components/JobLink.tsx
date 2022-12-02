import Button from '@mui/material/Button';

import useStore from '../store';


const JobLink = () => {
  const { selectedJobs } = useStore((state) => state)

  const handleClick = () => {
    const sjob = selectedJobs[0]
    if (sjob.job_type === "webapp") {
      let url = "http://" + sjob.attrs['address']
      if (url !== undefined) {
        window.open(url, "_blank")
      }
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
