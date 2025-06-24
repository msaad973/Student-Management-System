import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    Box, Container, Typography, Card, CardContent, Button, IconButton, 
    AppBar, Toolbar, Chip, Grid, Divider
} from '@mui/material';
import { ArrowBack, Assignment, Visibility } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteuser, updateuser, addAssignmentToUser } from '../redux/slices/userSlice';
import AssignmentModal from '../components/AssignmentModal';
import EditModal from '../components/EditModal';

const ViewDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams(); 
    const [openModal, setOpenModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);

    const users = useSelector((state) => state.user);
    
    const userId = location.state?.user?.id || params.userId;
    const userIndex = users.findIndex((u) => u.id === userId);
    const user = location.state?.user || users[userIndex];
    
    const currentUser = users[userIndex];

    useEffect(() => {
        if (userIndex === -1 || !user) {
            navigate('/view-details');
        }
    }, [userIndex, user, navigate]); 

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (userIndex !== -1) {
                const originalUser = { ...user };
                delete originalUser.assignments;
                dispatch(updateuser({ index: userIndex, updatedUser: originalUser }));
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [userIndex, user, dispatch]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            dispatch(deleteuser(userIndex));
            navigate('/view-details', { state: { user: currentUser } });
        }
    };

    const handleSaveAssignment = (assignmentData) => {
        dispatch(addAssignmentToUser({ 
            userId: user.id, 
            assignment: assignmentData 
        }));
        setOpenModal(false);
        // Navigate to /assignment and pass assignmentData in state
        // navigate('/assignment', { state: { newAssignment: assignmentData } });
    };

    const handleEditSave = (updatedUser) => {
        dispatch(updateuser({ index: userIndex, updatedUser }));
        setOpenEditModal(false);
    };

    const handleViewAssignments = () => {
        navigate('/assignment', { 
            state: { user: currentUser } 
        });
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Low': return 'success';
            case 'Medium': return 'warning';
            case 'High': return 'error';
            case 'Urgent': return 'error';
            default: return 'default';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'In Progress': return 'info';
            case 'Overdue': return 'error';
            default: return 'default';
        }
    };

    if (!user || userIndex === -1) {
        return (
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6">User not found</Typography>
                    <Button 
                        variant="contained" 
                        onClick={() => navigate('/')}
                        sx={{ mt: 2 }}
                    >
                        Back to Overview
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <>
            <AppBar position="static" sx={{ mb: 4, bgcolor: '#223037' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>
                        View Student Details
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/')}
                        sx={{ textTransform: 'none' }}
                    >
                        Home
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md">
                <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4, mb: 3, border: '2px solid #555' }}>
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

                        <Grid container spacing={3}>
                            {Object.entries(user).filter(([key]) => key !== 'assignments').map(([key, value]) => (
                                <Grid item xs={12} sm={6} key={key}>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                                        </Typography>
                                        <Typography variant="body1">{value}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                            <Button
                                variant="contained"
                                onClick={() => setOpenEditModal(true)}
                                sx={{ textTransform: 'none' }}
                            >
                                Edit Student
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleDelete}
                                sx={{ textTransform: 'none' }}
                            >
                                Delete Student
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<Assignment />}
                                onClick={() => setOpenModal(true)}
                                sx={{ textTransform: 'none', bgcolor: '#4caf50' }}
                            >
                                Add Assignment
                            </Button>
                        </Box>
                    </CardContent>
                </Card>

                <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4, border: '2px solid #555' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                                <Assignment />
                                Assignments ({currentUser?.assignments?.length || 0})
                            </Typography>
                            {currentUser?.assignments?.length > 0 && (
                                <Button
                                    variant="outlined"
                                    startIcon={<Visibility />}
                                    onClick={handleViewAssignments}
                                    sx={{ textTransform: 'none' }}
                                >
                                    View All Assignments
                                </Button>
                            )}
                        </Box>

                        {currentUser?.assignments?.length > 0 ? (
                            <Box>
                                {currentUser.assignments.slice(0, 2).map((assignment, index) => (
                                    <Box key={assignment.id}>
                                        <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {assignment.title}
                                                </Typography>
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Chip 
                                                        label={assignment.priority} 
                                                        color={getPriorityColor(assignment.priority)}
                                                        size="small"
                                                    />
                                                    <Chip 
                                                        label={assignment.status} 
                                                        color={getStatusColor(assignment.status)}
                                                        size="small"
                                                    />
                                                </Box>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                Subject: {assignment.subject}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
                                            </Typography>
                                            {assignment.totalMarks && (
                                                <Typography variant="body2" color="text.secondary">
                                                    Marks: {assignment.marks || 'Not graded'}/{assignment.totalMarks}
                                                </Typography>
                                            )}
                                        </Box>
                                        {index < Math.min(currentUser.assignments.length - 1, 2) && (
                                            <Divider sx={{ my: 2 }} />
                                        )}
                                    </Box>
                                ))}
                                
                                {currentUser.assignments.length > 3 && (
                                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            And {currentUser.assignments.length - 3} more assignments...
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Assignment sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    No Assignments Yet
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    This student hasn't been assigned any assignments yet.
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<Assignment />}
                                    onClick={() => setOpenModal(true)}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Add First Assignment
                                </Button>
                            </Box>
                        )}
                    </CardContent>
                </Card>

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
            </Container>
        </>
    );
};


export default ViewDetails;
