import React, { useState, useEffect } from 'react';
import {
    Modal, Box, Typography, TextField, Button
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
   overflow: "auto"
};

const EditModal = ({ open, onClose, user,  onSave }) => {
    const [formData, setFormData] = useState(user || {});

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography variant="h6" mb={2}>Edit Student</Typography>
                {Object.entries(formData).map(([key, value]) => (
                    <TextField
                        key={key}
                        name={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={value}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                ))}
                <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Save</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditModal;
