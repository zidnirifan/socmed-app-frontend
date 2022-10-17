import { Avatar, Container, Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { changeProfilePhoto } from '../services/api';
import { useState } from 'react';
import { getLocalUser, setLocalUser } from '../services/token';

export default function ChangeProfilePhoto(props) {
  const user = getLocalUser();

  const [photoUrl, setPhotoUrl] = useState(user.profilePhoto);

  const uploadPhoto = async (e) => {
    const response = await changeProfilePhoto(e.target.files[0]);
    setPhotoUrl(response.data.profilePhoto);
    setLocalUser({ ...user, profilePhoto: response.data.profilePhoto });
  };

  return (
    <Container {...props}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        noValidate
        autoComplete="off"
      >
        <label htmlFor="photo">
          <Avatar
            sx={{ width: 120, height: 120, marginBottom: 1, cursor: 'pointer' }}
            src={photoUrl}
          />
        </label>
        <InputBase
          id="photo"
          type="file"
          accept="image/png, image/jpeg, image/webp"
          sx={{ visibility: 'hidden', width: 0, height: 0 }}
          onChange={uploadPhoto}
        />
        <label htmlFor="photo">
          <Typography
            variant="body1"
            sx={{ marginBottom: 2, fontWeight: 500, cursor: 'pointer' }}
            color="primary"
          >
            Change profile photo
          </Typography>
        </label>
      </Box>
    </Container>
  );
}
