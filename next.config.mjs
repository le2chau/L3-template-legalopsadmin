/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/L3-template-legalopsadmin',
  images: { unoptimized: true },
  transpilePackages: ['@ui5/webcomponents-react', '@ui5/webcomponents', '@ui5/webcomponents-fiori', '@ui5/webcomponents-icons'],
};

export default nextConfig;
