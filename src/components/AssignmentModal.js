// components/AssignmentModal.js
import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Grid
} from '@mui/material';

const AssignmentModal = ({ open, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '', subjectCode: '', marks: '', startDate: '', endDate: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(formData);
        setFormData({ name: '', subjectCode: '', marks: '', startDate: '', endDate: '' });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Assignment</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} mt={1}>
                    {['name', 'subjectCode', 'marks', 'startDate', 'endDate'].map(field => (
                        <Grid item xs={12} key={field}>
                            <TextField
                                label={field.replace(/^\w/, c => c.toUpperCase())}
                                name={field}
                                type={field.includes('Date') ? 'date' : 'text'}
                                fullWidth
                                variant="outlined"
                                value={formData[field]}
                                onChange={handleChange}
                                InputLabelProps={field.includes('Date') ? { shrink: true } : {}}
                            />
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssignmentModal;
