import { useState } from "react";

export default function HistoricalDataContent() {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const dataHistorical = [
        { date: "2025-06-30", open: 1850.5, high: 1863.2, low: 1842.7, close: 1859.4 },
        { date: "2025-06-29", open: 1839.0, high: 1852.1, low: 1831.2, close: 1845.9 },
        { date: "2025-06-28", open: 1822.5, high: 1841.8, low: 1810.3, close: 1832.6 },
    ];

    const handleDownload = () => {
        const last30 = dataHistorical.slice(-30); // Ambil 30 data terakhir
        const header = "Date,Open,High,Low,Close\n";
        const rows = last30.map(row =>
            `${row.date},${row.open},${row.high},${row.low},${row.close}`
        ).join("\n");

        const blob = new Blob([header + rows], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "historical-data.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            {/* Filter Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                    <label htmlFor="from" className="font-medium">From:</label>
                    <input
                        type="date"
                        id="from"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="border px-3 py-2 rounded-md"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="to" className="font-medium">To:</label>
                    <input
                        type="date"
                        id="to"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="border px-3 py-2 rounded-md"
                    />
                </div>
                <button
                    onClick={handleDownload}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                    Download
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-zinc-200">
                <table className="w-full text-sm md:text-base min-w-[700px]">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="p-2 text-center">Date</th>
                            <th className="p-2 text-center">Open</th>
                            <th className="p-2 text-center">High</th>
                            <th className="p-2 text-center">Low</th>
                            <th className="p-2 text-center">Close</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataHistorical.map((row, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? "bg-white" : "bg-zinc-100"} hover:bg-green-100 transition text-center`}
                            >
                                <td className="p-2">{row.date}</td>
                                <td className="p-2">{row.open}</td>
                                <td className="p-2">{row.high}</td>
                                <td className="p-2">{row.low}</td>
                                <td className="p-2">{row.close}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}