import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        adduser: (state, action) => {
            const exists = state.find(user => user.id === action.payload.id);
            if (!exists) {
                const newUser = {
                    ...action.payload,
                    assignments: [],
                    quizzes: []
                };
                state.push(newUser);
            }
        },

        deleteuser: (state, action) => {
            return state.filter((_, index) => index !== action.payload);
        },

        updateuser: (state, action) => {
            const { index, updatedUser } = action.payload;
            const prevUser = state[index];

            if (prevUser) {
                const mergeUnique = (oldArr = [], newArr = []) => {
                    return [
                        ...oldArr,
                        ...newArr.filter(
                            item => !oldArr.some(oldItem => JSON.stringify(oldItem) === JSON.stringify(item))
                        )
                    ];
                };

                const mergedUser = {
                    ...prevUser,
                    ...updatedUser,
                    quizzes: mergeUnique(prevUser.quizzes, updatedUser.quizzes),
                    assignments: mergeUnique(prevUser.assignments, updatedUser.assignments)
                };

                state[index] = mergedUser;
            }
        },

        addAssignmentToUser: (state, action) => {
            const { userId, assignment } = action.payload;
            const user = state.find(u => u.id === userId);

            if (user) {
                user.assignments = user.assignments || [];
                user.assignments.push({
                    ...assignment,
                    id: Date.now(),
                    assignedDate: new Date().toISOString(),
                    status: 'pending'
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

            if (user?.assignments) {
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
