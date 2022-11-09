import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import useStore from '../store';
import { Job } from '../types';


const columns: GridColDef[] = [
  { field: 'id', headerName: "ID", width: 300 },
  { field: 'created_time', headerName: "Created time", width: 200 },
  { field: 'stoped_time', headerName: "Stoped time", width: 200 },
  { field: 'name', headerName: "Name" },
  { field: 'status', headerName: "Status" },
  { field: 'job_type', headerName: "Job type" },
]


export default function JobsTable() {
  const { jobs, setSelectedJobs, id2Job } = useStore((state) => state)
  const [rows, setRows] = React.useState<GridRowsProp>([])

  React.useEffect(() => {
    const rows: GridRowsProp = jobs.map((job) => ({
      id: job.id,
      created_time: job.created_time,
      stoped_time: job.stoped_time,
      name: job.name,
      status: job.status,
      job_type: job.job_type,
    }))
    setRows(rows)
  }, [JSON.stringify(jobs)])

  return (
    <Box sx={{height: 800, width: "100%"}}>
      <DataGrid
        checkboxSelection
        disableSelectionOnClick
        rows={rows}
        columns={columns}
        onSelectionModelChange={(newSelectionArray) => {
          const job_ids = newSelectionArray as string[]
          const jobs = job_ids.map((id) => (id2Job.get(id) as Job))
          setSelectedJobs(jobs)
        }}
      />
    </Box>
 )
}