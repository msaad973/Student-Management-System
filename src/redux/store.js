import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import assignmentReducer from './slices/assignmentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    assignment: assignmentReducer
  },
});

export default store;