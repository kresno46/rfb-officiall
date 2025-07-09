// Profil Perusahaan

import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function DaftarWakilPialang() {
    const dataWakil = [
        { nama: "Andi Prasetyo", nomorIzin: "123/WPB.01/2020", status: "Aktif" },
        { nama: "Dewi Lestari", nomorIzin: "456/WPB.02/2021", status: "Aktif" },
        { nama: "Rudi Hartono", nomorIzin: "789/WPB.03/2022", status: "Tidak Aktif" },
    ];

    return (
        <PageTemplate title="Wakil Pialang">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="AXA Tower - Jakarta">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden border bg-white">
                            <thead className="bg-green-500 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">No</th>
                                    <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">Nama</th>
                                    <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">Nomor Izin WPB</th>
                                    <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {dataWakil.map((wpb, index) => (
                                    <tr key={index} className="bg-zinc-50 hover:bg-green-100 transition duration-200">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">{wpb.nama}</td>
                                        <td className="px-6 py-4">{wpb.nomorIzin}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${wpb.status === "Aktif"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {wpb.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
