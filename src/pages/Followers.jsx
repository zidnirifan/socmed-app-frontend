import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import Navbar from '../components/NavBar';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getFollowers, getFollowing } from '../services/api';
import UserList from '../components/UserList';
import FollowerBar from '../components/FollowerBar';

function Followers({ type }) {
  const { userId } = useParams();
  const [value, setValue] = useState(type);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    const userData =
      value === 'followers'
        ? await getFollowers(userId)
        : await getFollowing(userId);

    setUsers(userData.data.users);
  }, [userId, value]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <Navbar />
      <FollowerBar />
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} variant="fullWidth" onChange={handleChange}>
          <Tab value="followers" label="Followers" />
          <Tab value="following" label="Following" />
        </Tabs>
        <UserList users={users} />
      </Box>
    </>
  );
}

export default Followers;
