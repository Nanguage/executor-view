import './MuiClassNameSetup';

import * as React from 'react';
import Container from '@mui/material/Container';

import CustomAppBar from './components/common/AppBar'
import CustomDrawer from './components/common/Drawer';
import LaunchPanel from './pages/LaunchPanel';
import JobsPanel from './pages/JobsPanel';
import FilesPanel from './pages/FilesPanel';
import PipelinePanel from './pages/ChainViewPanel';
import FetchJobs from './components/network/FetchJobs';
import FetchServerSetting from './components/network/FetchServerSetting';
import LaunchTask from './components/network/LaunchTask';
import ModifyJobs from './components/network/ModifyJobs';
import { PanelLabel } from './types';
import LoginDialog from './components/user/LoginDialog';
import useStore from './store';


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
  const { monitorMode, allowedRouters } = useStore((state) => state)

  React.useEffect(() => {
    if (monitorMode) {
      setContentLabel('jobs')
    } else if (allowedRouters.includes('task')) {
      setContentLabel('launch')
    } else if (allowedRouters.includes('job')) {
      setContentLabel('jobs')
    } else if (allowedRouters.includes('file')) {
      setContentLabel('files')
    }
  }, [monitorMode, JSON.stringify(allowedRouters)])

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
      <FetchServerSetting />
      {(monitorMode || allowedRouters.includes('job')) &&
        <FetchJobs />
      }
      {((!monitorMode) && (allowedRouters.includes('job'))) &&
        <ModifyJobs />
      }
      {((!monitorMode) && (allowedRouters.includes('task'))) &&
        <LaunchTask />
      }
      <LoginDialog />
    </div>
  )
}

export default App
