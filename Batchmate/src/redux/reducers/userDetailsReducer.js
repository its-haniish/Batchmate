import { createReducer } from '@reduxjs/toolkit';
import Feedback from '../../components/feedback/Feedback';

const initialState = {
    _id: null,
    name: null,
    email: null,
    rollNo: null,
    image: "",
    feedbacks: [],
    liked: []
};

export const userDetailsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('saveUserData', (state, action) => {
            state._id = action._id;
            state.name = action.name;
            state.email = action.email;
            state.image = action.image;
            state.rollNo = action.rollNo;
            state.feedbacks = action.feedbacks;
            state.liked = action.liked;
        })
        .addCase('updateName', (state, action) => {
            state.name = action.name;
        })
        .addCase('updateImage', (state, action) => {
            state.image = action.image;
        })
        .addCase('deleteUserData', (state) => {
            state._id = null;
            state.name = null;
            state.email = null;
            state.image = null;
            state.rollNo = null;
            state.feedbacks = [];
            state.liked = [];
        })
});
