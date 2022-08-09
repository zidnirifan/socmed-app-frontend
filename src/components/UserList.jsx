import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function UserList({ users, display }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        background: 'white',
        display: display,
      }}
    >
      <List sx={{ padding: 0 }}>
        {users.map((user) => (
          <ListItem
            disablePadding
            key={user.id}
            onClick={() => navigate(`/profile/${user.id}`)}
          >
            <ListItemButton sx={{ paddingTop: 0.5, paddingBottom: 0.5 }}>
              <ListItemAvatar>
                <Avatar aria-label="recipe" src={user.profilePhoto} />
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                secondary={user.fullName}
                sx={{ color: 'black' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
