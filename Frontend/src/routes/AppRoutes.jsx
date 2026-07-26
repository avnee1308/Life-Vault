import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "../routes/ProtectedRoute";


function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>


                {/* Public Routes */}

                <Route
                    path="/"
                    element={<SignUp />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* Protected Routes */}

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                </Route>


            </Routes>

        </BrowserRouter>

    );

}


export default AppRoutes;