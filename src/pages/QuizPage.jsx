import React from 'react'
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material'

const QuizPage = () => {
    // MOCK quiz data (replace with real data later)
    const quiz = [
        {
            assignment: {
                name: 'Math Quiz 1',
                subjectCode: 'MATH101',
                marks: 20,
                startDate: '2025-06-10',
                endDate: '2025-06-12',
            },
        },
        {
            assignment: {
                name: 'Science Assignment',
                subjectCode: 'SCI202',
                marks: 25,
                startDate: '2025-06-11',
                endDate: '2025-06-13',
            },
        },
    ]

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
                            <ListItem>
                                <ListItemText
                                    primary={`${item.assignment.name} (${item.assignment.subjectCode})`}
                                    secondary={`Marks: ${item.assignment.marks}, Duration: ${item.assignment.startDate} → ${item.assignment.endDate}`}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            )}
        </Box>
    )
}

export default QuizPage
