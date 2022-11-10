import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';

import JobDetailDialog from './JobDetailDialog';
import useStore from '../store';


const JobActions = () => {
  const { selectedJobs, monitorMode, allowedRouters, modifyJobs } = useStore((state) => state)
  const [detailDialogOpen, setDetailDialogOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const open = Boolean(anchorEl)

  return (
    <>
      {(selectedJobs.length > 0) &&

      <JobDetailDialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        job={selectedJobs[0]}
      />
      }

      <Button onClick={handleClick}>Actions</Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        >
        <ButtonGroup variant="text" orientation="vertical" aria-label="outlined button group">
          <MenuItem
            disabled={selectedJobs.length != 1}
            onClick={() => {setDetailDialogOpen(true)}}
          >View detail</MenuItem>
          {((!monitorMode) && (allowedRouters.includes('job'))) &&
          <>
            <MenuItem
              disabled={selectedJobs.length < 1}
              onClick={() => {modifyJobs(selectedJobs, "cancel")}}
            >Cancel</MenuItem>
            <MenuItem
              disabled={selectedJobs.length < 1}
              onClick={() => {modifyJobs(selectedJobs, "re_run")}}
            >Re-run</MenuItem>
            <MenuItem
              disabled={selectedJobs.length < 1}
              onClick={() => {modifyJobs(selectedJobs, "remove")}}
            >Remove</MenuItem>
          </>
          }
        </ButtonGroup>
      </Popover>
    </>
  )
}


export default JobActions;
