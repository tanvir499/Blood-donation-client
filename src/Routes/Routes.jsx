import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import AddRequest from "../Pages/Dashboard/AddRequest/AddRequest";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "../Routes/PrivateRoute";
import MyRequest from "../Pages/Dashboard/MyRequest/MyRequest";
import Donate from "../Pages/Donate/Donate";
import PaymentSuccess from "../Pages/Home/PaymentSuccess/PaymentSuccess";
import Search from "../Pages/Search/Search";
import DonationRequest from "../Pages/DonationRequest/DonationRequest";
import DonationRequestDetails from "../Pages/DonationRequestDetails/DonationRequestDetails";
import DonorDashboard from "../Pages/Dashboard/DonorDashboard/DonorDashboard";
import VolunteerDashboard from "../Pages/Dashboard/VolunteerDashboard/VolunteerDashboard";
import Volunteers from "../Pages/Volunteers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/donate",
        Component: Donate,
      },
      {
        path: "/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "/donation-Request",
        Component: DonationRequest,
      },
      {
        path: "/donation-request/:id",
        Component: DonationRequestDetails,
      },
      {
        path: "search",
        Component: Search,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/volunteers",
        element: <Volunteers></Volunteers>,
      },
    ],
  },
  // Routes for Dashboard
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <MainDashboard></MainDashboard>,
      },
      {
        path: "add-request",
        element: <AddRequest></AddRequest>,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "my-request",
        element: <MyRequest></MyRequest>,
      },
      {
        path: "donation-requests",
        element: <DonorDashboard></DonorDashboard>,
      },
      {
        path: "volunteer-dashboard",
        element: <VolunteerDashboard></VolunteerDashboard>,
      },
    ],
  },
]);

export default router;
