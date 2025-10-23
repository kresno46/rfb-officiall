import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

const TradingViewSection = () => {
  const { t } = useTranslation('trading');

  return (
    <section className="bg-black text-white mb-5 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Side */}
          <div className="flex-1 text-center lg:text-left">
            <Image
              src="/assets/tradingview.jpg"
              alt={t('tradingView.logoAlt', 'TradingView')}
              width={200}
              height={56}
              className="h-12 md:h-14 w-auto object-contain mx-auto lg:mx-0 mb-4"
              priority
            />
            <p className="text-sm md:text-base leading-relaxed">
              {t('tradingView.description.part1')}
              <span className="font-semibold">{t('tradingView.instruments')}</span>
              {t('tradingView.description.part2')}
              <a
                href="https://www.tradingview.com/screener/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:underline"
              >
                {t('tradingView.stockScreener')}
              </a>
              {t('tradingView.description.part3')}
            </p>
          </div>

          {/* Right Side */}
          <div className="flex-shrink-0">
            <a
              href="https://www.rfbnews.com/index.php/id/analysis/live-chart"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg text-sm md:text-base transition-colors duration-200"
            >
              {t('tradingView.liveChartButton')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingViewSection;
