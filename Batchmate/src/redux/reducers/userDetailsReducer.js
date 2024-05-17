import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    _id: null,
    name: null,
    email: null,
    rollNo: null,
    image: null
};

export const userDetailsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('saveUserData', (state, action) => {
            state._id = action._id;
            state.name = action.name;
            state.email = action.email;
            state.image = action.image;
            state.rollNo = action.rollNo;
        })
        .addCase('deleteUserData', (state) => {
            state._id = null;
            state.name = null;
            state.email = null;
            state.image = null;
            state.rollNo = null;
        })
});
