import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import AvailableCamps from "../Pages/AvailableCamps";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ErrorPage from "../Components/ErrorPage";
import PopularCampDetails from "../Pages/PopularCampDetails";
import Dashboard from "../Layout/Dashboard";
import Analytics from "../Pages/Dashboard/Analytics";
import ParticipantProfile from "../Pages/Dashboard/ParticipantProfile";
import RegisteredCamps from "../Pages/Dashboard/RegisteredCamps";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import OrganizerProfile from "../Components/AdminDashBoard/OrganizerProfile";
import AddCamps from "../Components/AdminDashBoard/AddCamps";
import ManageCamps from "../Components/AdminDashBoard/ManageCamps";
import ManageRegisteredCamps from "../Components/AdminDashBoard/ManageRegisteredCamps";
import UpdateOrganizerProfile from "../Components/AdminDashBoard/UpdateOrganizerProfile";
import UpdateCamps from "../Pages/UpdateCamps";
import AddedCampsDetails from "../Pages/AddedCampsDetails";



 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/availableCamps',
            element: <AvailableCamps></AvailableCamps>
        },
      
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/popularCampDetails/:id',
            element: <PopularCampDetails></PopularCampDetails>,
            loader: () => fetch('http://localhost:5000/popularData')
        },
      ]
    },
    {
      path: '/dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: 'analytics',
          element: <Analytics></Analytics>
        },
        {
          path: 'participantProfile',
          element: <ParticipantProfile></ParticipantProfile>
        },
        {
          path: 'registeredCamps',
          element: <RegisteredCamps></RegisteredCamps>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },

        // admin routes
        {
          path: 'organizerProfile',
          element: <OrganizerProfile></OrganizerProfile>
        },
        {
          path: 'addCamps',
          element: <AddCamps></AddCamps>
        },
        {
          path: 'manageCamps',
          element: <ManageCamps></ManageCamps>,
          loader: () => fetch('http://localhost:5000/addedCamps')
        },
        {
          path: 'manageRegisteredCamps',
          element: <ManageRegisteredCamps></ManageRegisteredCamps>
        },
        {
          path: 'updateOrganizerProfile',
          element: <UpdateOrganizerProfile></UpdateOrganizerProfile>
        },
       
        {
          path: "updateCamps/:id",
          element: <UpdateCamps></UpdateCamps>,
          loader: ({params}) => fetch(`http://localhost:5000/addedCamps/${params.id}`)
        },
        { 
            path: "addedCampsDetails/:id",
            element: <AddedCampsDetails></AddedCampsDetails>,
            loader: () => fetch('http://localhost:5000/addedCamps')
        }
      ]
    }
  ]);