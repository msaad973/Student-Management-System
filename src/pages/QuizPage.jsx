import React from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    Divider,
    Grid,
} from '@mui/material';

const QuizPage = () => {
    const quiz = []; // Real data will come here later

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Quiz
            </Typography>
            {quiz.length === 0 ? (
                <Typography>No assignments found for this student.</Typography>
            ) : (
                <List>
                    {quiz.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem alignItems="flex-start">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6">
                                            {/* Name */}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            {/* Subject Code */}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>
                                            {/* Marks */}
                                        </Typography>
                                        <Typography>
                                            {/* Start Date */}
                                        </Typography>
                                        <Typography>
                                            {/* End Date */}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default QuizPage;
