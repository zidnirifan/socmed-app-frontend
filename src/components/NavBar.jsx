import { AppBar, IconButton, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import ProfileOutlineIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useState } from 'react';
import searchImg from '../icons/search-icon-black.svg';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ProfileIcon from '@mui/icons-material/AccountCircle';

function Navbar() {
  const navigate = useNavigate();

  const [active, setActive] = useState(
    window.location.pathname.slice(1)
      ? window.location.pathname.slice(1)
      : 'home'
  );

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    setActive(id);
    navigate(id === 'home' ? '/' : `/${id}`);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{
          top: 'auto',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '600px',
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
            id="home"
            onClick={handleClick}
            color="inherit"
            sx={{ flexGrow: 1, padding: 0 }}
          >
            {active === 'home' ? (
              <HomeIcon fontSize="large" />
            ) : (
              <HomeOutlinedIcon fontSize="large" />
            )}
          </IconButton>
          <IconButton
            id="explore"
            onClick={handleClick}
            color="inherit"
            sx={{ flexGrow: 1, padding: 0 }}
          >
            {active === 'explore' ? (
              <img src={searchImg} alt="search-icon" width="28px" />
            ) : (
              <SearchIcon fontSize="large" sx={{ fontWeight: 600 }} />
            )}
          </IconButton>
          <IconButton
            id="add-post"
            onClick={handleClick}
            color="inherit"
            sx={{ flexGrow: 1, padding: 0 }}
          >
            {active === 'add-post' ? (
              <AddCircleIcon fontSize="large" />
            ) : (
              <AddCircleOutlineIcon fontSize="large" />
            )}
          </IconButton>
          <IconButton
            id="profile"
            onClick={handleClick}
            color="inherit"
            sx={{ flexGrow: 1, padding: 0 }}
          >
            {active === 'profile' ? (
              <ProfileIcon fontSize="large" />
            ) : (
              <ProfileOutlineIcon fontSize="large" />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
