import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

interface TermItemProps {
    text: string;
    terms: Record<string, string>;
}

const TermItem = ({ text, terms }: TermItemProps) => {
    // Create a map of replacements with their HTML-wrapped versions
    const replacements = {
        '{realtrading}': `<span class="font-medium">${terms.realtrading}</span>`,
        '{userid}': `<span class="font-medium">${terms.userid}</span>`,
        '{password}': `<span class="font-medium">${terms.password}</span>`
    };
    
    // Replace all placeholders with their HTML-wrapped versions
    let processedText = text;
    Object.entries(replacements).forEach(([key, value]) => {
        processedText = processedText.split(key).join(value);
    });
    
    return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
};

export default function PetunjukTransaksi() {
    const { t, ready } = useTranslation('petunjuk-transaksi');
    
    // Initialize with default values to prevent undefined errors
    const defaultSteps = {
        step1: '',
        step2: '',
        step3: '',
        requirements: {
            internet: '',
            access: '',
            login_url: 'http://etrade.rifanberjangka.com/login.php',
            credentials: ''
        }
    };
    
    const defaultTerms = {
        realtrading: 'real online trading',
        userid: 'User ID',
        password: 'Password'
    };
    
    // Only use translations when they're ready
    const steps = ready 
        ? (t('steps', { returnObjects: true }) as Record<string, any>)
        : defaultSteps;
        
    const requirements = steps.requirements || defaultSteps.requirements;
    const terms = ready 
        ? (t('terms', { returnObjects: true }) as Record<string, string>)
        : defaultTerms;

    // Show loading state if translations aren't ready
    if (!ready) {
        return (
            <PageTemplate title="Loading...">
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title="Loading...">
                        <div className="animate-pulse">Loading...</div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title={t('title')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('title')}>
                    <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
                        <ol className="list-decimal pl-5 sm:pl-8 space-y-5 text-justify">
                            <li>
                                <TermItem text={steps.step1} terms={terms} />
                            </li>

                            <li>
                                <TermItem text={steps.step2} terms={terms} />
                            </li>

                            <li>
                                {steps.step3}
                                <ul className="list-disc pl-5 mt-4 space-y-3">
                                    <li>{requirements.internet}</li>
                                    <li>
                                        {requirements.access}
                                        <br />
                                        <a
                                            href={requirements.login_url}
                                            className="text-green-600 hover:text-green-700 underline break-all"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {requirements.login_url}
                                        </a>
                                    </li>
                                    <li>
                                        <TermItem text={requirements.credentials} terms={terms} />
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

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            'common',
            'navbar',
            'footer',
            'petunjuk-transaksi'
        ])),
    },
});
