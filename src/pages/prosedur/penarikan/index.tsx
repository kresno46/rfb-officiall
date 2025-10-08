import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function Penarikan() {
    return (
        <PageTemplate title="Prosedur Penarikan">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Prosedur Penarikan">
                    <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">

                        <p className="text-justify">
                            Penarikan Dana (<span className="italic">Withdrawal</span>) dapat dilakukan kapan saja oleh
                            Nasabah apabila diinginkan, dengan catatan dana yang ditarik tidak melebihi jumlah
                            <span className="font-medium"> Effective Margin </span>
                            yang tercantum dalam laporan transaksi harian Nasabah
                            (<span className="italic">Statement Report</span>).
                        </p>

                        <p className="font-semibold text-gray-800">
                            Proses Penarikan Dana (<span className="italic">Withdrawal</span>)
                        </p>

                        <ol className="list-decimal pl-5 sm:pl-8 space-y-4 text-justify">
                            <li>
                                Nasabah masuk ke menu <span className="font-medium">Withdrawal</span> pada akun transaksi riil untuk
                                melakukan permohonan penarikan dana dengan mengikuti syarat dan ketentuan yang berlaku.
                            </li>

                            <li>
                                Nasabah mengisi formulir permohonan penarikan dana secara lengkap dan benar.
                            </li>

                            <li>
                                Dana hanya dapat ditransfer ke rekening atas nama Nasabah yang sesuai dengan dokumen
                                Aplikasi Pembukaan Rekening yang telah disahkan sebelumnya.
                            </li>

                            <li>
                                Proses penarikan dana melalui mekanisme standar memerlukan waktu maksimum
                                <span className="font-medium"> tiga hari kerja (T+3)</span>.
                                Namun, PT. Rifan Financindo Berjangka berkomitmen untuk mempercepat proses agar dapat diselesaikan
                                dalam waktu <span className="font-medium">satu hari kerja (T+1)</span>.
                            </li>
                        </ol>

                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
