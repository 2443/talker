import Link from 'next/link';
import styled from '@emotion/styled';
import { Card, Form, Input, Button, Checkbox } from 'antd';
import SignLayout from '../components/SignLayout';

import { useState } from 'react';
import { UserOutlined, LockOutlined, NotificationOutlined } from '@ant-design/icons';

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <SignLayout>
      <Card style={{ width: '400px' }} title='회원가입'>
        <Form>
          <Form.Item>
            <Input
              size='large'
              name='user-email'
              type='email'
              placeholder='이메일'
              required={true}
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Input
              size='large'
              name='user-nickname'
              placeholder='닉네임'
              required={true}
              prefix={<NotificationOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Input
              size='large'
              name='user-password'
              type='password'
              placeholder='비밀번호'
              required={true}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Input
              style={{ color: 'hotpink' }} // 맞으면 파란색으로 변경
              size='large'
              name='user-password-check'
              type='password'
              placeholder='비밀번호 확인'
              required={true}
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Checkbox>채팅 매너를 잘 지키겠습니다.</Checkbox>
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
