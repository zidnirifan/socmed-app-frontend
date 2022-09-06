import List from '@mui/material/List';
import SuggestedUserItem from './SuggestedUserItem';

export default function SuggestedUserList({ users }) {
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        overflow: 'auto',
        whiteSpace: 'nowrap',
      }}
    >
      {users.map((user, i) => (
        <SuggestedUserItem user={user} key={i} />
      ))}
    </List>
  );
}
