import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        adduser: (state, action) => {
            console.log('action', action.payload);
            // Initialize assignments array for new user
            const newUser = {
                ...action.payload,
                assignments: []
            };
            state.push(newUser);
        },
        deleteuser: (state, action) => {
            return state.filter((_, index) => index !== action.payload);
        },
        updateuser: (state, action) => {
            const { index, updatedUser } = action.payload;
            if (index !== -1) {
                const prevUser = state[index];
                // Merge quizzes arrays if both exist, otherwise use whichever exists
                let mergedQuizzes = [];
                if (prevUser.quizzes && updatedUser.quizzes) {
                    // Merge and deduplicate by some unique property if needed
                    mergedQuizzes = [...prevUser.quizzes, ...updatedUser.quizzes.filter(q => !prevUser.quizzes.some(pq => JSON.stringify(pq) === JSON.stringify(q)))];
                } else {
                    mergedQuizzes = updatedUser.quizzes || prevUser.quizzes || [];
                }
                state[index] = {
                    ...prevUser,
                    ...updatedUser,
                    quizzes: mergedQuizzes
                };
            }
        },
        addAssignmentToUser: (state, action) => {
            const { userId, assignment } = action.payload;
            const user = state.find(u => u.id === userId);
            if (user) {
                if (!user.assignments) {
                    user.assignments = [];
                }
                user.assignments.push({
                    ...assignment,
                    id: Date.now(), 
                    assignedDate: new Date().toISOString()
                });
            }
        },
        removeAssignmentFromUser: (state, action) => {
            const { userId, assignmentId } = action.payload;
            const user = state.find(u => u.id === userId);
            if (user && user.assignments) {
                user.assignments = user.assignments.filter(a => a.id !== assignmentId);
            }
        },
        updateAssignmentStatus: (state, action) => {
            const { userId, assignmentId, status } = action.payload;
            const user = state.find(u => u.id === userId);
            if (user && user.assignments) {
                const assignment = user.assignments.find(a => a.id === assignmentId);
                if (assignment) {
                    assignment.status = status;
                    assignment.updatedDate = new Date().toISOString();
                }
            }
        }
    }
});

export const { 
    adduser, 
    deleteuser, 
    updateuser, 
    addAssignmentToUser, 
    removeAssignmentFromUser, 
    updateAssignmentStatus 
} = userSlice.actions;

export default userSlice.reducer;
