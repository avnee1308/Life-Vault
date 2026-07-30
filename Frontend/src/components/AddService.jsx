import { useState } from "react";
import { createService } from "../api/service.api";

function AddService({ isOpen, onClose, onSuccess }) {
    const initialData = {
        name: "",
        category: "Electricity",
        provider: "",
        accountNumber: "",
        billingCycle: "Monthly",
        expectedAmount: "",
        dueDate: "",
        autoPay: false,
        reminderDaysBefore: 3,
        status: "Active",
        notes: ""
    };

    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await createService({
                ...formData,
                expectedAmount: Number(formData.expectedAmount),
                reminderDaysBefore: Number(formData.reminderDaysBefore)
            });

            setFormData(initialData);

            onSuccess();

            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to create service.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 max-h-[90vh] overflow-y-auto">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold text-slate-800">
                        Add Service
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-slate-500 hover:text-red-500"
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >

                    <div>
                        <label className="font-medium">Service Name</label>

                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Provider</label>

                        <input
                            type="text"
                            name="provider"
                            value={formData.provider}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Category</label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded-lg p-3"
                        >
                            <option>Electricity</option>
                            <option>Water</option>
                            <option>Gas</option>
                            <option>Internet</option>
                            <option>Mobile Recharge</option>
                            <option>Netflix</option>
                            <option>Amazon Prime</option>
                            <option>Spotify</option>
                            <option>Insurance</option>
                            <option>Loan EMI</option>
                            <option>Gym</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="font-medium">
                            Account Number
                        </label>

                        <input
                            type="text"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="font-medium">
                            Billing Cycle
                        </label>

                        <select
                            name="billingCycle"
                            value={formData.billingCycle}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded-lg p-3"
                        >
                            <option>Weekly</option>
                            <option>Monthly</option>
                            <option>Quarterly</option>
                            <option>Half-Yearly</option>
                            <option>Yearly</option>
                            <option>One Time</option>
                        </select>
                    </div>

                    <div>
                        <label className="font-medium">
                            Expected Amount
                        </label>

                        <input
                            type="number"
                            name="expectedAmount"
                            value={formData.expectedAmount}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Due Date</label>

                        <input
                            type="date"
                            required
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="font-medium">
                            Reminder Days Before
                        </label>

                        <input
                            type="number"
                            min="0"
                            name="reminderDaysBefore"
                            value={formData.reminderDaysBefore}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Status</label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded-lg p-3"
                        >
                            <option>Active</option>
                            <option>Paused</option>
                            <option>Cancelled</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3 mt-7">
                        <input
                            type="checkbox"
                            name="autoPay"
                            checked={formData.autoPay}
                            onChange={handleChange}
                        />

                        <label>Auto Pay Enabled</label>
                    </div>

                    <div className="md:col-span-2">
                        <label className="font-medium">Notes</label>

                        <textarea
                            rows={4}
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded-lg p-3"
                        />
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-4 mt-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-lg border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                        >
                            {loading ? "Saving..." : "Add Service"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddService;