import * as React from 'react';

import './App.css'
import CustomAppBar from './components/AppBar'
import CustomDrawer from './components/Drawer';

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false)

  return (
    <div className="App">
      <CustomAppBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
      <CustomDrawer open={drawerOpen} setOpen={setDrawerOpen}/>
    </div>
  )
}

export default App
