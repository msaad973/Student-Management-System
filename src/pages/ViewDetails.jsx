import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box, Container, Typography, Card, CardContent, Button, IconButton, AppBar, Toolbar
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteuser, updateuser } from '../redux/slices/userSlice';
import AssignmentModal from '../components/AssignmentModal';
import { addAssignment } from '../redux/slices/assignmentSlice';
import EditModal from '../components/EditModal';

const ViewDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);

    const user = location.state?.user;
    const users = useSelector((state) => state.user);
    const userIndex = users.findIndex((u) => u.email === user.email);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            dispatch(deleteuser(userIndex));
            navigate('/overview');
        }
    };

    const handleSaveAssignment = (assignmentData) => {
        dispatch(addAssignment({ email: user.email, assignment: assignmentData }));
        setOpenModal(false);
    };

    const handleEditSave = (updatedUser) => {
        dispatch(updateuser({ index: userIndex, updatedUser }));
        setOpenEditModal(false);
    };

    return (
        <>
            <AppBar position="static" sx={{ mb: 4, bgcolor: '#223037' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" sx={{ ml: 2 }}>
                        View Student Details...
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

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 2fr)', gap: '28px' }}>
                            {Object.entries(user).map(([key, value]) => (
                                <div key={key}>
                                    <p style={{ fontWeight: 'bold', color: '#666' }}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                                    </p>
                                    <p>{value}</p>
                                </div>
                            ))}
                        </div>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                            <Button
                                variant="contained"
                                onClick={() => setOpenEditModal(true)}
                                sx={{ textTransform: 'none' }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleDelete}
                                sx={{ textTransform: 'none' }}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => setOpenModal(true)}
                                sx={{ textTransform: 'none' }}
                            >
                                Add Assignment
                            </Button>

                            <AssignmentModal
                                open={openModal}
                                onClose={() => setOpenModal(false)}
                                onSave={handleSaveAssignment}
                            />

                            <EditModal
                                open={openEditModal}
                                onClose={() => setOpenEditModal(false)}
                                user={user}
                                userIndex={userIndex}
                                onSave={handleEditSave}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};

export default ViewDetails;
