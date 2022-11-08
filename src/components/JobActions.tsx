import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';

import JobDetailDialog from './JobDetailDialog';
import useStore from '../store';
import { Job } from '../types';


const JobActions = () => {
  const { id2Job, selectedJobIds } = useStore((state) => state)
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
      {(selectedJobIds.length > 0) &&

      <JobDetailDialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        job={id2Job.get(selectedJobIds[0]) as Job}
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
            disabled={selectedJobIds.length != 1}
            onClick={() => {setDetailDialogOpen(true)}}
          >View detail</MenuItem>
        </ButtonGroup>
      </Popover>
    </>
  )
}


export default JobActions;
