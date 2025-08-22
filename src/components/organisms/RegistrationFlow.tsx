export default function RegistrationFlow() {
    const steps = [
        {
            title: "Membuka Website Perusahaan",
            description: "Calon Nasabah mengunjungi website resmi PT Rifan Financindo Berjangka."
        },
        {
            title: "Registrasi Akun Demo",
            description: (
                <ul className="list-disc ml-5 space-y-1">
                    <li>Memasukkan data diri</li>
                    <li>Mendapatkan akses akun demo</li>
                    <li>Melakukan simulasi transaksi</li>
                </ul>
            )
        },
        {
            title: "Pengisian Dokumen Perjanjian",
            description: (
                <>
                    <p className="mb-2">Calon Nasabah melengkapi dokumen berikut:</p>
                    <ul className="list-disc ml-5 space-y-1">
                        <li>Aplikasi Perjanjian</li>
                        <li>Dokumen Pemberitahuan Adanya Risiko</li>
                        <li>Perjanjian Pemberian Amanat (PPA)</li>
                        <li>Mekanisme Transaksi (Trading Rules)</li>
                        <li>Dokumen pendukung (KTP dan lainnya)</li>
                    </ul>
                </>
            )
        },
        {
            title: "Verifikasi oleh Wakil Pialang Berjangka",
            description: "Meliputi verifikasi data pribadi dan bukti penyetoran dana margin."
        },
        {
            title: "Setoran Dana Margin ke Rekening Segregasi",
            description: (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                    <div>
                        <p className="font-semibold">Bank BCA – Sudirman</p>
                        <p>IDR: 035 – 311 – 8975</p>
                        <p>USD: 035 – 311 – 7600</p>
                    </div>
                    <div>
                        <p className="font-semibold">Bank CIMB Niaga – Gajahmada</p>
                        <p>IDR: 800 – 12 – 97271 – 00</p>
                        <p>USD: 800 – 01 – 20945 – 40</p>
                    </div>
                    <div>
                        <p className="font-semibold">Bank BNI – Gambir</p>
                        <p>IDR: 017 – 5008 – 590</p>
                        <p>USD: 017 – 5020 – 200</p>
                    </div>
                    <div>
                        <p className="font-semibold">Bank Mandiri – Imam Bonjol</p>
                        <p>IDR: 122 – 000 – 664 – 2881</p>
                        <p>USD: 122 – 000 – 664 – 2873</p>
                    </div>
                    <div>
                        <p className="font-semibold">Bank Artha Graha – Sudirman</p>
                        <p>IDR: 107 – 996 – 3271</p>
                    </div>
                </div>
            )
        },
        {
            title: "Pemrosesan Pendaftaran",
            description: "PT Rifan Financindo Berjangka memproses seluruh data dan dokumen."
        },
        {
            title: "Aktivasi Akun",
            description: "Setelah verifikasi selesai, akun aktif dan data login dikirim ke Nasabah."
        },
        {
            title: "Siap Melakukan Transaksi",
            description: "Nasabah resmi dapat bertransaksi di pasar berjangka komoditi."
        }
    ];

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-10">
                {steps.map((step, index) => (
                    <div key={index} className="border rounded-xl p-5 sm:p-6 hover:shadow-lg transition">
                        <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-3">
                            {index + 1}. {step.title}
                        </h3>
                        <div className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            {step.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
