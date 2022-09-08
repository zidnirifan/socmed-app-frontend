import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import UserSearchList from './UserSearchList';
import { searchUsers } from '../services/api';
import { Box } from '@mui/material';
import SkeletonList from './skeleton/SkeletonList';

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
  const [loading, setLoading] = useState(true);
  const [displayResult, setDisplayResult] = useState('none');
  const [text, setText] = useState('');

  const [users, setUsers] = useState([]);

  const search = async (e) => {
    setText(e.target.value);
    if (e.target.value.length >= 1) {
      setLoading(true);
      const response = await searchUsers(text);
      setLoading(false);
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
            onBlur={(e) => setTimeout(() => setDisplayResult('none'), 100)}
            value={text}
            onChange={search}
          />
          {text.length === 0 ? (
            <></>
          ) : (
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                background: 'white',
                display: displayResult,
              }}
            >
              {loading ? (
                <SkeletonList amount={5} />
              ) : (
                <UserSearchList users={users} display={displayResult} />
              )}
            </Box>
          )}
        </Search>
      </Toolbar>
    </AppBar>
  );
}
