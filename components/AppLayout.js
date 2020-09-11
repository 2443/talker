import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Menu, Layout } from 'antd';
import { UserOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Sider } = Layout;

const path = {
  main: '1',
  rooms: '2',
  setting: '3',
};

const AppLayout = ({ children, index, page, setPage }) => {
  return (
    <Layout style={{ minHeight: '100vh' }} hasSider={true}>
      <Sider collapsed={true} style={{ position: 'fixed', height: '100%' }}>
        <Menu theme='dark' defaultSelectedKeys={[path[page]]} mode='inline'>
          <Menu.Item key='1' icon={<UserOutlined />} onClick={() => setPage('main')} />
          <Menu.Item key='2' icon={<MessageOutlined />} onClick={() => setPage('rooms')} />
          <Menu.Item key='3' icon={<SettingOutlined />} onClick={() => setPage('setting')} />
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 80 }}>{children}</Layout>
    </Layout>
  );
};

export default AppLayout;
