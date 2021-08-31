import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Header from '@/components/Header';
import useCommonState from '@/store/commom';
import style from './style.less';

const Login: React.FC = () => {
  const { setUserInfo } = useCommonState.useContainer();

  const onFinish = (values: any) => {
    console.log('values: ', values);
    setUserInfo({ name: '用户A' });
    location.href = '/';
  };

  return (
    <main className={style.login}>
      <Header />
      <Form className={style.box} name="login" onFinish={onFinish}>
        <div className={style.title}>欢迎登陆</div>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入手机号'
            }
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码'
            }
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Button className={style.submit} type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};

export default Login;
