import * as React from 'react';

import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


const drawerWidth = 240;



const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


interface IProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setContentLabel: React.Dispatch<React.SetStateAction<string>>,
}


export default function CustomDrawer(props: IProps) {
  const theme = useTheme()

  const handleDrawerClose = () => {
    props.setOpen(false);
  };

  return (
    <Drawer
      sx={{
        width: (props.open ? drawerWidth : 0),
        transition: "width 0.1s",
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      open={props.open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>

        <ListItem key="launch" disablePadding>
          <ListItemButton onClick={() => props.setContentLabel("launch")}>
            <ListItemIcon>
              <RocketLaunchIcon/>
            </ListItemIcon>
            <ListItemText primary="Launch task"/>
          </ListItemButton>
        </ListItem>

        <ListItem key="jobs" disablePadding>
          <ListItemButton onClick={() => props.setContentLabel("jobs")}>
            <ListItemIcon>
              <FormatListBulletedIcon/>
            </ListItemIcon>
            <ListItemText primary="Jobs"/>
          </ListItemButton>
        </ListItem>

      </List>

    </Drawer>
  )
}

