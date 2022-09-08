import { Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Navbar from '../components/NavBar';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getFollowers, getFollowing } from '../services/api';
import UserList from '../components/UserList';
import FollowerBar from '../components/FollowerBar';
import SkeletonList from '../components/skeleton/SkeletonList';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

function Followers({ type }) {
  const { userId } = useParams();
  const [value, setValue] = useState(type);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    const userData =
      value === 'followers'
        ? await getFollowers(userId)
        : await getFollowing(userId);

    setLoading(false);
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
        {loading ? (
          <SkeletonList amount={10} />
        ) : users.length === 0 ? (
          <Box sx={{ textAlign: 'center', marginTop: 3, marginBottom: 2 }}>
            <PeopleAltOutlinedIcon sx={{ width: 50, height: 50 }} />
            <Typography variant="h6">No {value} yet</Typography>
          </Box>
        ) : (
          <UserList users={users} />
        )}
      </Box>
    </>
  );
}

export default Followers;
