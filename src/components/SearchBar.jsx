import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  marginRight: 0,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
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
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
  width: '100%',
}));

export default function SearchBar() {
  const [displayResult, setDisplayResult] = useState('none');

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onFocus={() => setDisplayResult('block')}
            onBlur={() => setDisplayResult('none')}
          />
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              background: 'white',
              display: displayResult,
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      aria-label="recipe"
                      src="https://material-ui.com/static/images/avatar/2.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText primary="zidni_rifan" sx={{ color: 'black' }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar aria-label="recipe" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="stranger_user"
                    sx={{ color: 'black' }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Search>
      </Toolbar>
    </AppBar>
  );
}
