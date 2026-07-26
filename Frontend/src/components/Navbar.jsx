import { NavLink } from "react-router-dom";


function Navbar() {

    const navLinkClass = ({ isActive }) =>
        `px-4 py-2 rounded-lg transition duration-200 ${
            isActive
                ? "bg-blue-600 text-white"
                : "text-slate-700 hover:bg-slate-100"
        }`;


    return (

        <header className="bg-white shadow-md">

            <div className="max-w-7xl mx-auto px-6">

                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}

                    <NavLink
                        to="/dashboard"
                        className="text-2xl font-bold text-blue-600"
                    >
                        🔒 LifeVault
                    </NavLink>


                    {/* Navigation */}

                    <nav className="flex items-center gap-2">

                        <NavLink
                            to="/dashboard"
                            className={navLinkClass}
                        >
                            🏠 Dashboard
                        </NavLink>


                        <NavLink
                            to="/assets"
                            className={navLinkClass}
                        >
                            📦 Assets
                        </NavLink>


                        <NavLink
                            to="/documents"
                            className={navLinkClass}
                        >
                            📄 Documents
                        </NavLink>


                        <NavLink
                            to="/services"
                            className={navLinkClass}
                        >
                            💳 Services
                        </NavLink>

                    </nav>

                </div>

            </div>

        </header>

    );

}


export default Navbar;