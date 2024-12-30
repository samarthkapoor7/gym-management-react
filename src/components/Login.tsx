import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const auth = getAuth(); 
        try {
          await signInWithEmailAndPassword(auth, email, password);
          navigate('/member');
        } catch (error: any) {
          setError('An unknown error occurred');
        }
      };

    return (
        <Container component="main" maxWidth="xs">
          <div className="glass-panel">
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form onSubmit={handleLogin} style={{ width: '100%', marginTop: '1rem' }}>
            <div className="form-group">
                <TextField
                    variant="outlined"
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
                />
            <div className="line-decoration"></div>
            </div>
            <div className="form-group">
                <TextField
                    variant="outlined"
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
                />
                <div className="line-decoration"></div>
            </div>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="action-btn"
                >
                    Sign In
                </Button>
                <Stack direction="row" justifyContent="flex-end">
                    <Link to="/signup" style={{ marginTop: 15,  color: 'inherit' }}>
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Stack>
            </form>
        </div>
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </Container>
    )
}