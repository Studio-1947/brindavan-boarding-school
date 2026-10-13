import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const config = [
  { ignores: ['.next/**', 'out/**', 'legacy/**', 'next-env.d.ts'] },
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // The site is a static export (no image optimizer) and its CSS targets plain <img> tags.
      '@next/next/no-img-element': 'off',
    },
  },
];

export default config;
