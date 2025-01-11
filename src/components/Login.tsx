import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Stack
} from '@mui/material';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/member');
    } catch (error) {
      setError("error");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box className="glass-panel">
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <div className="form-group">
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { color: '#ffffff' },
            }}
            slotProps={{
              input: {
                style: { color: '#ffffff' },
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: '#ffffff' },
            }}
            slotProps={{
              input: {
                style: { color: '#ffffff' },
              },
            }}
          />
            <div className="line-decoration"></div>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 3 }}
            className="action-btn"
          >
            Sign In
          </Button>
          <Stack direction="row" justifyContent="flex-end">
            <Link to="/signup" style={{ color: 'inherit' }}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Stack>
        </Box>
      </Box>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Container>
  );
}

export default Login;

