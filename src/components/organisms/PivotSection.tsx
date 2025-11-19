import React, { useState } from "react";
import { useTranslation } from "next-i18next";

// Definisikan tipe untuk input dan hasil
type PivotInput = { [key: string]: string };
type PivotResult = { [key: string]: number | string };

export default function PivotSection() {
    const { t } = useTranslation('pivot-fibo');
    const [inputs, setInputs] = useState<PivotInput>({
        open: "",
        high: "",
        low: "",
        close: ""
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
        // Parse input values, default to NaN if empty
        const high = inputs.high ? parseFloat(inputs.high) : NaN;
        const low = inputs.low ? parseFloat(inputs.low) : NaN;
        const close = inputs.close ? parseFloat(inputs.close) : NaN;
        const open = inputs.open ? parseFloat(inputs.open) : NaN;

        // Calculate range if both high and low are provided
        const range = !isNaN(high) && !isNaN(low) ? high - low : NaN;

        // Helper function to calculate or return NaN if any parameter is NaN
        const safeCalc = (fn: (...args: number[]) => number, ...args: number[]): number => {
            return args.some(isNaN) ? NaN : fn(...args);
        };

        // Classic Pivots (requires high, low, close)
        const classicPP = safeCalc((h, l, c) => (h + l + c) / 3, high, low, close);
        const classicR1 = safeCalc((pp, l) => (2 * pp) - l, classicPP, low);
        const classicS1 = safeCalc((pp, h) => (2 * pp) - h, classicPP, high);
        const classicR2 = safeCalc((pp, r) => pp + r, classicPP, range);
        const classicS2 = safeCalc((pp, r) => pp - r, classicPP, range);
        const classicR3 = safeCalc((r1, r) => r1 + r, classicR1, range);
        const classicS3 = safeCalc((s1, r) => s1 - r, classicS1, range);
        const classicR4 = safeCalc((r2, r) => r2 + r * 1.618, classicR2, range);
        const classicS4 = safeCalc((s2, r) => s2 - r * 1.618, classicS2, range);

        // Woodie Pivots (requires high, low, open)
        const woodiePP = safeCalc((h, l, o) => (h + l + 2 * o) / 4, high, low, open);
        const woodieR1 = safeCalc((pp, l) => (2 * pp) - l, woodiePP, low);
        const woodieS1 = safeCalc((pp, h) => (2 * pp) - h, woodiePP, high);
        const woodieR2 = safeCalc((pp, r) => pp + r, woodiePP, range);
        const woodieS2 = safeCalc((pp, r) => pp - r, woodiePP, range);
        const woodieR3 = safeCalc((r1, r) => r1 + r, woodieR1, range);
        const woodieS3 = safeCalc((s1, r) => s1 - r, woodieS1, range);
        const woodieR4 = safeCalc((r2, r) => r2 + r, woodieR2, range);
        const woodieS4 = safeCalc((s2, r) => s2 - r, woodieS2, range);

        // Camarilla Pivots (requires close, range)
        const camarillaR4 = safeCalc((c, r) => c + (r * 1.1) / 2, close, range);
        const camarillaR3 = safeCalc((c, r) => c + (r * 1.1) / 4, close, range);
        const camarillaR2 = safeCalc((c, r) => c + (r * 1.1) / 6, close, range);
        const camarillaR1 = safeCalc((c, r) => c + (r * 1.1) / 12, close, range);
        const camarillaS1 = safeCalc((c, r) => c - (r * 1.1) / 12, close, range);
        const camarillaS2 = safeCalc((c, r) => c - (r * 1.1) / 6, close, range);
        const camarillaS3 = safeCalc((c, r) => c - (r * 1.1) / 4, close, range);
        const camarillaS4 = safeCalc((c, r) => c - (r * 1.1) / 2, close, range);

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
            return isNaN(num) ? 'NaN' : num.toFixed(2);
        }
        return num || 'NaN';
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">{t('pivotSection.title')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['open', 'high', 'low', 'close'].map((field) => (
                    <div key={field} className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">{field === 'high'
                                ? t('pivotSection.high')
                                : field === 'low'
                                    ? t('pivotSection.low')
                                    : field === 'close'
                                        ? t('pivotSection.close')
                                        : t('pivotSection.open')}</label>
                        <input
                            type="text"
                            name={field}
                            value={inputs[field]}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            placeholder={t('pivotSection.placeholder', { 
                                field: t(`pivotSection.${field}`)
                            })}
                        />
                    </div>
                ))}
            </div>

            <div className="flex space-x-4">
                <button
                    onClick={calculatePivots}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    {t('pivotSection.calculate')}
                </button>
                <button
                    onClick={() => {
                        setInputs({ open: "", high: "", low: "", close: "" });
                        setResults(null);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    {t('pivotSection.reset')}
                </button>
            </div>

            {results && (
                <div className="mt-6 overflow-x-auto">
                    <h3 className="text-lg font-medium mb-4">{t('pivotSection.result')}</h3>
                    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                        <table className="min-w-full bg-white text-sm">
                            <thead className="bg-green-600 text-white">
                                <tr>
                                    <th className="py-3 px-6 text-left font-semibold">{t('pivotSection.levels.level')}</th>
                                    <th className="py-3 px-6 text-left font-semibold">{t('pivotSection.levels.classic')}</th>
                                    <th className="py-3 px-6 text-left font-semibold">{t('pivotSection.levels.woodie')}</th>
                                    <th className="py-3 px-6 text-left font-semibold">{t('pivotSection.levels.camarilla')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { level: 'R4', label: t('pivotSection.levels.r4'), classic: results.classic.R4, woodie: results.woodie.R4, camarilla: results.camarilla.R4 },
                                    { level: 'R3', label: t('pivotSection.levels.r3'), classic: results.classic.R3, woodie: results.woodie.R3, camarilla: results.camarilla.R3 },
                                    { level: 'R2', label: t('pivotSection.levels.r2'), classic: results.classic.R2, woodie: results.woodie.R2, camarilla: results.camarilla.R2 },
                                    { level: 'R1', label: t('pivotSection.levels.r1'), classic: results.classic.R1, woodie: results.woodie.R1, camarilla: results.camarilla.R1 },
                                    { level: 'PP', label: t('pivotSection.levels.pp'), classic: results.classic.PP, woodie: results.woodie.PP, camarilla: results.camarilla.PP },
                                    { level: 'S1', label: t('pivotSection.levels.s1'), classic: results.classic.S1, woodie: results.woodie.S1, camarilla: results.camarilla.S1 },
                                    { level: 'S2', label: t('pivotSection.levels.s2'), classic: results.classic.S2, woodie: results.woodie.S2, camarilla: results.camarilla.S2 },
                                    { level: 'S3', label: t('pivotSection.levels.s3'), classic: results.classic.S3, woodie: results.woodie.S3, camarilla: results.camarilla.S3 },
                                    { level: 'S4', label: t('pivotSection.levels.s4'), classic: results.classic.S4, woodie: results.woodie.S4, camarilla: results.camarilla.S4 }
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
