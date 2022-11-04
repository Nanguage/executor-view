import Button from '@mui/material/Button';

import useStore from '../store'
import JobsTable from '../components/JobsTable';


export default function JobsPanel(props: {}) {

  const { refreshJobs } = useStore((state) => state)

  return (
    <div>
      <div>
        <Button onClick={(e) => refreshJobs()}>Refresh</Button>
      </div>

      <JobsTable />

    </div>
  )
}
