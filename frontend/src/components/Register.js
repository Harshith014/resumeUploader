import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState(null);
    const { name, email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_URI}/api/auth/register`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setMessage('Registration successful');
            console.log('Token:', res.data.token);
            navigate('/login');
        } catch (err) {
            console.error(err.response.data);
            setMessage(err.response.data.msg || 'Registration failed');
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                py: 4,
                // Responsive design
                '@media (max-width: 600px)': {
                    py: 2,
                },
                '@media (max-width: 400px)': {
                    py: 1,
                },
            }}
        >
            <Typography
                variant="h2"
                gutterBottom
                sx={{
                    fontSize: '3.75rem', // default font size
                    '@media (max-width: 425px)': { // L-425px
                        fontSize: '2.75rem',
                    },
                    '@media (max-width: 375px)': { // M-375px
                        fontSize: '2.75rem',
                    },
                    '@media (max-width: 320px)': { // S-320px
                        fontSize: '2.75rem',
                    },
                }}
            >
                Register
            </Typography>
            {message && (
                <Typography variant="body1" color="error" gutterBottom>
                    {message}
                </Typography>
            )}
            <Box
                component="form"
                onSubmit={onSubmit}
                noValidate
                sx={{
                    mt: 1,
                    // Responsive design
                    '@media (max-width: 600px)': {
                        mt: 0.5,
                    },
                    '@media (max-width: 400px)': {
                        mt: 0,
                    },
                }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    autoComplete="off"
                    sx={{
                        // Responsive design
                        '@media (max-width: 600px)': {
                            fontSize: '1rem',
                        },
                        '@media (max-width: 400px)': {
                            fontSize: '0.9rem',
                        },
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    autoComplete="off"
                    sx={{
                        // Responsive design
                        '@media (max-width: 600px)': {
                            fontSize: '1rem',
                        },
                        '@media (max-width: 400px)': {
                            fontSize: '0.9rem',
                        },
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    autoComplete="off"
                    type="password"
                    sx={{
                        // Responsive design
                        '@media (max-width: 600px)': {
                            fontSize: '1rem',
                        },
                        '@media (max-width: 400px)': {
                            fontSize: '0.9rem',
                        },
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        // Responsive design
                        '@media (max-width: 600px)': {
                            mt: 2,
                            mb: 1,
                        },
                        '@media (max-width: 400px)': {
                            mt: 1,
                            mb: 0.5,
                        },
                    }}
                >
                    Register
                </Button>
                <Link href="/login" variant="body2">
                    Already have an account? Login
                </Link>
            </Box>
        </Container>
    );
};

export default Register;