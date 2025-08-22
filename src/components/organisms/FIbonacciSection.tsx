import { useState } from "react";
import Image from "next/image";

export default function FibonacciSection() {
    const [priceA, setPriceA] = useState("");
    const [priceB, setPriceB] = useState("");

    const retracementLevels = [23.6, 38.2, 50.0, 61.8, 78.6];
    const projectionLevels = [138.2, 150.0, 161.8, 200.0, 238.2, 261.8];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2].map((section, index) => (
                <div
                    key={index}
                    className="p-6 bg-white shadow-md rounded-xl border border-gray-200"
                >
                    {/* Gambar arah trend */}
                    <div className="mb-4">
                        <Image
                            src={`/assets/${section === 1 ? "up-trend.png" : "down-trend.png"}`}
                            alt={section === 1 ? "Up Trend" : "Down Trend"}
                            width={500}
                            height={200}
                            className="rounded-md w-full object-contain"
                        />
                    </div>

                    {/* Form Input */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Price (A)
                            </label>
                            <input
                                type="number"
                                placeholder={section === 1 ? "low value" : "high value"}
                                className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                                value={section === 1 ? priceA : priceB}
                                onChange={(e) =>
                                    section === 1
                                        ? setPriceA(e.target.value)
                                        : setPriceB(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Price (B)
                            </label>
                            <input
                                type="number"
                                placeholder={section === 1 ? "high value" : "low value"}
                                className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                                value={section === 1 ? priceB : priceA}
                                onChange={(e) =>
                                    section === 1
                                        ? setPriceB(e.target.value)
                                        : setPriceA(e.target.value)
                                }
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <button className="w-full py-2 mt-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition">
                                Calculate
                            </button>
                        </div>
                    </div>

                    {/* Tables */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Retracement */}
                        <div>
                            <h4 className="text-sm font-bold text-gray-800 mb-2">Retracement</h4>
                            <table className="w-full text-sm border border-gray-300 rounded overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-medium text-gray-600">Level</th>
                                        <th className="px-3 py-2 text-right font-medium text-gray-600">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {retracementLevels.map((level) => (
                                        <tr key={level} className="border-t last:border-b">
                                            <td className="px-3 py-2 text-gray-700 font-medium">{level.toFixed(2)}%</td>
                                            <td className="px-3 py-2 text-right text-gray-800">0</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Projection */}
                        <div>
                            <h4 className="text-sm font-bold text-gray-800 mb-2">Projection</h4>
                            <table className="w-full text-sm border border-gray-300 rounded overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-medium text-gray-600">Level</th>
                                        <th className="px-3 py-2 text-right font-medium text-gray-600">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectionLevels.map((level) => (
                                        <tr key={level} className="border-t last:border-b">
                                            <td className="px-3 py-2 text-gray-700 font-medium">{level.toFixed(2)}%</td>
                                            <td className="px-3 py-2 text-right text-gray-800">0</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
