import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Menu, Layout } from 'antd';
import { UserOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Sider } = Layout;

const path = {
  1: '/',
  2: '/chat',
  3: '/setting',
};

const AppLayout = ({ children, index }) => {
  const { me } = useSelector((state) => state.user);

  const router = useRouter();
  useEffect(() => {
    if (!me) {
      router.push('/login');
    }
  }, []); // 후에 SSR로 변경

  const route = (routeIndex) => () => {
    if (Number(index) === routeIndex) {
      return null;
    }
    router.push(path[routeIndex]);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsed={true}>
        <div className='logo' />
        <Menu theme='dark' defaultSelectedKeys={[index]} mode='inline'>
          <Menu.Item key='1' icon={<UserOutlined />} onClick={route(1)} />
          <Menu.Item key='2' icon={<MessageOutlined />} onClick={route(2)} />
          <Menu.Item key='3' icon={<SettingOutlined />} onClick={route(3)} />
        </Menu>
      </Sider>
      {children}
    </Layout>
  );
};

export default AppLayout;
