/**
 * The UserProfile component in React manages user profile data including name, email, and profile image with the ability to update and display the information.
 * @returns The `UserProfile` component is being returned. It is a functional component in React that displays a user profile form where users can update their name, email, and profile image. The component includes form fields for name, email, and profile image upload, along with a preview of the selected image. Upon submission of the form, the user's profile information is updated via an API call using Axios. The
 */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserProfile = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        profileImage: null,
        profileImagePreview: '',
        selectedImagePreview: ''
    });

    const [message, setMessage] = useState(null);
    const { name, email, profileImagePreview, selectedImagePreview } = userData;

/* The `useEffect` hook in the `UserProfile` component is responsible for fetching the user data when the component mounts for the first time. Here's a breakdown of what the `useEffect` block is doing: */
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_URI}/api/user`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                setUserData({
                    ...res.data,
                    profileImagePreview: res.data.image,
                    selectedImagePreview: ''
                });
            } catch (err) {
                console.error(err.response.data);
            }
        };

        fetchUserData();
    }, []);

    const onChange = (e) => {
        if (e.target.name === 'profileImage') {
            const file = e.target.files[0];
            setUserData({
                ...userData,
                profileImage: file,
                selectedImagePreview: URL.createObjectURL(file)
            });
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if (userData.profileImage) formData.append('image', userData.profileImage);

        try {
            const res = await axios.put(`${process.env.REACT_APP_URI}/api/user`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            setMessage('Profile updated successfully');
            setUserData({
                ...res.data,
                profileImagePreview: res.data.image,
                selectedImagePreview: ''
            });
        } catch (err) {
            console.error(err.response.data);
            setMessage(err.response.data.msg || 'Error updating profile');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h2>User Profile</h2>
            {message && <p>{message}</p>}
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <div style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: 'auto',
                        border: '2px solid #007bff'
                    }}>
                        <img
                            src={selectedImagePreview || profileImagePreview || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <input
                        type="file"
                        name="profileImage"
                        onChange={onChange}
                        accept="image/*"
                        style={{ marginTop: '10px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default UserProfile;