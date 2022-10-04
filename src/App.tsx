import * as React from 'react';
import Container from '@mui/material/Container';

import './App.css'
import CustomAppBar from './components/AppBar'
import CustomDrawer from './components/Drawer';
import LaunchPanel from './content/LaunchPanel';
import JobsPanel from './content/JobsPanel';



function App() {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(true)
  const [contentLabel, setContentLabel] = React.useState<string>('launch')

  const contentRoute = (label: string) => {
    if (label === "launch") {
      return <LaunchPanel/>
    } else {
      return <JobsPanel/>
    }
  }

  return (
    <div className="App">
      <CustomAppBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
      <CustomDrawer
        open={drawerOpen} setOpen={setDrawerOpen}
        setContentLabel={setContentLabel}
        />
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4}}>
        {contentRoute(contentLabel)}
      </Container>
    </div>
  )
}

export default App
