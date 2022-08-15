import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import UserList from './UserList';
import { searchUsers } from '../services/api';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
  width: '100%',
}));

export default function SearchBar() {
  const [displayResult, setDisplayResult] = useState('none');

  const [users, setUsers] = useState([]);

  const search = async (e) => {
    if (e.target.value.length >= 1) {
      const response = await searchUsers(e.target.value);
      setUsers(response.data.users);
    }
  };

  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar variant="dense">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onFocus={() => setDisplayResult('block')}
            onBlur={(e) => setTimeout(() => setDisplayResult('none'), 1)}
            onChange={search}
          />
          <UserList users={users} display={displayResult} />
        </Search>
      </Toolbar>
    </AppBar>
  );
}
