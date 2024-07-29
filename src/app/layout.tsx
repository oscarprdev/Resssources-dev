import Main from './components/core/containers/Main';
import Footer from './components/core/footer/Footer';
import Header from './components/core/header/Header';
import './globals.css';
import { Toaster } from '@/app/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Resources',
	description: 'Store, find and share your favourites dev resources',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Header />
				<Main>{children}</Main>
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}
