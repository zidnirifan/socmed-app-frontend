import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function UserSearchList({ users }) {
  const navigate = useNavigate();

  return users.length === 0 ? (
    <Box sx={{ textAlign: 'center', marginTop: 1, paddingBottom: 1 }}>
      <AccountCircleOutlinedIcon sx={{ width: 37, height: 37 }} />
      <Typography variant="body1">User not found</Typography>
    </Box>
  ) : (
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
  );
}
