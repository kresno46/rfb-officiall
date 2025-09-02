import { useState } from "react";
import Image from "next/image";

// Definisikan tipe untuk hasil perhitungan
interface Result {
    [key: string]: number;
}

// Komponen kalkulator tunggal yang bisa digunakan kembali
const CalculatorSection = ({ trend }: { trend: 'Uptrend' | 'Downtrend' }) => {
    const [priceA, setPriceA] = useState(""); // Low untuk Uptrend, High untuk Downtrend
    const [priceB, setPriceB] = useState(""); // High untuk Uptrend, Low untuk Downtrend
    const [results, setResults] = useState<{ retracement: Result; projection: Result } | null>(null);

    const retracementLevels = [23.6, 38.2, 50.0, 61.8, 78.6];
    const projectionLevels = [
        { level: 138.2, factor: 0.382 }, { level: 150.0, factor: 0.5 },
        { level: 161.8, factor: 0.618 }, { level: 200.0, factor: 1.0 },
        { level: 238.2, factor: 1.382 }, { level: 261.8, factor: 1.618 },
    ];

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
        if (/^\d*\.?\d*$/.test(value)) setter(value);
    };

    const handleCalculate = () => {
        const pA = parseFloat(priceA);
        const pB = parseFloat(priceB);
        if (isNaN(pA) || isNaN(pB)) {
            alert("Please enter valid numbers for both prices.");
            return;
        }

        const high = Math.max(pA, pB);
        const low = Math.min(pA, pB);
        const diff = high - low;

        const newRetracement: Result = {};
        const newProjection: Result = {};

        if (trend === "Uptrend") {
            retracementLevels.forEach(level => { newRetracement[level] = high - diff * (level / 100); });
            projectionLevels.forEach(({ level, factor }) => { newProjection[level] = high + diff * factor; });
        } else { // Downtrend
            retracementLevels.forEach(level => { newRetracement[level] = low + diff * (level / 100); });
            projectionLevels.forEach(({ level, factor }) => { newProjection[level] = low - diff * factor; });
        }
        setResults({ retracement: newRetracement, projection: newProjection });
    };

    const formatNumber = (num: number | undefined) => num !== undefined ? num.toFixed(2) : "0.00";
    const isUptrend = trend === 'Uptrend';

    return (
        <div className="p-6 bg-white shadow-md rounded-xl border border-gray-200">
            <div className="mb-4">
                <Image
                    src={`/assets/${isUptrend ? "up-trend.png" : "down-trend.png"}`}
                    alt={trend}
                    width={500}
                    height={200}
                    className="rounded-md w-full object-contain"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        {isUptrend ? "Low" : "High"} (Price A)
                    </label>
                    <input
                        type="text"
                        placeholder={isUptrend ? "low value" : "high value"}
                        className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                        value={priceA}
                        onChange={(e) => handleInputChange(setPriceA, e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        {isUptrend ? "High" : "Low"} (Price B)
                    </label>
                    <input
                        type="text"
                        placeholder={isUptrend ? "high value" : "low value"}
                        className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                        value={priceB}
                        onChange={(e) => handleInputChange(setPriceB, e.target.value)}
                    />
                </div>
                <div className="sm:col-span-2">
                    <button 
                        onClick={handleCalculate} 
                        className="w-full py-2 mt-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition"
                    >
                        Calculate
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-2">
                        Retracement
                    </h4>
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
                                    <td className="px-3 py-2 text-gray-700 font-medium">
                                        {level.toFixed(1)}%
                                    </td>
                                    <td className="px-3 py-2 text-right text-gray-800 font-mono">
                                        {formatNumber(results?.retracement[level])}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-2">
                        Projection
                    </h4>
                    <table className="w-full text-sm border border-gray-300 rounded overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-3 py-2 text-left font-medium text-gray-600">Level</th>
                                <th className="px-3 py-2 text-right font-medium text-gray-600">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectionLevels.map(({ level }) => (
                                <tr key={level} className="border-t last:border-b">
                                    <td className="px-3 py-2 text-gray-700 font-medium">
                                        {level.toFixed(1)}%
                                    </td>
                                    <td className="px-3 py-2 text-right text-gray-800 font-mono">
                                        {formatNumber(results?.projection[level])}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default function FibonacciSection() {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Fibonacci Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <CalculatorSection trend="Uptrend" />
                <CalculatorSection trend="Downtrend" />
            </div>
        </div>
    );
}
