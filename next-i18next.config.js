const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    localeDetection: false,
  },
  localePath: path.resolve('./public/locales'),
  defaultNS: 'common',
  ns: [
    'common',
    'navbar',
    'about-us',
    'produk',
    'berita',
    'market',
    'pengumuman',
    'trading',
    'footer',
    'perusahaan',
    'wakil-pialang',
    'legalitas',
    'fasilitas-layanan',
    'careers',
    'pivot-fibo',
    'historical-data',
    'economic-calendar',
    'hubungi-kami',
    'penarikan',
    'petunjuk-transaksi',
    'regol',
    'video'
  ],
  fallbackLng: 'id',
  react: {
    useSuspense: false,
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'b', 'em'],
  },
  interpolation: {
    escapeValue: false,
  },
  // Optimasi untuk performa
  saveMissing: false,
  returnObjects: true,
  compatibilityJSON: 'v3',
  reloadOnPrerender: false,
  debug: false,
};
