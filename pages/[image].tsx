import Images from 'next/image';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { shuffle } from 'lodash';
const ImagePage = ({ imageUrl, name, color }: any) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>{`${name || 'Tricked has images'}`}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="he uploads them on this website" />
				<meta property="theme-color" content={color} />
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={imageUrl} />
				<meta property="og:image" content={imageUrl} />
			</Head>
			<style jsx global>{`
				html,
				body {
					background: radial-gradient(
						ellipse at bottom,
						#0d1d31 0%,
						#0c0d13 100%
					);
				}
			`}</style>
			<main className={styles.main}>
				<img
					src={imageUrl}
					alt=""
					className={styles.cardImage}
					onClick={() => window.open(imageUrl)}
				/>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Images
							src="/vercel.svg"
							alt="Vercel Logo"
							width={72}
							height={16}
						/>
					</span>
				</a>
			</footer>
		</div>
	);
};
ImagePage.getInitialProps = async ({ query: { image } }: { query: any }) => {
	const imageUrl = `${
		process.env.URL || 'http://localhost:3000'
	}/api/raw/${image}`;
	const res = await axios(
		`${process.env.URL || 'http://localhost:3000'}/api/${image}`
	);
	const colors = [
		'#0FF1CE',
		'#FF0000',
		'#8A2BE2',
		'#00CED1',
		'#088DA5',
		'#aa250a',
	];
	const color = Number(res?.data?.style)
		? colors[res.data.style]
		: shuffle(colors)[2];
	return { image, imageUrl, name: res.data.name, color };
};
export default ImagePage;
