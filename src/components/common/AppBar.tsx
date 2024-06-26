import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import StorageIcon from '@mui/icons-material/Storage';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';

import useStore from '../../store';


const drawerWidth = 240;


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Address = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const AddressIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .my-MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from Icon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));


const CustomButton = styled(Button)(({ theme }) => ({
  height: 39,
  color: "white",
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
}))


const LoginButton = () => {
  const { setLoginDialogOpen, userInfo } = useStore()
  return (
    <div style={{marginLeft: 10}}>
      {
        userInfo === null ? (
          <CustomButton
            onClick={() => {setLoginDialogOpen(true)}}
            style={{
              marginLeft: 20,
            }}
          >
            Login
          </CustomButton>
        ) : (
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setLoginDialogOpen(true)}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        )
      }
    </div>
  )
}


interface IProps {
  drawerOpen: boolean,
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


export default function CustomAppBar(props: IProps) {

  const { userMode } = useStore((state) => state)

  const handleDrawerOpen = () => {
    props.setDrawerOpen(true);
  };

  const {
    serverAddr, setServerAddr, refreshServer,
  } = useStore((state) => state)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" open={props.drawerOpen}>
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
            ExecutorView
          </Typography>

          <Address>
              <AddressIconWrapper>
                <StorageIcon />
              </AddressIconWrapper>
              <StyledInputBase
                placeholder="Server address"
                inputProps={{ 'aria-label': 'search' }}
                value={serverAddr}
                onChange={(e) => setServerAddr(e.target.value)}
                onBlur={(e) => {refreshServer()}}
              />
          </Address>

          {
            (userMode != "free")
            && <LoginButton />
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}
