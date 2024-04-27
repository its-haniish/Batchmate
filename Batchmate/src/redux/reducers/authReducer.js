import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    isUserLoggedIn: false,
    token: null
};

export const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('loginUser', (state, action) => {
            state.isUserLoggedIn = true;
            state.token = action.token;
        })
        .addCase('logoutUser', (state) => {
            state.isUserLoggedIn = false;
            state.token = null;
        })
});
