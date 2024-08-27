import { Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Attempting login...');
            const response = await axios.post(`${process.env.REACT_APP_URI}/api/auth/login`, { email, password });
            console.log('Login response:', response.data);

            if (response.data.token) {
                console.log('Login successful');
                localStorage.setItem('token', response.data.token);
                setEmail('');
                setPassword('');
                setError(null);
                setIsLoggedIn(true);
                console.log('Fields cleared, attempting navigation...');
                navigate('/resume');
            } else {
                console.log('Login failed: No token received');
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.error || 'An error occurred while logging in');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom>
                        Login
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                        Login
                    </Button>
                </Grid>
                {error && (
                    <Grid item xs={12}>
                        <Typography variant="body2" color="error">
                            {error}
                        </Typography>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;