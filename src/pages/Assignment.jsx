// src/pages/AssignmentPage.jsx
import React, { useState } from 'react';
import {
    Box, Typography, Card, CardContent, Chip, Divider, AppBar, Toolbar, IconButton, Button
} from '@mui/material';
import { ArrowBack, Search } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AssignmentPage = () => {
    const users = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    // Collect all assignments from all users
    const allAssignments = users.flatMap(u => u.assignments || []);

    // Filter assignments by student name
    const filteredAssignments = allAssignments.filter(a =>
        a.studentName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                Assignments
            </Typography>
            {/* Search Bar */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', maxWidth: 600 }}>
                <Search sx={{ mr: 1, color: 'text.secondary' }} />
                <input
                    type="text"
                    placeholder="Search by student name..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        outline: 'none',
                        fontSize: '1.1rem'
                    }}
                />
            </Box>
            {filteredAssignments.length === 0 ? (
                <Typography>No assignments found for this student.</Typography>
            ) : (
                filteredAssignments.map((assignment, idx) => (
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
