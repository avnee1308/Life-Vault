import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AddService from "../components/AddService";

import {
    getServices,
    deleteService
} from "../api/service.api";

function Services() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddModal, setShowAddModal] = useState(false);

    const fetchServices = async () => {
        try {

            setLoading(true);

            const data = await getServices();

            setServices(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this service?"
        );

        if (!confirmDelete) return;

        try {

            await deleteService(id);

            fetchServices();

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* Header */}

                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-slate-800">
                            Services & Subscriptions
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Keep track of bills, subscriptions and recurring
                            services.
                        </p>

                    </div>

                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
                    >
                        + Add Service
                    </button>

                </div>

                {loading ? (

                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">

                        <h2 className="text-xl font-semibold">
                            Loading services...
                        </h2>

                    </div>

                ) : services.length === 0 ? (

                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">

                        <div className="text-6xl mb-5">
                            💳
                        </div>

                        <h2 className="text-2xl font-bold text-slate-700">
                            No Services Added
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Add electricity bills, subscriptions,
                            internet plans, insurance policies,
                            loan EMIs and much more.
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {services.map((service) => (

                            <div
                                key={service._id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 p-6"
                            >

                                <div className="flex justify-between items-start">

                                    <div>

                                        <h2 className="text-xl font-bold text-slate-800">
                                            {service.name}
                                        </h2>

                                        <p className="text-slate-500 mt-1">
                                            {service.provider}
                                        </p>

                                    </div>

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                                        ${
                                            service.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : service.status === "Paused"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {service.status}
                                    </span>

                                </div>

                                <div className="mt-5 space-y-2 text-sm">

                                    <p>
                                        <strong>Category:</strong>{" "}
                                        {service.category}
                                    </p>

                                    <p>
                                        <strong>Billing:</strong>{" "}
                                        {service.billingCycle}
                                    </p>

                                    <p>
                                        <strong>Expected Amount:</strong>{" "}
                                        ₹{service.expectedAmount}
                                    </p>

                                    <p>
                                        <strong>Due Date:</strong>{" "}
                                        {new Date(
                                            service.dueDate
                                        ).toLocaleDateString()}
                                    </p>

                                    <p>
                                        <strong>Auto Pay:</strong>{" "}
                                        {service.autoPay ? "Enabled" : "Disabled"}
                                    </p>

                                </div>

                                {service.notes && (

                                    <div className="mt-5 bg-slate-50 rounded-lg p-3">

                                        <p className="text-sm text-slate-600">
                                            {service.notes}
                                        </p>

                                    </div>

                                )}

                                <div className="flex justify-end mt-6">

                                    <button
                                        onClick={() => handleDelete(service._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

            <AddService
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={fetchServices}
            />

        </div>

    );

}

export default Services;