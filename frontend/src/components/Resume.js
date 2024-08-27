/**
 * The `ResumeUploader` component in React allows users to upload a resume file, preview it, and submit it via a form with error handling.
 * @returns The `ResumeUploader` component is being returned. It consists of a form for uploading a resume file, displaying a preview of the uploaded resume (if available), and showing a message indicating the upload status. The component includes form elements, event handlers for file selection and form submission, and styling for responsive display of the resume preview.
 */
import { Button, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const ResumeUploader = () => {
    const [resume, setResume] = useState(null);
    const [resumePreview, setResumePreview] = useState('');
    const [message, setMessage] = useState(null);

    const onChange = (e) => {
        const file = e.target.files[0];
        setResume(file);
        setResumePreview(URL.createObjectURL(file));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('resume', resume);

        try {
            const res = await axios.put(`${process.env.REACT_APP_URI}/api/user/resume`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            setMessage('Resume uploaded successfully');
            setResume(null);
            setResumePreview('');
        } catch (err) {
            console.error(err.response.data);
            setMessage(err.response.data.msg || 'Error uploading resume');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom>
                        Resume Uploader
                    </Typography>
                </Grid>
                {message && (
                    <Grid item xs={12}>
                        <Typography variant="body1" color="textSecondary">
                            {message}
                        </Typography>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <input type="file" name="resume" onChange={onChange} accept=".pdf" />
                            </Grid>
                            {resumePreview && (
                                <Grid item xs={12}>
                                    <Typography variant="body1" gutterBottom>
                                        Resume Preview:
                                    </Typography>
                                    <embed
                                        src={resumePreview}
                                        type="application/pdf"
                                        style={{
                                            border: '1px solid #ddd',
                                            height: '380px',
                                            width: '105%',
                                            // Add responsive styles
                                            '@media (maxWidth: 1200px)': {
                                                height: '300px',
                                                width: '90%',
                                            },
                                            '@media (maxWidth: 992px)': {
                                                height: '250px',
                                                width: '80%',
                                            },
                                            '@media (maxWidth: 768px)': {
                                                height: '200px',
                                                width: '70%',
                                            },
                                            '@media (maxWidth: 576px)': {
                                                height: '150px',
                                                width: '60%',
                                            },
                                        }}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Upload Resume
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ResumeUploader;