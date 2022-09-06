import { Avatar, Button, Container, Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { changeProfilePhoto } from '../services/api';
import { useState } from 'react';

export default function SignupPhoto() {
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState('');

  const uploadPhoto = async (e) => {
    const response = await changeProfilePhoto(e.target.files[0]);
    setPhotoUrl(response.data.profilePhoto);
  };

  const redirectHome = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <Container>
      <Box
        component="form"
        sx={{
          marginTop: 17,
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
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ fontFamily: 'Satisfy', marginBottom: 5 }}
        >
          Insapgan
        </Typography>
        <label htmlFor="photo">
          <Avatar
            sx={{ width: 120, height: 120, marginBottom: 1 }}
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
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Change profile photo
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={redirectHome}
        >
          Skip
        </Button>
      </Box>
    </Container>
  );
}
