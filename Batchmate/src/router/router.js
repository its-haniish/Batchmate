import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../screens/auth/Login.jsx'
import Signup from '../screens/auth/Signup.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    }

]);

export default router;