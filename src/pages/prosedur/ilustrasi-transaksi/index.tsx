import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ locale = "id" }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "common",
      "navbar",
      "footer",
      "ilustrasi-transaksi",
    ])),
  },
});

type ForexRow = {
  kode: string;
  dasar: string;
  kategori: string;
  tipe: string;
};

export default function IlustrasiTransaksi() {
  const { t } = useTranslation("ilustrasi-transaksi");

  // ============ KETERANGAN LINES (SAFE) ============
  const keteranganLinesRaw = t("keteranganLines", {
    returnObjects: true,
  }) as unknown;

  const keteranganLines: string[] = Array.isArray(keteranganLinesRaw)
    ? (keteranganLinesRaw as string[])
    : typeof keteranganLinesRaw === "string"
    ? [keteranganLinesRaw]
    : [];

  // ============ FOREX TABLE (SAFE) ============
  const forexTableRaw = t("forexTable", {
    returnObjects: true,
  }) as unknown;

  const forexTable: ForexRow[] = Array.isArray(forexTableRaw)
    ? (forexTableRaw as ForexRow[])
    : forexTableRaw && typeof forexTableRaw === "object"
    ? (Object.values(forexTableRaw as Record<string, ForexRow>) as ForexRow[])
    : [];

  return (
    <PageTemplate title={t("title")}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t("title")}>
          <div className="prose max-w-none text-gray-700">
            <h1 className="text-3xl font-bold mb-6 border-b pb-3">
              {t("contentTitle")}
            </h1>

            {/* Rumus */}
            <section className="mt-10">
              <h2 className="text-xl font-semibold mb-2">
                {t("formulaSectionTitle")}
              </h2>
              <pre className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-sm whitespace-pre-wrap shadow-sm">
                {t("formulaText")}
              </pre>
            </section>

            {/* Keterangan */}
            <section className="mt-10">
              <h2 className="text-xl font-semibold mb-3">
                {t("keteranganTitle")}
              </h2>
              <ul className="list-disc ml-6 space-y-1">
                {keteranganLines.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </section>

            {/* Contoh 1 */}
            <section className="mt-12">
              <h2 className="text-xl font-semibold mb-3">{t("ex1.title")}</h2>
              <p>{t("ex1.p1")}</p>

              <p className="mt-3 font-semibold">{t("ex1.formulaHeading")}</p>
              {[t("ex1.f1"), t("ex1.f2"), t("ex1.f3")].map((f, i) => (
                <pre
                  key={i}
                  className="bg-gray-50 border border-gray-200 p-3 rounded text-sm whitespace-pre-wrap mt-2"
                >
                  {f}
                </pre>
              ))}

              <p className="mt-3">{t("ex1.result")}</p>

              <p className="font-semibold mt-3">{t("ex1.noteHeading")}</p>
              <p>{t("ex1.note")}</p>
            </section>

            {/* Contoh 2 */}
            <section className="mt-12">
              <h2 className="text-xl font-semibold mb-3">{t("ex2.title")}</h2>
              <p>{t("ex2.p1")}</p>

              <p className="mt-3 font-semibold">{t("ex2.formulaHeading")}</p>
              {[t("ex2.f1"), t("ex2.f2"), t("ex2.f3"), t("ex2.f4")].map(
                (f, i) => (
                  <pre
                    key={i}
                    className="bg-gray-50 border border-gray-200 p-3 rounded text-sm whitespace-pre-wrap mt-2"
                  >
                    {f}
                  </pre>
                )
              )}

              <p className="mt-3">{t("ex2.result")}</p>
            </section>

            {/* Contoh 3 */}
            <section className="mt-12">
              <h2 className="text-xl font-semibold mb-3">{t("ex3.title")}</h2>
              <p>{t("ex3.p1")}</p>

              <p className="mt-3 font-semibold">{t("ex3.formulaHeading")}</p>

              <p className="font-semibold mt-3">{t("ex3.day1")}</p>
              {[t("ex3.d1f1"), t("ex3.d1f2")].map((f, i) => (
                <pre
                  key={i}
                  className="bg-gray-50 border border-gray-200 p-3 rounded text-sm whitespace-pre-wrap mt-2"
                >
                  {f}
                </pre>
              ))}

              <p className="font-semibold mt-4">{t("ex3.day2")}</p>
              {[t("ex3.d2f1"), t("ex3.d2f2")].map((f, i) => (
                <pre
                  key={i}
                  className="bg-gray-50 border border-gray-200 p-3 rounded text-sm whitespace-pre-wrap mt-2"
                >
                  {f}
                </pre>
              ))}

              <p className="mt-3">{t("ex3.rollover")}</p>
              <p>{t("ex3.net")}</p>
            </section>

            {/* Contoh 4 */}
            <section className="mt-12">
              <h2 className="text-xl font-semibold mb-3">{t("ex4.title")}</h2>
              <p>{t("ex4.p1")}</p>

              <p className="mt-3 font-semibold">{t("ex4.formulaHeading")}</p>
              {[t("ex4.f1"), t("ex4.f2"), t("ex4.f3")].map((f, i) => (
                <pre
                  key={i}
                  className="bg-gray-50 border border-gray-200 p-3 rounded text-sm whitespace-pre-wrap mt-2"
                >
                  {f}
                </pre>
              ))}

              <p className="mt-3">{t("ex4.result")}</p>

              <p className="mt-5 font-semibold">{t("ex4.altHeading")}</p>
              {[t("ex4.af1"), t("ex4.af2"), t("ex4.af3")].map((f, i) => (
                <pre
                  key={i}
                  className="bg-gray-50 border border-gray-200 p-3 rounded text-sm whitespace-pre-wrap mt-2"
                >
                  {f}
                </pre>
              ))}

              <p className="mt-3">{t("ex4.altResult")}</p>
            </section>

            {/* Forex */}
            <section className="mt-16">
              <h2 className="text-2xl font-semibold mb-2 border-b pb-2">
                {t("forex.sectionTitle")}
              </h2>

              <h3 className="font-semibold mt-4">
                {t("forex.tableTitle")}
              </h3>

              <div className="overflow-x-auto mt-3">
                <table className="w-full border text-sm rounded-lg overflow-hidden shadow-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      {["code", "base", "category", "type"].map((h) => (
                        <th
                          key={h}
                          className="border px-3 py-2 font-medium"
                        >
                          {t(`forex.headers.${h}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {forexTable.map((row, idx) => (
                      <tr
                        key={idx}
                        className="odd:bg-white even:bg-gray-50"
                      >
                        <td className="border px-3 py-2">{row.kode}</td>
                        <td className="border px-3 py-2">{row.dasar}</td>
                        <td className="border px-3 py-2">
                          {row.kategori}
                        </td>
                        <td className="border px-3 py-2">{row.tipe}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="font-semibold mt-6">
                {t("forex.formulaTitle")}
              </h3>
              <p className="mt-2">
                <span className="font-semibold">
                  {t("forex.directRatesTitle")}:
                </span>{" "}
                {t("forex.directFormula")}
              </p>
              <p>
                <span className="font-semibold">
                  {t("forex.indirectRatesTitle")}:
                </span>{" "}
                {t("forex.indirectFormula")}
              </p>

              {/* Contoh Forex */}
              <h4 className="font-semibold mt-10">
                {t("forex.examplesTitle")}
              </h4>

              {/* Example 1 */}
              <h4 className="font-semibold mt-2">
                {t("forex.ex1.title")}
              </h4>
              <p>{t("forex.ex1.p1")}</p>
              {[
                t("forex.ex1.f1"),
                t("forex.ex1.f2"),
                t("forex.ex1.f3"),
                t("forex.ex1.f4"),
              ].map((f, i) => (
                <pre
                  key={i}
                  className="bg-gray-50 border border-gray-200 p-3 rounded text-sm whitespace-pre-wrap mt-2"
                >
                  {f}
                </pre>
              ))}
              <p className="mt-2">{t("forex.ex1.result")}</p>

              {/* Example 2 */}
              <h4 className="font-semibold mt-6">
                {t("forex.ex2.title")}
              </h4>
              <p>{t("forex.ex2.p1")}</p>
              {[t("forex.ex2.f1"), t("forex.ex2.f2")].map((f, i) => (
                <pre
                  key={i}
                  className="bg-gray-50 border border-gray-200 p-3 rounded text-sm whitespace-pre-wrap mt-2"
                >
                  {f}
                </pre>
              ))}
              <p className="mt-2">{t("forex.ex2.result")}</p>

              <p className="mt-4 font-semibold">
                {t("forex.ex2.altHeading")}
              </p>
              {[
                t("forex.ex2.af1"),
                t("forex.ex2.af2"),
                t("forex.ex2.af3"),
              ].map((f, i) => (
                <pre
                  key={i}
                  className="bg-gray-50 border border-gray-200 p-3 rounded text-sm whitespace-pre-wrap mt-2"
                >
                  {f}
                </pre>
              ))}
              <p className="mt-2">{t("forex.ex2.altResult")}</p>
            </section>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
