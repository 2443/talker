import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

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
