import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import Link from "next/link";

export default function NotFound() {
  const { t } = useTranslation("common");

  return (
    <PageTemplate title="404 Not Found - PT Rifan Financindo Berjangka">
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer hideTitle={true}>
          <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
            <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {t("404.title", "Page Not Found")}
            </h2>
            <p className="text-gray-600 mb-6">
              {t(
                "404.description",
                "Sorry, the page you are looking for is not available or has been moved."
              )}
            </p>
            <Link
              href="/"
              className="text-white bg-green-700 px-6 py-3 rounded hover:bg-green-800 transition"
            >
              {t("404.backHome", "Back to Home")}
            </Link>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = "id" }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "navbar", "footer"])),
  },
});
