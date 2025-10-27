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
    'careers'
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
  // Hapus konfigurasi yang tidak diperlukan
  saveMissing: process.env.NODE_ENV === 'development',
  returnObjects: true,
  compatibilityJSON: 'v3',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  debug: process.env.NODE_ENV === 'development',
};
