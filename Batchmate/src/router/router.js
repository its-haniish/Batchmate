import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../screens/auth/Login.jsx'
import Signup from '../screens/auth/Signup.jsx'
import ForgetPass from '../screens/auth/ForgetPass.jsx';
import Home from '../screens/home/Home.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: "/forget-password",
        element: <ForgetPass />
    },

]);

export default router;