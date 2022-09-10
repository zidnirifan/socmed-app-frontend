import { Button, Container, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { editUserBio } from '../services/api';
import { useForm } from 'react-hook-form';
import ChangeProfilePhoto from '../components/ChangeProfilePhoto';

export default function SignupPhoto() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    mode: 'onBlur',
  });

  const redirectHome = async (data) => {
    await editUserBio(data.bio);
    navigate('/');
    window.location.reload();
  };

  return (
    <Container
      sx={{
        marginTop: 9,
      }}
    >
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ fontFamily: 'Satisfy', marginBottom: 3 }}
      >
        Insapgan
      </Typography>
      <ChangeProfilePhoto />
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
        onSubmit={handleSubmit(redirectHome)}
      >
        <TextField
          label="Bio"
          variant="outlined"
          fullWidth
          multiline
          minRows={3}
          sx={{ marginBottom: 2 }}
          {...register('bio')}
        />
        <Button fullWidth variant="contained" color="primary" type="submit">
          Done
        </Button>
      </Box>
    </Container>
  );
}
