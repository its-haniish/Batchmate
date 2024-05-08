import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    teachers: null
};

export const allTeachersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('saveAllTeachers', (state, action) => {
            state.teachers = action.teachers;
        })
        .addCase('deleteAllTeachers', (state) => {
            state.teachers = [];
        })
});
