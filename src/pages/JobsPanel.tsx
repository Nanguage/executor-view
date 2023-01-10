import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';

import useStore from '../store';
import JobsTable from '../components/jobs/JobsTable';
import JobActions from '../components/jobs/JobActions';
import JobLink from '../components/jobs/JobLink';
import OpenJobDetail from '../components/jobs/OpenJobDetail';
import OpenChainView from '../components/jobs/OpenChainView';


export default function JobsPanel(props: {}) {

  const { refreshJobs, serverAddr, monitorMode } = useStore((state) => state)

  React.useEffect(() => {
    const fetchInterval = 5000
    const interval = setInterval(() => refreshJobs(), fetchInterval)

    return () => {
      clearInterval(interval)
    }
  }, [serverAddr, monitorMode])

  return (
    <div>
      <div>
        <ButtonGroup>
          <Button onClick={(e) => refreshJobs()}>Refresh</Button>
          <JobActions />
          <OpenChainView />
          <OpenJobDetail />
          <JobLink />
        </ButtonGroup>
      </div>

      <Divider style={{marginBottom: 20, marginTop: 20}} />

      <JobsTable />

    </div>
  )
}
