import React from 'react';
import Button from '@mui/material/Button';

import JobDetailDialog from './JobDetailDialog';
import useStore from '../../store';


const OpenJobDetail = () => {

  const { selectedJobs } = useStore((state) => state)
  const [detailDialogOpen, setDetailDialogOpen] = React.useState(false)

  return (
    <>
      {(selectedJobs.length == 1) &&
        <JobDetailDialog
          open={detailDialogOpen}
          onClose={() => setDetailDialogOpen(false)}
          job={selectedJobs[0]}
        />
      }

      <Button
        disabled={selectedJobs.length != 1}
        onClick={() => {setDetailDialogOpen(true)}}
      >detail</Button>
    </>
  )
}


export default OpenJobDetail
