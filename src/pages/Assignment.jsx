// src/pages/AssignmentPage.jsx
import React from 'react';
import {
    Box, Typography,
} from '@mui/material';

const AssignmentPage = () => {
    return (
        <Box p={3}  >
            <Typography variant="h4" gutterBottom>
                Assignments
            </Typography>
            <Typography>No assignments found for this student.</Typography>
        </Box>
    );
};

export default AssignmentPage;
