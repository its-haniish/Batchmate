import { createReducer } from '@reduxjs/toolkit';
import { getCookie } from "../../utils/cookies.js"


const initialState = {
    isUserLoggedIn: false,
    token: null,
    studentId: null,
    studentName: null
};




export const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('loginUser', (state, action) => {
            state.isUserLoggedIn = true;
            state.token = action.token;
            state.studentId = action.studentId;
            state.studentName = action.studentName;
        })
        .addCase('logoutUser', (state) => {
            state.isUserLoggedIn = false;
            state.token = null;
            state.studentId = null;
            state.studentName = null;
        })
});
