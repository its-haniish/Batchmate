import { createBrowserRouter } from 'react-router-dom';
import Login from '../screens/auth/Login.jsx'
import Signup from '../screens/auth/Signup.jsx'
import ForgetPass from '../screens/auth/ForgetPass.jsx';
import Home from '../screens/home/Home.jsx';
import AddFeedback from '../screens/feedback/AddFeedback.jsx';
import AllTeachers from '../screens/teachers/AllTeachers.jsx'
import TeacherDetails from '../screens/teachers/TeacherDetails.jsx';
import Profile from "../screens/profile/Profile.jsx"
import Developers from '../screens/developers/Developers.jsx';
import MyFeedbacks from '../screens/feedback/MyFeedbacks.jsx';
import ReportBug from '../screens/reportBug/ReportBug.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Home />
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
    {
        path: "/write-feedback",
        element: <AddFeedback />
    },
    {
        path: "/teachers",
        element: <AllTeachers />
    },
    {
        path: "/teacher-details/:id",
        element: <TeacherDetails />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/developers",
        element: <Developers />
    },
    {
        path: "/feedbacks",
        element: <MyFeedbacks />
    },
    {
        path: "/report-bug",
        element: <ReportBug />
    }
]);

export default router;