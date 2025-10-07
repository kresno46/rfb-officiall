import React, { useState } from "react";

// Definisikan tipe untuk input dan hasil
type PivotInput = { [key: string]: string };
type PivotResult = { [key: string]: number | string };

export default function PivotSection() {
    const [inputs, setInputs] = useState<PivotInput>({
        high: "",
        low: "",
        close: "",
        open: ""
    });
    const [results, setResults] = useState<{
        classic: PivotResult;
        woodie: PivotResult;
        camarilla: PivotResult;
    } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Hanya izinkan angka dan satu titik desimal
        if (/^\d*\.?\d*$/.test(value)) {
            setInputs(prev => ({ ...prev, [name]: value }));
        }
    };

    const calculatePivots = () => {
        const high = parseFloat(inputs.high);
        const low = parseFloat(inputs.low);
        const close = parseFloat(inputs.close);
        const open = parseFloat(inputs.open);

        if (isNaN(high) || isNaN(low) || isNaN(close) || isNaN(open)) {
            alert('Mohon isi semua field (High, Low, Close, Open) dengan angka yang valid.');
            return;
        }

        const range = high - low;

        // Classic Pivots
        const classicPP = (high + low + close) / 3;
        const classicR1 = (2 * classicPP) - low;
        const classicS1 = (2 * classicPP) - high;
        const classicR2 = classicPP + range;
        const classicS2 = classicPP - range;
        const classicR3 = classicR1 + range;
        const classicS3 = classicS1 - range;
        const classicR4 = classicR2 + range * 1.618;
        const classicS4 = classicS2 - range * 1.618;

        // Woodie Pivots (menggunakan Open)
        const woodiePP = (high + low + 2 * open) / 4;
        const woodieR1 = (2 * woodiePP) - low;
        const woodieS1 = (2 * woodiePP) - high;
        const woodieR2 = woodiePP + range;
        const woodieS2 = woodiePP - range;
        const woodieR3 = woodieR1 + range;
        const woodieS3 = woodieS1 - range;
        const woodieR4 = woodieR2 + range;
        const woodieS4 = woodieS2 - range;

        // Camarilla Pivots (menggunakan close & range)
        const camarillaR4 = close + (range * 1.1) / 2;
        const camarillaR3 = close + (range * 1.1) / 4;
        const camarillaR2 = close + (range * 1.1) / 6;
        const camarillaR1 = close + (range * 1.1) / 12;
        const camarillaS1 = close - (range * 1.1) / 12;
        const camarillaS2 = close - (range * 1.1) / 6;
        const camarillaS3 = close - (range * 1.1) / 4;
        const camarillaS4 = close - (range * 1.1) / 2;

        setResults({
            classic: {
                R4: classicR4, R3: classicR3, R2: classicR2, R1: classicR1,
                PP: classicPP,
                S1: classicS1, S2: classicS2, S3: classicS3, S4: classicS4,
            },
            woodie: {
                R4: woodieR4, R3: woodieR3, R2: woodieR2, R1: woodieR1,
                PP: woodiePP,
                S1: woodieS1, S2: woodieS2, S3: woodieS3, S4: woodieS4,
            },
            camarilla: {
                R4: camarillaR4, R3: camarillaR3, R2: camarillaR2, R1: camarillaR1,
                PP: classicPP, // tetap pakai Classic PP sebagai referensi tengah
                S1: camarillaS1, S2: camarillaS2, S3: camarillaS3, S4: camarillaS4,
            },
        });
    };

    const formatNumber = (num: number | string) => {
        if (typeof num === 'number') {
            return num.toFixed(2);
        }
        return num;
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Kalkulator Pivot Point</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['high', 'low', 'close', 'open'].map((field) => (
                    <div key={field} className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            {field === 'high'
                                ? 'Tertinggi'
                                : field === 'low'
                                    ? 'Terendah'
                                    : field === 'close'
                                        ? 'Penutupan'
                                        : 'Pembukaan'}
                        </label>
                        <input
                            type="text"
                            name={field}
                            value={inputs[field]}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            placeholder={`Masukkan harga ${field}`}
                        />
                    </div>
                ))}
            </div>

            <div className="flex space-x-4">
                <button
                    onClick={calculatePivots}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Hitung
                </button>
                <button
                    onClick={() => {
                        setInputs({ high: "", low: "", close: "", open: "" });
                        setResults(null);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Reset
                </button>
            </div>

            {results && (
                <div className="mt-6 overflow-x-auto">
                    <h3 className="text-lg font-medium mb-4">Hasil Perhitungan</h3>
                    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                        <table className="min-w-full bg-white text-sm">
                            <thead className="bg-green-600 text-white">
                                <tr>
                                    <th className="py-3 px-6 text-left font-semibold">Level</th>
                                    <th className="py-3 px-6 text-left font-semibold">Klasik</th>
                                    <th className="py-3 px-6 text-left font-semibold">Woodie</th>
                                    <th className="py-3 px-6 text-left font-semibold">Camarilla</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { level: 'R4', label: 'Resistance 4 (R4)', classic: results.classic.R4, woodie: results.woodie.R4, camarilla: results.camarilla.R4 },
                                    { level: 'R3', label: 'Resistance 3 (R3)', classic: results.classic.R3, woodie: results.woodie.R3, camarilla: results.camarilla.R3 },
                                    { level: 'R2', label: 'Resistance 2 (R2)', classic: results.classic.R2, woodie: results.woodie.R2, camarilla: results.camarilla.R2 },
                                    { level: 'R1', label: 'Resistance 1 (R1)', classic: results.classic.R1, woodie: results.woodie.R1, camarilla: results.camarilla.R1 },
                                    { level: 'PP', label: 'Pivot Point (PP)', classic: results.classic.PP, woodie: results.woodie.PP, camarilla: results.camarilla.PP },
                                    { level: 'S1', label: 'Support 1 (S1)', classic: results.classic.S1, woodie: results.woodie.S1, camarilla: results.camarilla.S1 },
                                    { level: 'S2', label: 'Support 2 (S2)', classic: results.classic.S2, woodie: results.woodie.S2, camarilla: results.camarilla.S2 },
                                    { level: 'S3', label: 'Support 3 (S3)', classic: results.classic.S3, woodie: results.woodie.S3, camarilla: results.camarilla.S3 },
                                    { level: 'S4', label: 'Support 4 (S4)', classic: results.classic.S4, woodie: results.woodie.S4, camarilla: results.camarilla.S4 },
                                ].map((row, idx) => (
                                    <tr
                                        key={row.level}
                                        className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-t hover:bg-gray-100`}
                                    >
                                        <td className={`py-3 px-6 font-medium ${row.level === 'PP' ? 'text-green-600' : 'text-gray-700'}`}>
                                            {row.label}
                                        </td>
                                        <td className="py-3 px-6 text-gray-900 font-semibold">
                                            {formatNumber(row.classic)}
                                        </td>
                                        <td className="py-3 px-6 text-gray-900 font-semibold">
                                            {formatNumber(row.woodie)}
                                        </td>
                                        <td className="py-3 px-6 text-gray-900 font-semibold">
                                            {formatNumber(row.camarilla)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
