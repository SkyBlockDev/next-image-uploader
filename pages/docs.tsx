import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { CopyBlock, dracula } from 'react-code-blocks';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Tricked images on vercel</title>
				<meta name="description" content="very cool" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				To use this api simply just take this and put it in a .sxcu file
				<CopyBlock
					text={JSON.stringify(
						{
							Version: '1.0.0',
							Name: 'timages.vercel.app',
							RequestMethod: 'POST',
							RequestURL: 'https://timages.vercel.app/api',
							FileFormName: 'image',
							Headers: {
								style: '4 ( or anything as string )',
								name: 'The title of the webpage will default to tricked images',
							},
							Arguments: {
								type: 'file',
							},
							URL: '$json:url$',
							DeletionURL: '$json:delete$',
						},
						null,
						'\t'
					)}
					language={'json'}
					theme={dracula}
					showLineNumbers={true}
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
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	);
}
