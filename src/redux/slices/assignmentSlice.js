import { createSlice } from '@reduxjs/toolkit';

const assignmentSlice = createSlice({
    name: 'assignment',
    initialState: [],
    reducers: {
        addAssignment: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { addAssignment } = assignmentSlice.actions;
export default assignmentSlice.reducer;
