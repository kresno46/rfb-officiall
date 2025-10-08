// Profil Perusahaan

import RegistrationFlow from "@/components/organisms/RegistrationFlow";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function Legalitas() {
    return (
        <PageTemplate title="Prosedur Registrasi Online">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Prosedur Registrasi Online">
                    <RegistrationFlow />
                </ProfilContainer>
            </div>
        </PageTemplate >
    );
}
