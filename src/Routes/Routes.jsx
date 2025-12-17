import { createBrowserRouter} from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
        {
            path:'/',
            Component: Home
        },
        {
            path:'/login',
            Component: Login
        },
        {
            path:'/register',
            Component: Register
        }
    ]
  },
  // Routes for Dashboard
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children:[
      {
        path:'main',
        element: <MainDashboard></MainDashboard>
      }
    ]
  }
]);

export default router;