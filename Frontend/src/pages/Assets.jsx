import Navbar from "../components/Navbar";


function Assets() {

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10">

                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-slate-800">
                            My Assets
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Manage and keep track of everything you own.
                        </p>

                    </div>


                    <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition">
                        + Add Asset
                    </button>

                </div>


                {/* Empty State */}

                <div className="bg-white rounded-xl shadow-sm p-12 text-center">

                    <div className="text-5xl mb-4">
                        📦
                    </div>

                    <h2 className="text-xl font-semibold text-slate-700">
                        No assets yet
                    </h2>

                    <p className="text-slate-500 mt-2">
                        Start by adding your first asset to LifeVault.
                    </p>

                </div>

            </main>

        </div>

    );

}


export default Assets;