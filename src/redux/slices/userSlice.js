import React from 'react'
import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        adduser: (state, action) => {
            console.log('action', action.payload);
            state.push(action.payload)
        },
        deleteuser: (state, action) => {
            return state.filter((_, index) => index !== action.payload);
        },
        updateuser: (state, action) => {
            const { index, updatedUser } = action.payload;
            state[index] = updatedUser;
        }
    }
});

export const { adduser, deleteuser, view, updateuser } = userSlice.actions
export default userSlice.reducer
