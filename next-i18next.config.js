const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    // Menghapus localeDetection karena tidak kompatibel dengan Next.js 13+
  },
  localePath: path.resolve('./public/locales'),
  defaultNS: 'common',
  ns: ['common'],
  fallbackLng: 'id',
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
