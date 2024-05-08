import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { userDetailsReducer } from './reducers/userDetailsReducer'
import { allTeachersReducer } from './reducers/allTeachersReducer'

const store = configureStore({
    reducer: {
        authReducer, userDetailsReducer, allTeachersReducer
    }
})

export default store;