import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';

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

Talker.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(Talker);
