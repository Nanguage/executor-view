import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import useStore from '../store';


const columns: GridColDef[] = [
  { field: 'id', headerName: "ID", width: 300 },
  { field: 'created_time', headerName: "Created time", width: 200 },
  { field: 'name', headerName: "Name" },
  { field: 'status', headerName: "Status" },
  { field: 'job_type', headerName: "Job type" },
]


export default function JobsTable() {
  const { jobs } = useStore((state) => state)
  const [rows, setRows] = React.useState<GridRowsProp>([])

  React.useEffect(() => {
    const rows: GridRowsProp = jobs.map((job) => ({
      id: job.id,
      created_time: job.created_time,
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
      />
    </Box>
 )
}