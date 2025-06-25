import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Typography
} from '@mui/material';

const QuizModal = ({ open, onClose, onSave, currentUser }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: '',
        dueDate: '',
        priority: 'Medium',
        status: 'Pending',
        marks: '',
        totalMarks: '',
        question1: '',
        question2: '',
        studentName: currentUser?.name || ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Quiz title is required';
        }
        
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }
        
        if (!formData.dueDate) {
            newErrors.dueDate = 'Due date is required';
        }
        
        if (formData.totalMarks && isNaN(formData.totalMarks)) {
            newErrors.totalMarks = 'Total marks must be a number';
        }
        
        if (formData.marks && isNaN(formData.marks)) {
            newErrors.marks = 'Marks must be a number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            onSave(formData);
            handleReset();
        }
    };

    const handleReset = () => {
        setFormData({
            title: '',
            description: '',
            subject: '',
            dueDate: '',
            priority: 'Medium',
            status: 'Pending',
            marks: '',
            totalMarks: '',
            question1: '',
            question2: '',
            studentName: currentUser?.name || ''
        });
        setErrors({});
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    // Update studentName when currentUser changes
    React.useEffect(() => {
        setFormData(prev => ({
            ...prev,
            studentName: currentUser?.name || ''
        }));
    }, [currentUser]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Assign New Quiz
                </Typography>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            name="title"
                            label="Quiz Title"
                            value={formData.title}
                            onChange={handleChange}
                            error={!!errors.title}
                            helperText={errors.title}
                            fullWidth
                            required
                        />
                        
                        <TextField
                            name="subject"
                            label="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                            error={!!errors.subject}
                            helperText={errors.subject}
                            fullWidth
                            required
                        />
                        
                        <TextField
                            name="description"
                            label="Description"
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                        />
                        
                        <TextField
                            name="dueDate"
                            label="Due Date"
                            type="date"
                            value={formData.dueDate}
                            onChange={handleChange}
                            error={!!errors.dueDate}
                            helperText={errors.dueDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            required
                        />
                        
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel>Priority</InputLabel>
                                <Select
                                    name="priority"
                                    value={formData.priority}
                                    label="Priority"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Low">Low</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="High">High</MenuItem>
                                    <MenuItem value="Urgent">Urgent</MenuItem>
                                </Select>
                            </FormControl>
                            
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    name="status"
                                    value={formData.status}
                                    label="Status"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                    <MenuItem value="Overdue">Overdue</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                name="totalMarks"
                                label="Total Marks"
                                type="number"
                                value={formData.totalMarks}
                                onChange={handleChange}
                                error={!!errors.totalMarks}
                                helperText={errors.totalMarks}
                                fullWidth
                            />
                            
                            <TextField
                                name="marks"
                                label="Obtained Marks"
                                type="number"
                                value={formData.marks}
                                onChange={handleChange}
                                error={!!errors.marks}
                                helperText={errors.marks}
                                fullWidth
                            />
                        </Box>

                        <TextField
                            name="question1"
                            label="Question 1"
                            value={formData.question1}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="question2"
                            label="Question 2"
                            value={formData.question2}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="studentName"
                            label="Student Name"
                            value={formData.studentName}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{ readOnly: true }}
                        />
                    </Box>
                </DialogContent>
                
                <DialogActions sx={{ p: 3, pt: 2 }}>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Assign Quiz
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default QuizModal;
