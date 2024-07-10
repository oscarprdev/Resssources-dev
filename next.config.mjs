/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, context) => {
		config.experiments = {
			...config.experiments,
			asyncWebAssembly: true,
		};
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev',
				port: '',
				pathname: '**',
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '10mb',
		},
		serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium-min'],
	},
};

export default nextConfig;
