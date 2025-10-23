import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import PageTemplate from '@/components/templates/PageTemplate';
import ProfilContainer from '@/components/templates/PageContainer/Container';
import CareerCard from '@/components/moleculs/CareerCard';
import { useCareers } from '@/hooks/useCareers';

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'navbar',
      'footer',
      'careers'
    ])),
  },
});

const CareersPage = () => {
  const { t } = useTranslation('careers');
  const { careers, loading, error } = useCareers();

  if (loading) {
    return (
      <PageTemplate title={t('pageTitle')}>
        <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
          <ProfilContainer>
            <div className="flex justify-center items-center min-h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d22a27]"></div>
            </div>
          </ProfilContainer>
        </div>
      </PageTemplate>
    );
  }

  if (error) {
    return (
      <PageTemplate title={t('pageTitle')}>
        <ProfilContainer>
          <div className="text-center py-10">
            <p className="text-red-500">{t('error.message')}: {error.message}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-[#d22a27] text-white rounded hover:bg-[#b82421] transition-colors"
            >
              {t('error.retry')}
            </button>
          </div>
        </ProfilContainer>
      </PageTemplate>
    );
  }

  if (careers.length === 0) {
    return (
      <PageTemplate title={t('pageTitle')}>
        <ProfilContainer>
          <div className="text-center py-10">
            <p className="text-gray-600">{t('noJobs')}</p>
          </div>
        </ProfilContainer>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate title={t('pageTitle')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('joinTeam')}>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careers.map((job) => (
                <CareerCard 
                  key={job.id}
                  id={job.id}
                  city={job.nama_kota}
                  position={job.posisi}
                  slug={job.slug}
                />
              ))}
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
};

export default CareersPage;