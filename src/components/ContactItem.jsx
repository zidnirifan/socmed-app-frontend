import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

export default function ContactItem({
  user: { id, username, fullName, profilePhoto },
}) {
  const navigate = useNavigate();

  return (
    <Box>
      <ListItem alignItems="center" sx={{ cursor: 'pointer' }}>
        <ListItemAvatar onClick={() => navigate(`/profile/${id}`)}>
          <Avatar alt={username} src={profilePhoto} />
        </ListItemAvatar>
        <Box sx={{ width: '100%' }}>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ flexGrow: 1, fontWeight: 500 }}
              onClick={() => navigate(`/message/${id}/chat`)}
            >
              {username}
              <Typography variant="body2" color={grey[600]} display="block">
                {fullName}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </ListItem>
      <Divider variant="inset" component="li" />
    </Box>
  );
}
