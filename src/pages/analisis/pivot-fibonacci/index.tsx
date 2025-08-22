import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import { useState } from "react";
import PivotSection from "@/components/organisms/PivotSection"; // Tambahkan ini
import FibonacciSection from "@/components/organisms/FIbonacciSection";
import HistoricalTable from "@/components/organisms/TableHistory";

export default function HistoricalData() {
    const [activeTab, setActiveTab] = useState("Pivot");

    return (
        <PageTemplate title="Pivot & Fibonacci">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Pivot & Fibonacci" hideTitle={true}>
                    <div className="space-y-6">
                        {/* Tabs */}
                        <div className="flex border-b space-x-4">
                            {["Pivot", "Fibonacci"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 font-medium ${activeTab === tab
                                        ? "border-b-2 border-green-500 text-green-600"
                                        : "text-gray-500 hover:text-green-500"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Dynamic Section */}
                        {activeTab === "Pivot" && <PivotSection />}
                        {activeTab === "Fibonacci" && <FibonacciSection />}

                        <hr className="border-zinc-200" />

                        <HistoricalTable />
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
