import DashboardLayout from "../layout/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {

    return (

        <DashboardLayout>

            <Sidebar />

            <div className="flex-1 bg-slate-100">

                <Navbar />

                <div className="p-8">

                    <h1 className="text-3xl font-bold">

                        Welcome to LifeVault

                    </h1>

                </div>

            </div>

        </DashboardLayout>

    );
}

export default Dashboard;