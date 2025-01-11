import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Container, Typography, TextField, Button, Box, Stack } from '@mui/material';
import { FirebaseError } from 'firebase/app';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      // Create the user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user details to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        role: 'member',
      });

      // Automatically sign in the user
      await signInWithEmailAndPassword(auth, email, password);

      // Navigate to the member dashboard
      navigate('/member');
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError('This email is already in use. Please try a different one.');
            break;
          case 'auth/invalid-email':
            setError('Invalid email address. Please check and try again.');
            break;
          case 'auth/weak-password':
            setError('Password is too weak. It should be at least 6 characters long.');
            break;
          default:
            setError('An error occurred during signup. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box className="glass-panel">
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
          <div className="form-group">
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{
                style: { color: '#ffffff' },
              }}
              InputProps={{
                style: { color: '#ffffff' },
              }}
            />
            <div className="line-decoration"></div>
          </div>
          <div className="form-group">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{
                style: { color: '#ffffff' },
              }}
              InputProps={{
                style: { color: '#ffffff' },
              }}
            />
            <div className="line-decoration"></div>
          </div>
          <div className="form-group">
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                style: { color: '#ffffff' },
              }}
              InputProps={{
                style: { color: '#ffffff' },
              }}
            />
            <div className="line-decoration"></div>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className="action-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </Button>
          <Stack direction="row" justifyContent="flex-end">
            <Link to="/" style={{ color: 'inherit' }}>
              Already have an account? Sign in
            </Link>
          </Stack>
        </Box>
      </Box>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Container>
  );
};

export default Signup;

