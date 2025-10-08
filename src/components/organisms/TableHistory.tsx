import React from "react";

type HistoricalData = {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
};

export default function HistoricalTable() {
    const sampleData: HistoricalData[] = [
        { date: "2025-07-01", open: 7200, high: 7300, low: 7100, close: 7250 },
        { date: "2025-07-02", open: 7250, high: 7350, low: 7150, close: 7300 },
        { date: "2025-07-03", open: 7300, high: 7400, low: 7200, close: 7350 },
    ];

    return (
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full border border-gray-200 shadow rounded-lg overflow-hidden text-sm bg-white">
                <thead className="bg-green-600 text-white">
                    <tr>
                        <th className="px-4 py-3 text-left">Date</th>
                        <th className="px-4 py-3 text-left">Open</th>
                        <th className="px-4 py-3 text-left">High</th>
                        <th className="px-4 py-3 text-left">Low</th>
                        <th className="px-4 py-3 text-left">Close</th>
                    </tr>
                </thead>
                <tbody>
                    {sampleData.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-6 text-gray-500">
                                No data available.
                            </td>
                        </tr>
                    ) : (
                        sampleData.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                <td className="px-4 py-2">{row.date}</td>
                                <td className="px-4 py-2">{row.open}</td>
                                <td className="px-4 py-2">{row.high}</td>
                                <td className="px-4 py-2">{row.low}</td>
                                <td className="px-4 py-2">{row.close}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
