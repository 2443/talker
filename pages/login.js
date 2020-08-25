import Link from 'next/link';
import { Card, Form, Input, Button } from 'antd';
import SignLayout from '../components/SignLayout';

import { useState, useCallback, useEffect } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useInput from '../hooks/useInput';
import { login } from '../actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const Login = () => {
  const dispatch = useDispatch();
  const { me, loading } = useSelector((state) => state.user);
  const [email, setEmail, changeEmail] = useInput('');
  const [password, setPassword, changePassword] = useInput('');
  const router = useRouter();

  const onFinish = useCallback(() => {
    dispatch(login({ email, password }));
  }, [email, password]);

  useEffect(() => {
    if (!!me) {
      router.push('/');
    }
  }, [me]); // 후에 ssr 적용

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
        <Form onFinish={onFinish}>
          <Form.Item>
            <Input
              value={email}
              onChange={changeEmail}
              size='large'
              name='user-email'
              type='email'
              placeholder='Email'
              prefix={<UserOutlined />}
              required={true}
            />
          </Form.Item>
          <Form.Item>
            <Input
              value={password}
              onChange={changePassword}
              size='large'
              name='user-password'
              type='password'
              placeholder='Password'
              prefix={<LockOutlined />}
              required={true}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type='primary' htmlType='submit' loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </SignLayout>
  );
};

export default Login;
