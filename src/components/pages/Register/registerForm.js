import React from 'react';
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {
  const history = useHistory();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const onFinish = e => {
    history.push('/login');
  };

  return (
    <Form
      {...layout}
      style={{ width: '450px', margin: 'auto' }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input a password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please enter a valid email!',
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
