import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import ProfileIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

function Navbar() {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontFamily: 'Satisfy', fontSize: '1.8rem' }}
          >
            Insapgan
          </Typography>
          <IconButton color="inherit">
            <AddCircleIcon fontSize="medium" />
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={7} color="error">
              <FavoriteBorderIcon fontSize="medium" />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={1} color="error">
              <ChatIcon fontSize="medium" />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
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
            component={Link}
            to="/"
            color="inherit"
            sx={{ flexGrow: 1, padding: 0 }}
          >
            <HomeIcon fontSize="large" />
          </IconButton>
          <IconButton
            component={Link}
            to="/add"
            color="inherit"
            sx={{ flexGrow: 1, padding: 0 }}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
          <IconButton
            component={Link}
            to="/search"
            color="inherit"
            sx={{ flexGrow: 1, padding: 0 }}
          >
            <SearchIcon fontSize="large" />
          </IconButton>
          <IconButton
            component={Link}
            to="/profile"
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
