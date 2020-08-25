import Head from 'next/head';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

const Talker = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>Talker</title>
      </Head>
      <Component />
    </>
  );
};

export default MyApp;
