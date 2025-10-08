import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function PetunjukTransaksi() {
    return (
        <PageTemplate title="Petunjuk Transaksi">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Petunjuk Transaksi">
                    <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">

                        <ol className="list-decimal pl-5 sm:pl-8 space-y-5 text-justify">
                            <li>
                                Nasabah dapat menyampaikan amanat secara online dan/atau melalui telepon.
                                Dianjurkan Nasabah melakukan simulasi terlebih dahulu sebelum menggunakan
                                <span className="font-medium"> real online trading</span>.
                            </li>

                            <li>
                                Nasabah yang menyampaikan amanat secara online akan memperoleh
                                <span className="font-medium"> User ID </span>
                                dan <span className="font-medium"> Password </span>
                                dari PT. Rifan Financindo Berjangka.
                            </li>

                            <li>
                                Untuk melakukan transaksi secara online, harus terpenuhi hal-hal berikut:
                                <ul className="list-disc pl-5 mt-4 space-y-3">
                                    <li>Tersedia jaringan internet yang stabil.</li>
                                    <li>
                                        Akses ke:
                                        <br />
                                        <a
                                            href="http://etrade.rifanberjangka.com/login.php"
                                            className="text-green-600 hover:text-green-700 underline break-all"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            http://etrade.rifanberjangka.com/login.php
                                        </a>
                                    </li>
                                    <li>
                                        Nasabah sudah memiliki <span className="font-medium">User ID</span> dan{" "}
                                        <span className="font-medium">Password</span> dari PT. Rifan Financindo
                                        Berjangka.
                                    </li>
                                </ul>
                            </li>
                        </ol>

                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
