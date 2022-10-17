import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import JobLogDialog from './JobLogDialog';
import { IJob } from '../types';


const JobActions = (props: {job: IJob}) => {
  const [logDialogOpen, setLogDialogOpen] = React.useState(false)

  return (
    <ButtonGroup>
      <JobLogDialog
        open={logDialogOpen}
        onClose={() => setLogDialogOpen(false)}
        job={props.job}
      />
      <Button onClick={() => {setLogDialogOpen(true)}}>View log</Button>
    </ButtonGroup>
  )
}


interface IProps {
  jobs: IJob[],
}


export default function JobsTable(props: IProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Created time</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Job type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.jobs.map((job) => (
            <TableRow
              key={job.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {job.id}
              </TableCell>
              <TableCell>{job.created_time}</TableCell>
              <TableCell>{job.name}</TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>{job.job_type}</TableCell>
              <TableCell><JobActions job={job}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}