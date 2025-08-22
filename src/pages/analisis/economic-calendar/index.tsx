// Profil Perusahaan

import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function Multilateral() {
    const dataKalender = [
        {
            time: "08:00",
            country: "USA",
            impact: "High",
            figures: "GDP",
            previous: "3.0%",
            forecast: "3.2%",
            actual: "3.5%",
        },
        {
            time: "09:30",
            country: "JPN",
            impact: "Medium",
            figures: "CPI",
            previous: "1.1%",
            forecast: "1.3%",
            actual: "1.4%",
        },
        {
            time: "10:45",
            country: "EUR",
            impact: "Low",
            figures: "PMI",
            previous: "50.1",
            forecast: "51.0",
            actual: "50.5",
        },
    ];

    return (
        <PageTemplate title="Kalender Ekonomi">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Kalender Ekonomi">
                    <div className="space-y-5">
                        {/* Filter Button Section */}
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:gap-3 gap-3">
                            {["Today", "This Week", "Previous Week", "Next Week"].map((label) => (
                                <button
                                    key={label}
                                    className="w-full sm:w-fit px-4 py-2 bg-zinc-200 hover:bg-green-300 rounded-lg transition-all duration-300 text-sm md:text-base text-center"
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto rounded-lg border border-zinc-200">
                            <table className="w-full text-sm md:text-base min-w-[700px]">
                                <thead className="bg-green-600 text-white">
                                    <tr>
                                        <th className="p-2 text-center">Time</th>
                                        <th className="p-2 text-center">Country</th>
                                        <th className="p-2 text-center">Impact</th>
                                        <th className="p-2 text-center">Figures</th>
                                        <th className="p-2 text-center">Previous</th>
                                        <th className="p-2 text-center">Forecast</th>
                                        <th className="p-2 text-center">Actual</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataKalender.map((row, index) => (
                                        <tr
                                            key={index}
                                            className={`text-center ${index % 2 === 0 ? "bg-white" : "bg-zinc-100"} hover:bg-green-100 transition`}
                                        >
                                            <td className="p-2">{row.time}</td>
                                            <td className="p-2">{row.country}</td>
                                            <td className="p-2">{row.impact}</td>
                                            <td className="p-2">{row.figures}</td>
                                            <td className="p-2">{row.previous}</td>
                                            <td className="p-2">{row.forecast}</td>
                                            <td className="p-2">{row.actual}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
