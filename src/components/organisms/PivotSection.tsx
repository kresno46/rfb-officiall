import React from "react";

export default function PivotSection() {
    return (
        <div className="space-y-6">
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {["Open", "High", "Low", "Close"].map((label) => (
                        <input
                            key={label}
                            type="text"
                            placeholder={label}
                            className="border px-3 py-2 rounded-md text-sm w-full"
                        />
                    ))}
                </div>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition sm:col-span-2 md:col-span-1">
                    Calculate
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left font-semibold">Level</th>
                            <th className="py-3 px-6 text-left font-semibold">Classic</th>
                            <th className="py-3 px-6 text-left font-semibold">Woodie</th>
                            <th className="py-3 px-6 text-left font-semibold">Camarilla</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["R4", "R3", "R2", "R1", "Pivot", "S1", "S2", "S3", "S4"].map((label, idx) => (
                            <tr
                                key={label}
                                className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } border-t hover:bg-gray-100 transition`}
                            >
                                <td
                                    className={`py-3 px-6 font-medium ${label === "Pivot" ? "text-green-600" : "text-gray-700"
                                        }`}
                                >
                                    {label}
                                </td>
                                <td className="py-3 px-6 text-gray-900 font-semibold">0</td>
                                <td className="py-3 px-6 text-gray-900 font-semibold">0</td>
                                <td className="py-3 px-6 text-gray-900 font-semibold">0</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
