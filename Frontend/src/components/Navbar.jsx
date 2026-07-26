import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./Navbar.css";


function Navbar() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();


    const firstName =
        user?.profile?.name?.first ||
        user?.name?.first ||
        user?.first ||
        user?.username ||
        "User";


    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    return (

        <header className="navbar">

            <div className="navbar-inner">


                {/* LOGO */}

                <NavLink
                    to="/dashboard"
                    className="navbar-logo"
                >

                    <span className="navbar-logo-icon">
                        🔒
                    </span>

                    <span className="navbar-logo-text">
                        LifeVault
                    </span>

                </NavLink>



                {/* NAVIGATION */}

                <nav className="navbar-links">

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `navbar-link ${isActive ? "active" : ""}`
                        }
                    >

                        <span>🏠</span>

                        <span>
                            Dashboard
                        </span>

                    </NavLink>


                    <NavLink
                        to="/assets"
                        className={({ isActive }) =>
                            `navbar-link ${isActive ? "active" : ""}`
                        }
                    >

                        <span>📦</span>

                        <span>
                            Assets
                        </span>

                    </NavLink>


                    <NavLink
                        to="/documents"
                        className={({ isActive }) =>
                            `navbar-link ${isActive ? "active" : ""}`
                        }
                    >

                        <span>📄</span>

                        <span>
                            Documents
                        </span>

                    </NavLink>


                    <NavLink
                        to="/services"
                        className={({ isActive }) =>
                            `navbar-link ${isActive ? "active" : ""}`
                        }
                    >

                        <span>💳</span>

                        <span>
                            Services
                        </span>

                    </NavLink>

                </nav>



                {/* RIGHT SIDE */}

                <div className="navbar-right">

                    <span className="navbar-user">
                        Hi, {firstName}
                    </span>

                    <button
                        className="navbar-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>


            </div>

        </header>

    );

}


export default Navbar;