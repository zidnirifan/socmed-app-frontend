import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import { logoutApi } from '../services/api';

export default function OwnProfileBar({ username }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await logoutApi();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="sticky" color="inherit">
        <Toolbar variant="dense">
          <Typography
            variant="subtitle1"
            sx={{ flexGrow: 2, fontSize: 18, paddingLeft: 2 }}
          >
            {username}
          </Typography>
          <Box sx={{ flexGrow: 1, textAlign: 'end' }}>
            <IconButton color="inherit" onClick={() => navigate('/add-post')}>
              <AddCircleIcon fontSize="medium" />
            </IconButton>
            <IconButton
              color="inherit"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon fontSize="medium" />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
