import * as React from 'react';
import Container from '@mui/material/Container';

import CustomAppBar from './components/AppBar'
import CustomDrawer from './components/Drawer';
import LaunchPanel from './content/LaunchPanel';
import JobsPanel from './content/JobsPanel';
import FilesPanel from './content/FilesPanel';
import PipelinePanel from './content/ChainViewPanel';
import FetchJobs from './components/FetchJobs';
import { PanelLabel } from './types';
import './MuiClassNameSetup';


const ContentRoute = (props: {label: PanelLabel}) => {
  const { label } = props
  if (label === "launch") {
    return <LaunchPanel/>
  } else if (label === "jobs") {
    return <JobsPanel/>
  } else if (label === "files") {
    return <FilesPanel/>
  } else if (label === "chain_view") {
    return <PipelinePanel/>
  } else {
    return <div/>
  }
}


function App() {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(true)
  const [contentLabel, setContentLabel] = React.useState<PanelLabel>('launch')

  return (
    <div className="App">
      <CustomAppBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
      <div style={{display: 'flex'}}>
        <CustomDrawer
          open={drawerOpen} setOpen={(o) => {setDrawerOpen(o)}}
          setContentLabel={(l) => {setContentLabel(l)}}
          />
        <Container sx={{ mt: 10, mb: 4}}>
          <ContentRoute label={contentLabel}/>
        </Container>
      </div>
      <FetchJobs />
    </div>
  )
}

export default App
