import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";


export const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const auth = getAuth(); 
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
        
            if (user) {
              const db = getFirestore();
              const userRef = doc(collection(db, 'users'), user.uid);
              await setDoc(userRef, {
                name,
                email,
                role: 'member',
              });
            navigate('/member');
            }
        } catch (error) {
            setError("Failed to create an account. Please try again.");
        }
    }

      return (
        <Container component="main" maxWidth="xs">
            <div className="glass-panel">
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form onSubmit={handleSignup} style={{ width: '100%', marginTop: '1rem' }}>
                    <div className="form-group">
                        <TextField
                          variant="outlined"
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
                        />
                        <div className="line-decoration"></div>
                    </div>
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
                          id="password"
                          label="Password"
                          name="password"
                          autoComplete="new-password"
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
                        Sign Up
                    </Button>
                    <Stack direction="row" justifyContent="flex-end">
                        <Link to="/" style={{ marginTop: 15,  color: 'inherit' }}>
                        {"Already have an account? Sign in"}
                        </Link>
                    </Stack>
                </form>
            </div>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </Container>
    )
}