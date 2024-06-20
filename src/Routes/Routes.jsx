import { createBrowserRouter } from "react-router-dom";
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
import Payment from "../Pages/Dashboard/Payment/Payment";
import UpdateParticipantProfile from "../Pages/Dashboard/UpdateParticipantProfile";
import Modal2 from "../Components/Modal2";
import AddedCampDetails from "../Pages/AddedCampDetails";
import Feedbacks from "../Components/Feedbacks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/feedback",
        element: <Feedbacks></Feedbacks>,
      },
      {
        path: "/availableCamps",
        element: <AvailableCamps></AvailableCamps>,
        loader: () =>
          fetch(
            "https://medical-camp-management-server-a12.vercel.app/addedCampsCount"
          ),
      },

      {
        path: "/modal2",
        element: <Modal2></Modal2>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/popularCampDetails/:id",
        element: <PopularCampDetails></PopularCampDetails>,
        loader: () =>
          fetch(
            "https://medical-camp-management-server-a12.vercel.app/popularData"
          ),
      },
      {
        path: "/addedCampsDetails/:id",
        element: <AddedCampDetails></AddedCampDetails>,
        loader: () =>
          fetch(
            "https://medical-camp-management-server-a12.vercel.app/addedCamps"
          ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "analytics",
        element: <Analytics></Analytics>,
      },
      {
        path: "participantProfile",
        element: <ParticipantProfile></ParticipantProfile>,
      },
      {
        path: "registeredCamps",
        element: <RegisteredCamps></RegisteredCamps>,
        loader: () =>
          fetch(
            "https://medical-camp-management-server-a12.vercel.app/registeredCampsCount"
          ),
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "updateParticipantProfile",
        element: <UpdateParticipantProfile></UpdateParticipantProfile>,
      },

      // admin routes
      {
        path: "organizerProfile",
        element: <OrganizerProfile></OrganizerProfile>,
      },
      {
        path: "addCamps",
        element: <AddCamps></AddCamps>,
      },
      {
        path: "manageCamps",
        element: <ManageCamps />,
      },
      {
        path: "manageRegisteredCamps",
        element: <ManageRegisteredCamps></ManageRegisteredCamps>,
      },
      {
        path: "updateOrganizerProfile",
        element: <UpdateOrganizerProfile></UpdateOrganizerProfile>,
      },

      {
        path: "updateCamps/:id",
        element: <UpdateCamps></UpdateCamps>,
        loader: ({ params }) =>
          fetch(
            `https://medical-camp-management-server-a12.vercel.app/addedCamps/${params.id}`
          ),
      },
    ],
  },
]);
