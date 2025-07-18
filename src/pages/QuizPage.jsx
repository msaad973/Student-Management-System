import React from 'react';
import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Card,
    CardContent,
    Divider
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const QuizPage = () => {
    const users = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();

    // Get selected user from navigation state
    const selectedUser = location.state?.user;
    // Find the user in redux state (to get latest quizzes)
    const user = selectedUser
        ? users.find(u => u.id === selectedUser.id)
        : null;

    // Only show quizzes for the selected user
    const allQuizzes = user?.quizzes || [];

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
                {user ? `${user.name}'s Quiz` : 'Quiz'}
            </Typography>
            {allQuizzes.length === 0 ? (
                <Typography>No Quiz found for this student.</Typography>
            ) : (
                <Box>
                    {allQuizzes.map((quiz, index) => (
                        <Card key={index} sx={{ mb: 3, borderRadius: 3, boxShadow: 4, border: '2px solid #555' }}>
                            <CardContent>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Student Name: {quiz.studentName || ''}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Subject: {quiz.subject}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Description: {quiz.description || ''}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Due Date: {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : ''}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Marks: {quiz.marks || 'Not graded'}{quiz.totalMarks ? `/${quiz.totalMarks}` : ''}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Question 1: {quiz.question1 || ''}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Question 2: {quiz.question2 || ''}
                                </Typography>
                            </CardContent>
                            {index < allQuizzes.length - 1 && <Divider />}
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default QuizPage;
