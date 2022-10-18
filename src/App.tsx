import * as React from 'react';
import Container from '@mui/material/Container';

import CustomAppBar from './components/AppBar'
import CustomDrawer from './components/Drawer';
import LaunchPanel from './content/LaunchPanel';
import JobsPanel from './content/JobsPanel';
import FilesPanel from './content/FilesPanel';
import { panelLabel } from './types';
import './MuiClassNameSetup';


function App() {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(true)
  const [contentLabel, setContentLabel] = React.useState<panelLabel>('launch')

  const contentRoute = (label: string) => {
    if (label === "launch") {
      return <LaunchPanel/>
    } else if (label === "jobs") {
      return <JobsPanel/>
    } else {
      return <FilesPanel/>
    }
  }

  return (
    <div className="App">
      <CustomAppBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
      <div style={{display: 'flex'}}>
        <CustomDrawer
          open={drawerOpen} setOpen={(o) => {setDrawerOpen(o)}}
          setContentLabel={(l) => {setContentLabel(l)}}
          />
        <Container sx={{ mt: 10, mb: 4}}>
          {contentRoute(contentLabel)}
        </Container>
      </div>
    </div>
  )
}

export default App
