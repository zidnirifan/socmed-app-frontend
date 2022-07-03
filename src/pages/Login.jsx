import { Button, Container, Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link as LinkRouter } from 'react-router-dom';

export default function Login() {
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
        noValidate
        autoComplete="off"
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
          id="outlined-basic"
          label="Username"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ marginBottom: 1 }}
        />
        <Link
          component={LinkRouter}
          to="/forget"
          variant="body1"
          underline="hover"
          sx={{ alignSelf: 'flex-end', marginBottom: 1.2 }}
        >
          Forgot password?
        </Link>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Log In
        </Button>
        <Typography variant="body1" sx={{ marginTop: 1.3 }}>
          Don't have an account?<span>&nbsp;</span>
          <Link
            component={LinkRouter}
            to="/signup"
            variant="body1"
            underline="hover"
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
