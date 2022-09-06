import List from '@mui/material/List';
import ContactItem from './ContactItem';

export default function ContactList({ users }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {users.map((user, i) => (
        <ContactItem user={user} key={i} />
      ))}
    </List>
  );
}
