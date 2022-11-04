import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';

import JobLogDialog from './JobLogDialog';
import JobDetailDialog from './JobDetailDialog';
import { Job } from '../types';


const JobActions = (props: {job: Job}) => {
  const [logDialogOpen, setLogDialogOpen] = React.useState(false)
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
      <JobLogDialog
        open={logDialogOpen}
        onClose={() => setLogDialogOpen(false)}
        job={props.job}
      />

      <JobDetailDialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        job={props.job}
      />

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
          <MenuItem onClick={() => {setLogDialogOpen(true)}}>View log</MenuItem>
          <MenuItem onClick={() => {setDetailDialogOpen(true)}}>View detail</MenuItem>
        </ButtonGroup>
      </Popover>
    </>
  )
}


export default JobActions;
