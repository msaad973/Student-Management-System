// src/pages/AssignmentPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
    Box, Typography, List, ListItem, ListItemText, Divider,
} from '@mui/material';

const AssignmentPage = () => {
    const location = useLocation();
    const email = location.state?.email;

    const assignments = useSelector(state =>
        state.assignment.filter(item => item.email === email)
    );

    return (
        <Box p={3}  >
            <Typography variant="h4" gutterBottom>
                Assignments
            </Typography>
            {assignments.length === 0 ? (
                <Typography>No assignments found for this student.</Typography>
            ) : (
                <List>
                    {assignments.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem>
                                <ListItemText
                                    primary={`${item.assignment.name} (${item.assignment.subjectCode})`}
                                    secondary={`Marks: ${item.assignment.marks}, 
                    Duration: ${item.assignment.startDate} → ${item.assignment.endDate}`}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default AssignmentPage;
