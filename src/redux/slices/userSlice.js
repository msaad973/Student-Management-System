import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        adduser: (state, action) => {
            state.push(action.payload)
        },
        deleteuser: (state, action) => {
            return state.filter((_, index) => index !== action.payload);
        }
        
       
    }


})
export const { adduser, deleteuser, view } = userSlice.actions
export default userSlice.reducer
