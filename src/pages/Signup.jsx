import { Button, Container, Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link as LinkRouter } from 'react-router-dom';

export default function Signup() {
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
        noValidate
        autoComplete="off"
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
          id="fullName"
          label="Full name"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id="confirmPassword"
          label="Confirm password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button
          component={LinkRouter}
          to="/signup-photo"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign up
        </Button>
        <Typography variant="body1" sx={{ marginTop: 1.3 }}>
          Already have an account?<span>&nbsp;</span>
          <Link
            component={LinkRouter}
            to="/login"
            variant="body1"
            underline="hover"
          >
            Log in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
