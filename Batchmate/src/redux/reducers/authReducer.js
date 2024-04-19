import { createReducer } from '@reduxjs/toolkit';
import { getCookie } from "../../utils/cookies.js"


const initialState = {
    token: JSON.parse(getCookie("batchmate")).token || null,
    studentId: JSON.parse(getCookie("batchmate")).studentId || null,
    studentName: JSON.parse(getCookie("batchmate")).studentName || null
};




export const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('loginUser', (state, action) => {
            state.token = action.token;
            state.studentId = action.studentId;
            state.studentName = action.studentName;
        })
        .addCase('logoutUser', (state) => {
            state.token = null;
            state.studentId = null;
            state.studentName = null;
        })
});
