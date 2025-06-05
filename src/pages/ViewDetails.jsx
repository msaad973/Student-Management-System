import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    IconButton,
    Grid,
    AppBar,
    Toolbar,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const ViewDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    return (
        <>
            {/* App Bar */}
            <AppBar position="static" sx={{ mb: 4, bgcolor: '#223037' }} >
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" sx={{ ml: 2 }} >
                        View Student Details
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm">
                <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4, mb: 9, border: '2px solid #555' }}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            mb={3}
                            textAlign="center"
                            bgcolor={'#555'}
                            color={'#fff'}
                            height={50}
                            padding={1}
                            borderRadius={1}
                            

                        >
                            Student Information
                        </Typography>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 2fr)', gap: '28px',position:'relative' }}>
                            {Object.entries(user).map(([key, value]) => (
                                <div className='flex ' key={key}>
                                    <p style={{ fontWeight: 'bold', color: '#666' }}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                                    </p>
                                    <p className='ml-2'>{value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/edit', { state: { user } })}
                                sx={{ textTransform: 'none' }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this record?')) {
                                        navigate(-1);
                                    }
                                }}
                                sx={{ textTransform: 'none' }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};

export default ViewDetails;
