import './MuiClassNameSetup';

import * as React from 'react';
import Container from '@mui/material/Container';
import { SnackbarProvider } from 'notistack';

import CustomAppBar from './components/common/AppBar'
import CustomDrawer from './components/common/Drawer';
import LaunchPanel from './pages/LaunchPanel';
import Home from './pages/Home';
import JobsPanel from './pages/JobsPanel';
import FilesPanel from './pages/FilesPanel';
import FetchJobs from './components/network/FetchJobs';
import FetchServerSetting from './components/network/FetchServerSetting';
import LaunchTask from './components/network/LaunchTask';
import FetchTasks from './components/network/FetchTasks';
import ModifyJobs from './components/network/ModifyJobs';
import { PanelLabel } from './types';
import LoginDialog from './components/user/LoginDialog';
import Login from './components/network/Login';
import FetchUserInfo from './components/network/FetchUserInfo';
import useStore from './store';


const ContentRoute = (props: {label: PanelLabel}) => {
  const { label } = props
  if (label === "home") {
    return <Home />
  } else if (label === "launch") {
    return <LaunchPanel/>
  } else if (label === "jobs") {
    return <JobsPanel/>
  } else if (label === "files") {
    return <FilesPanel/>
  } else {
    return <div/>
  }
}


function App() {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(true)
  const {
    monitorMode, allowedRouters,
    panel, setPanel,
  } = useStore((state) => state)

  React.useEffect(() => {
    setPanel("home")
  }, [monitorMode, JSON.stringify(allowedRouters)])

  return (
    <SnackbarProvider maxSnack={6} autoHideDuration={7000}>
      <div className="App">
        <CustomAppBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
        <div style={{display: 'flex'}}>
          <CustomDrawer
            open={drawerOpen} setOpen={(o) => {setDrawerOpen(o)}}
            setContentLabel={(l) => {setPanel(l)}}
            />
          <Container sx={{ mt: 10, mb: 4}}>
            <ContentRoute label={panel}/>
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
          <>
            <LaunchTask />
            <FetchTasks />
          </>
        }
        <LoginDialog />
        <Login />
        <FetchUserInfo />
      </div>
    </SnackbarProvider>
  )
}

export default App
