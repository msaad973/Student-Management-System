import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box, Container, Typography, Card, CardContent, Button, IconButton,
    AppBar, Toolbar, Chip, Grid, TextField, Select, MenuItem, FormControl,
    InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Alert
} from '@mui/material';
import {
    ArrowBack, Assignment, Delete, Add, Search
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
    removeAssignmentFromUser,
    updateAssignmentStatus,
    addAssignmentToUser
} from '../redux/slices/userSlice';
import AssignmentModal from '../components/AssignmentModal';

const StudentAssignments = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');

    const user = location.state?.user;
    const users = useSelector((state) => state.user);
    const currentUser = users.find(u => u.id === user.id);

    if (!currentUser) {
        return (
            <Container>
                <Alert severity="error">Student not found!</Alert>
            </Container>
        );
    }

    const assignments = currentUser.assignments || [];

    // Filter assignments
    const filteredAssignments = assignments.filter(assignment => {
        const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || assignment.status === statusFilter;
        const matchesPriority = priorityFilter === 'All' || assignment.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const handleDeleteAssignment = (assignment) => {
        setSelectedAssignment(assignment);
        setOpenDeleteDialog(true);
    };

    const confirmDelete = () => {
        dispatch(removeAssignmentFromUser({
            userId: currentUser.id,
            assignmentId: selectedAssignment.id
        }));
        setOpenDeleteDialog(false);
        setSelectedAssignment(null);
    };

    const handleStatusChange = (assignmentId, newStatus) => {
        dispatch(updateAssignmentStatus({
            userId: currentUser.id,
            assignmentId: assignmentId,
            status: newStatus
        }));
    };

    const handleAddAssignment = (assignmentData) => {
        dispatch(addAssignmentToUser({
            userId: currentUser.id,
            assignment: assignmentData
        }));
        setOpenModal(false);
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

    const getAssignmentStats = () => {
        const total = assignments.length;
        const completed = assignments.filter(a => a.status === 'Completed').length;
        const pending = assignments.filter(a => a.status === 'Pending').length;
        const overdue = assignments.filter(a => a.status === 'Overdue').length;

        return { total, completed, pending, overdue };
    };

    const stats = getAssignmentStats();

    return (
        <>
            <AppBar position="static" sx={{ mb: 4, bgcolor: '#223037' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" sx={{ ml: 2 }}>
                        {currentUser.name} Assignments
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg">
                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#f3f4f6', textAlign: 'center', p: 2 }}>
                            <Typography variant="h4" color="primary" fontWeight="bold">
                                {stats.total}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Total Assignments
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#e8f5e8', textAlign: 'center', p: 2 }}>
                            <Typography variant="h4" color="success.main" fontWeight="bold">
                                {stats.completed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Completed
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#fff3cd', textAlign: 'center', p: 2 }}>
                            <Typography variant="h4" color="warning.main" fontWeight="bold">
                                {stats.pending}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Pending
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#f8d7da', textAlign: 'center', p: 2 }}>
                            <Typography variant="h4" color="error.main" fontWeight="bold">
                                {stats.overdue}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Overdue
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>

                {/* Filters and Search */}
                <Card sx={{ p: 3, mb: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                        <TextField
                            placeholder="Search assignments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                            }}
                            sx={{ minWidth: 250 }}
                        />

                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={statusFilter}
                                label="Status"
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <MenuItem value="All">All Status</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="Overdue">Overdue</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={priorityFilter}
                                label="Priority"
                                onChange={(e) => setPriorityFilter(e.target.value)}
                            >
                                <MenuItem value="All">All Priority</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                                <MenuItem value="Urgent">Urgent</MenuItem>
                            </Select>
                        </FormControl>

                        <Box sx={{ ml: 'auto' }}>
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => setOpenModal(true)}
                                sx={{ textTransform: 'none' }}
                            >
                                Add Assignment
                            </Button>
                        </Box>
                    </Box>
                </Card>

                {/* Assignments List */}
                {filteredAssignments.length > 0 ? (
                    <Grid container spacing={3}>
                        {filteredAssignments.map((assignment) => (
                            <Grid item xs={12} md={6} lg={4} key={assignment.id}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
                                                {assignment.title}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDeleteAssignment(assignment)}
                                                    color="error"
                                                >
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Box>

                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            <strong>Subject:</strong> {assignment.subject}
                                        </Typography>

                                        {assignment.description && (
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                {assignment.description}
                                            </Typography>
                                        )}

                                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
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

                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            <strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}
                                        </Typography>

                                        {assignment.totalMarks && (
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                <strong>Marks:</strong> {assignment.marks || 'Not graded'}/{assignment.totalMarks}
                                            </Typography>
                                        )}

                                        <Typography variant="caption" color="text.secondary">
                                            Assigned: {new Date(assignment.assignedDate).toLocaleDateString()}
                                        </Typography>
                                    </CardContent>

                                    <Box sx={{ p: 2, pt: 0 }}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Update Status</InputLabel>
                                            <Select
                                                value={assignment.status}
                                                label="Update Status"
                                                onChange={(e) => handleStatusChange(assignment.id, e.target.value)}
                                            >
                                                <MenuItem value="Pending">Pending</MenuItem>
                                                <MenuItem value="In Progress">In Progress</MenuItem>
                                                <MenuItem value="Completed">Completed</MenuItem>
                                                <MenuItem value="Overdue">Overdue</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Card sx={{ p: 4, textAlign: 'center' }}>
                        <Assignment sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No Assignments Found
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {assignments.length === 0
                                ? "This student hasn't been assigned any assignments yet."
                                : "No assignments match your current filters."
                            }
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setOpenModal(true)}
                            sx={{ textTransform: 'none' }}
                        >
                            Add Assignment
                        </Button>
                    </Card>
                )}

                {/* Add Assignment Modal */}
                <AssignmentModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    onSave={handleAddAssignment}
                />

                {/* Delete Confirmation Dialog */}
                <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete the assignment "{selectedAssignment?.title}"?
                            This action cannot be undone.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDeleteDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={confirmDelete} color="error" variant="contained">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
};

export default StudentAssignments;
