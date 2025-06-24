import React from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    Divider,
    Grid,
    AppBar,
    Toolbar,
    IconButton,
    Button
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
    const quiz = [];
    const navigate = useNavigate();

    return (
        <Box p={3}>
            <AppBar position="static" sx={{ mb: 4, bgcolor: '#223037' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>
                        View Quiz
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
                Quiz
            </Typography>
            {quiz.length === 0 ? (
                <Typography>No Quiz found for this student.</Typography>
            ) : (
                <List>
                    {quiz.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem alignItems="flex-start">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6">
                                        </Typography>
                                        <Typography color="textSecondary">
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>
                                        </Typography>
                                        <Typography>
                                        </Typography>
                                        <Typography>
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
