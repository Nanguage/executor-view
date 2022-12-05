import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';

import useStore from '../store'
import JobsTable from '../components/jobs/JobsTable';
import JobActions from '../components/jobs/JobActions';
import JobLink from '../components/jobs/JobLink';
import OpenJobDetail from '../components/jobs/OpenJobDetail';


export default function JobsPanel(props: {}) {

  const { refreshJobs } = useStore((state) => state)

  return (
    <div>
      <div>
        <ButtonGroup>
          <Button onClick={(e) => refreshJobs()}>Refresh</Button>
          <JobActions />
          <OpenJobDetail />
          <JobLink />
        </ButtonGroup>
      </div>

      <Divider style={{marginBottom: 20, marginTop: 20}} />

      <JobsTable />

    </div>
  )
}
