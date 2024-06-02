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
  ]);