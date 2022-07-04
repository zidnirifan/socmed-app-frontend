import { AppBar, IconButton, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import ProfileIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';

function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          top: 'auto',
          bottom: 0,
        }}
      >
        <Toolbar
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          variant="dense"
        >
          <IconButton
            onClick={() => navigate('/')}
            color="inherit"
            sx={{ flexGrow: 1, padding: 0 }}
          >
            <HomeIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => navigate('/add')}
            color="inherit"
            sx={{ flexGrow: 1, padding: 0 }}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => navigate('/explore')}
            color="inherit"
            sx={{ flexGrow: 1, padding: 0 }}
          >
            <SearchIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => navigate('/profile')}
            color="inherit"
            sx={{ flexGrow: 1, padding: 0 }}
          >
            <ProfileIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
