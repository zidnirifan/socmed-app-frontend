import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Link,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userSignupSchema } from '../schema/user';
import { loginUser, registerUser as registerUserApi } from '../services/api';
import { joiResolver } from '@hookform/resolvers/joi';

export default function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm({
    resolver: joiResolver(userSignupSchema),
    mode: 'onBlur',
  });

  const registerUser = async (data) => {
    setLoading(true);
    const response = await registerUserApi(data);
    setLoading(false);

    if (response.status === 'success') {
      await loginUser({
        username: getValues('username'),
        password: getValues('password'),
      });
      navigate('/signup-photo');
      window.location.reload();
    }
    if (
      response.status === 'fail' &&
      response.message === 'username already exist'
    ) {
      setError('username', { type: 'custom', message: response.message });
    }
  };

  return (
    <Container>
      <Box
        component="form"
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        onSubmit={handleSubmit(registerUser)}
      >
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ fontFamily: 'Satisfy', marginBottom: 3 }}
        >
          Insapgan
        </Typography>
        <Typography variant="h4" fontSize="1.7rem">
          Register
        </Typography>
        <hr
          style={{
            color: 'grey',
            backgroundColor: 'grey',
            width: '100%',
            height: 1,
            marginBottom: 20,
          }}
        />
        <TextField
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          label="Full name"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          {...register('fullName')}
        />
        <TextField
          error={!!errors.username}
          helperText={errors.username?.message}
          label="Username"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          {...register('username')}
        />
        <TextField
          error={!!errors.password}
          helperText={errors.password?.message}
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ marginBottom: 2 }}
          {...register('password')}
        />
        <TextField
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          label="Confirm password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ marginBottom: 2 }}
          {...register('confirmPassword')}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Sign up
        </Button>
        <Typography variant="body1" sx={{ marginTop: 1.3 }}>
          Already have an account?<span>&nbsp;</span>
          <Link
            variant="body1"
            underline="hover"
            sx={{ cursor: 'pointer', fontWeight: 500 }}
            onClick={() => navigate('/login')}
          >
            Log in
          </Link>
        </Typography>
        {/* loading */}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Container>
  );
}
