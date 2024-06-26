import './MuiClassNameSetup';

import * as React from 'react';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import { SnackbarProvider, closeSnackbar } from 'notistack';

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
import FileSelectDialog from './components/file/FileSelectDialog';
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
    setServerAddr,
  } = useStore((state) => state)

  React.useEffect(() => {
    setPanel("home")
  }, [monitorMode, JSON.stringify(allowedRouters)])

  React.useEffect(() => {
    console.log("Hello")
    const urlParams = new URLSearchParams(window.location.search)
    const serverAddr = urlParams.get('server')
    if (serverAddr !== null) {
      setServerAddr(serverAddr)
    }
  }, [])

  return (
    <SnackbarProvider
      maxSnack={6}
      autoHideDuration={7000}
      action={(snackbarId) => (
        <IconButton
          onClick={() => closeSnackbar(snackbarId)}>
            <Close />
        </IconButton>
      )}
      >
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
        <FileSelectDialog />
        <Login />
        <FetchUserInfo />
      </div>
    </SnackbarProvider>
  )
}

export default App
