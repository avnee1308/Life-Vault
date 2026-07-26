import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";

import "./Dashboard.css";


function Dashboard() {

    const { user } = useAuth();

    const firstName =
        user?.profile?.name?.first ||
        user?.name?.first ||
        user?.first ||
        user?.username ||
        "there";


    return (

        <div className="dashboard-page">

            <Navbar />


            <main className="dashboard-main">


                {/* =========================
                    WELCOME
                ========================== */}

                <section className="dashboard-welcome">

                    <h1>
                        Welcome back, {firstName} 👋
                    </h1>

                    <p>
                        Here's what's happening in your LifeVault.
                    </p>

                </section>



                {/* =========================
                    STATISTICS
                ========================== */}

                <section className="stats-grid">


                    {/* ASSETS */}

                    <Link
                        to="/assets"
                        className="stat-card"
                    >

                        <div className="stat-card-top">

                            <div>

                                <p className="stat-card-label">
                                    Total Assets
                                </p>

                                <h2 className="stat-card-number">
                                    0
                                </h2>

                            </div>


                            <div className="stat-card-icon">
                                📦
                            </div>

                        </div>


                        <span className="stat-card-link">
                            View assets →
                        </span>

                    </Link>



                    {/* DOCUMENTS */}

                    <Link
                        to="/documents"
                        className="stat-card"
                    >

                        <div className="stat-card-top">

                            <div>

                                <p className="stat-card-label">
                                    Total Documents
                                </p>

                                <h2 className="stat-card-number">
                                    0
                                </h2>

                            </div>


                            <div className="stat-card-icon">
                                📄
                            </div>

                        </div>


                        <span className="stat-card-link">
                            View documents →
                        </span>

                    </Link>



                    {/* SERVICES */}

                    <Link
                        to="/services"
                        className="stat-card"
                    >

                        <div className="stat-card-top">

                            <div>

                                <p className="stat-card-label">
                                    Services & Subscriptions
                                </p>

                                <h2 className="stat-card-number">
                                    0
                                </h2>

                            </div>


                            <div className="stat-card-icon">
                                💳
                            </div>

                        </div>


                        <span className="stat-card-link">
                            View services →
                        </span>

                    </Link>

                </section>



                {/* =========================
                    QUICK ACTIONS
                ========================== */}

                <section className="quick-actions">


                    <div className="quick-actions-header">

                        <h2>
                            Quick Actions
                        </h2>

                        <p>
                            Quickly add something to your LifeVault.
                        </p>

                    </div>



                    <div className="actions-grid">


                        {/* ADD ASSET */}

                        <Link
                            to="/assets"
                            className="action-card action-card-blue"
                        >

                            <div className="action-card-icon">
                                📦
                            </div>

                            <h3>
                                Add an Asset
                            </h3>

                            <p>
                                Keep track of something you own.
                            </p>

                        </Link>



                        {/* DOCUMENT */}

                        <Link
                            to="/documents"
                            className="action-card action-card-dark"
                        >

                            <div className="action-card-icon">
                                📄
                            </div>

                            <h3>
                                Upload Document
                            </h3>

                            <p>
                                Store an important document securely.
                            </p>

                        </Link>



                        {/* SERVICE */}

                        <Link
                            to="/services"
                            className="action-card action-card-green"
                        >

                            <div className="action-card-icon">
                                💳
                            </div>

                            <h3>
                                Add a Service
                            </h3>

                            <p>
                                Track a subscription or recurring bill.
                            </p>

                        </Link>


                    </div>

                </section>


            </main>

        </div>

    );

}


export default Dashboard;

// import DashboardLayout from "../layout/DashboardLayout";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// function Dashboard() {

//     return (

//         <DashboardLayout>

//             <Sidebar />

//             <div className="flex-1 bg-slate-100">

//                 <Navbar />

//                 <div className="p-8">

//                     <h1 className="text-3xl font-bold">

//                         Welcome to LifeVault

//                     </h1>

//                 </div>

//             </div>

//         </DashboardLayout>

//     );
// }

// export default Dashboard;

