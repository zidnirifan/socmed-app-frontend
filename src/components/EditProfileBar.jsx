import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/features/userSlice';
import { editUser as editUserApi } from '../services/api';

export default function EditProfileBar() {
  const navigate = useNavigate();

  const { user } = useSelector(userSelector);

  const editUser = async () => {
    const response = await editUserApi(user);
    if (response.status === 'success') navigate('/profile');
  };

  return (
    <>
      <AppBar position="sticky" color="inherit">
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            sx={{ flexGrow: 1, justifyContent: 'flex-start' }}
            onClick={() => navigate(-1)}
          >
            <Typography variant="body1" color={grey[600]} sx={{ fontSize: 18 }}>
              Cancel
            </Typography>
          </IconButton>
          <Typography
            variant="subtitle1"
            sx={{ flexGrow: 2, textAlign: 'center', fontSize: 18 }}
          >
            Edit Profile
          </Typography>
          <IconButton
            color="inherit"
            sx={{ flexGrow: 1, justifyContent: 'flex-end' }}
            onClick={editUser}
          >
            <Typography
              variant="body1"
              color="primary"
              sx={{ fontSize: 18, fontWeight: 500 }}
            >
              Done
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
