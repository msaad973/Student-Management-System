// src/pages/AssignmentPage.jsx
// import React, { useState } from 'react';
import {
    Box, Typography, Card, CardContent, Chip, Divider, AppBar, Toolbar, IconButton, Button
} from '@mui/material';
import { ArrowBack, SentimentDissatisfied } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const AssignmentPage = () => {
    const users = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();

    // Get selected user from navigation state
    const selectedUser = location.state?.user;

    // Find the user in redux state (to get latest assignments)
    const user = selectedUser
        ? users.find(u => u.id === selectedUser.id)
        : null;

    // Only show assignments for the selected user
    const allAssignments = user?.assignments || [];

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

    return (
        <Box p={3}>
            <AppBar position="static" sx={{ mb: 4, bgcolor: '#223037' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>
                        View Assignment
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
            <Typography variant="h4" gutterBottom>
                {user ? `${user.name}'s Assignments` : 'Assignments'}
            </Typography>
            {allAssignments.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <SentimentDissatisfied sx={{ fontSize: 80, color: '#bbb', mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>No assignments found for this student.</Typography>
                </Box>
            ) : (
                allAssignments.map((assignment, idx) => (
                    <Card key={assignment.id || idx} sx={{ mb: 3, borderRadius: 3, boxShadow: 4, border: '2px solid #555' }}>
                        <CardContent>
                            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {assignment.studentName}
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
                        </CardContent>
                        {idx < allAssignments.length - 1 && <Divider />}
                    </Card>
                ))
            )}
        </Box>
    );
};







export default AssignmentPage;
