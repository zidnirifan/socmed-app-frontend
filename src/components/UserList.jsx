import List from '@mui/material/List';
import UserItem from './UserItem';

export default function UserList({ users }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {users.map((user, i) => (
        <UserItem user={user} key={i} />
      ))}
    </List>
  );
}
