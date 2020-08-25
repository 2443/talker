import Link from 'next/link';
import styled from '@emotion/styled';
import { Card, Form, Input, Button } from 'antd';
import SignLayout from '../components/SignLayout';

import { useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <SignLayout>
      <Card
        style={{ width: '400px' }}
        title='로그인'
        extra={
          <Link href='/signup'>
            <a>회원가입</a>
          </Link>
        }
      >
        <Form>
          <Form.Item>
            <Input
              size='large'
              name='user-email'
              type='email'
              placeholder='Email'
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Input
              size='large'
              name='user-password'
              type='password'
              placeholder='Password'
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </SignLayout>
  );
};

export default Login;
