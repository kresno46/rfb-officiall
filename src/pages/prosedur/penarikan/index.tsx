import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

interface StepProps {
    text: string;
    terms: Record<string, string>;
}

const StepItem = ({ text, terms }: StepProps) => {
    // Create a map of replacements with their HTML-wrapped versions
    const replacements = {
        '{withdrawal}': `<span class="font-medium">${terms.withdrawal}</span>`,
        '{maxTime}': `<span class="font-medium">${terms.maxTime}</span>`,
        '{targetTime}': `<span class="font-medium">${terms.targetTime}</span>`,
        '{effectiveMargin}': `<span class="font-medium">${terms.effectiveMargin}</span>`,
        '{statementReport}': `<span class="italic">${terms.statementReport}</span>`
    };
    
    // Replace all placeholders with their HTML-wrapped versions
    let processedText = text;
    Object.entries(replacements).forEach(([key, value]) => {
        processedText = processedText.split(key).join(value);
    });
    
    return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
};

export default function Penarikan() {
    const { t, i18n } = useTranslation('penarikan');
    const { t: tCommon } = useTranslation('common');
    
    const terms = t('terms', { returnObjects: true }) as Record<string, string>;
    const steps = t('steps', { returnObjects: true }) as Record<string, string>;

    return (
        <PageTemplate title={t('title')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('title')}>
                    <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
                        <p className="text-justify">
                            <StepItem 
                                text={t('intro', {
                                    withdrawal: terms.withdrawal,
                                    effectiveMargin: terms.effectiveMargin,
                                    statementReport: terms.statementReport
                                })} 
                                terms={terms} 
                            />
                        </p>

                        <p className="font-semibold text-gray-800">
                            <StepItem 
                                text={t('process_title', {
                                    withdrawal: terms.withdrawal
                                })} 
                                terms={terms} 
                            />
                        </p>

                        <ol className="list-decimal pl-5 sm:pl-8 space-y-4 text-justify">
                            {Object.entries(steps).map(([key, text]) => (
                                <li key={key}>
                                    <StepItem text={text} terms={terms} />
                                </li>
                            ))}
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
            'penarikan'
        ])),
    },
});
