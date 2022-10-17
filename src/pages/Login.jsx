import {
  Button,
  Container,
  Link,
  Typography,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { userLoginSchema } from '../schema/user';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: joiResolver(userLoginSchema),
    mode: 'onBlur',
  });

  const login = async (data) => {
    setLoading(true);
    const { status, message } = await loginUser(data);
    setLoading(false);
    if (status === 'success') {
      navigate('/');
      window.location.reload();
    }
    if (status === 'fail' && message === 'username not found') {
      return setError('username', { type: 'custom', message: message });
    }
    if (status === 'fail' && message === 'wrong password') {
      setError('password', { type: 'custom', message: message });
    }
  };

  return (
    <Container>
      <Box
        component="form"
        sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        onSubmit={handleSubmit(login)}
      >
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ fontFamily: 'Satisfy', marginBottom: 1 }}
        >
          Insapgan
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
          error={!!errors.username}
          helperText={errors.username?.message}
          id="username"
          name="username"
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
          sx={{ marginBottom: 1 }}
          {...register('password')}
        />
        <Link
          variant="body1"
          underline="hover"
          sx={{
            alignSelf: 'flex-end',
            marginBottom: 1.2,
            cursor: 'pointer',
            fontWeight: 500,
          }}
          onClick={() => navigate('/forget')}
        >
          Forgot password?
        </Link>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          Log In
        </Button>
        <Typography variant="body1" sx={{ marginTop: 1.3 }}>
          Don't have an account?<span>&nbsp;</span>
          <Link
            variant="body1"
            underline="hover"
            sx={{ cursor: 'pointer', fontWeight: 500 }}
            onClick={() => navigate('/signup')}
          >
            Sign up
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
