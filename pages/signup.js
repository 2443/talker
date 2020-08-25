import styled from '@emotion/styled';
import { Card, Form, Input, Button, Checkbox } from 'antd';
import { useRouter } from 'next/router';
import { UserOutlined, LockOutlined, NotificationOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import SignLayout from '../components/SignLayout';
import { useEffect, useCallback, useState } from 'react';
import useInput from '../hooks/useInput';

const Warning = styled.div`
  color: red;
  font-size: 1.2rem;
`;

const Login = () => {
  const dispatch = useDispatch();
  const { me, loading } = useSelector((state) => state.user);
  const router = useRouter();

  const [email, setEmail, changeEmail] = useInput('');
  const [nickname, setNickname, changeNickname] = useInput('');
  const [password, setPassword, changePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useInput(false);
  const [passwordWarning, setPasswordWaring] = useInput(false);
  const [term, setTerm] = useInput(false);
  const [termError, setTermError] = useInput(null);
  const termChange = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  });

  const changePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(false);
      if (password !== e.target.value) {
        setPasswordWaring(true);
      } else {
        setPasswordWaring(false);
      }
    },
    [password, passwordCheck]
  );

  const onFinish = useCallback(() => {
    if (password !== passwordCheck) {
      setPasswordError(true);
    }
    if (!term) {
      setTermError(true);
    }
  }, [email, nickname, password, passwordCheck, term, termError]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (!!me) {
      router.push('/');
    }
  }, [me]); // 후에 ssr 적용

  return (
    <SignLayout>
      <Card style={{ width: '400px' }} title='회원가입'>
        <Form onFinish={onFinish}>
          <Form.Item>
            <Input
              size='large'
              name='user-email'
              type='email'
              placeholder='이메일'
              required={true}
              value={email}
              onChange={changeEmail}
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Input
              size='large'
              name='user-nickname'
              placeholder='닉네임'
              required={true}
              value={nickname}
              onChange={changeNickname}
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
              value={password}
              onChange={changePassword}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : 'success'}
            help={passwordError ? '비밀번호를 확인해주세요' : null}
          >
            <Input
              style={{ color: passwordWarning ? 'hotpink' : 'blue' }} // 맞으면 파란색으로 변경
              size='large'
              name='user-password-check'
              type='password'
              placeholder='비밀번호 확인'
              required={true}
              value={passwordCheck}
              onChange={changePasswordCheck}
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Checkbox checked={term} onChange={termChange}>
              채팅 매너를 잘 지키겠습니다.
            </Checkbox>
            <br />
            {termError && <Warning>채팅 매너를 잘 지켜야 합니다!</Warning>}
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
