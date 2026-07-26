import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Assets from "../pages/Assets";
import Documents from "../pages/Documents";
import Services from "../pages/Services";

import ProtectedRoute from "./ProtectedRoute";


function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ================= PUBLIC ROUTES ================= */}

                <Route
                    path="/"
                    element={<SignUp />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* ================= PROTECTED ROUTES ================= */}

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/assets"
                        element={<Assets />}
                    />

                    <Route
                        path="/documents"
                        element={<Documents />}
                    />

                    <Route
                        path="/services"
                        element={<Services />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}


export default AppRoutes;