import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';


interface IProps {
    drawerOpen: boolean,
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


export default function CustomAppBar(props: IProps) {

    const handleDrawerOpen = () => {
      props.setDrawerOpen(true);
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, ...(props.drawerOpen && { display: 'none' }) }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
