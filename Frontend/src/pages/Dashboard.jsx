import Navbar from "../components/Navbar";

function Dashboard() {

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10">

                <h1 className="text-4xl font-bold text-slate-800">
                    Welcome to LifeVault
                </h1>

                <p className="mt-3 text-slate-600">
                    Your personal life management platform.
                </p>

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

