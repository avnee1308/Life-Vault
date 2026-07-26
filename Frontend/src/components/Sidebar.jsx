import {
    FaHome,
    FaBox,
    FaFileAlt,
    FaCreditCard
} from "react-icons/fa";

function Sidebar() {

    return (

        <aside className="w-64 bg-slate-900 text-white min-h-screen">

            <div className="text-2xl font-bold p-6">

                🔒 LifeVault

            </div>

            <nav className="flex flex-col">

                <a className="p-4 hover:bg-slate-800">
                    <FaHome className="inline mr-3" />
                    Dashboard
                </a>

                <a className="p-4 hover:bg-slate-800">
                    <FaBox className="inline mr-3" />
                    Assets
                </a>

                <a className="p-4 hover:bg-slate-800">
                    <FaFileAlt className="inline mr-3" />
                    Documents
                </a>

                <a className="p-4 hover:bg-slate-800">
                    <FaCreditCard className="inline mr-3" />
                    Services
                </a>

            </nav>

        </aside>

    );
}

export default Sidebar;