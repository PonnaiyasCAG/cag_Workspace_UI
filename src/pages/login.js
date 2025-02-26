"use client";
import React, { FormEvent, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Select, Upload, UploadProps } from 'antd';
import Image from 'next/image';
import loginimage from '../../src/assets/logimg-Photoroom.png'
import styles from '../components/styles.module.css';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    console.log('Success:', values);
    router.push('/dashboard');
    setLoading(true);
    // setTimeout(() => {
    //   router.push('/dashboard');
    // }, 1000);
  };

  const handleSignup = () => {
    router.push('/signup');
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <div>
          <Image
            src={loginimage}
            width={200}
            height={200}
            alt="Picture of the author"
            priority
          />

        </div>

        <div className={styles.card}>
          <div className={styles.formstyle}>
            <div className='text-black font-bold text-lg'>Sign In</div>
            <Form
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' },
                {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email!',
                }
                ]}
              >
                <Input placeholder="Abc@gmail.com" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' },
                {
                  pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/,
                  message: 'Password must contain at least 8 characters, one uppercase letter, one special character,number.',
                }
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>


              <Form.Item>
                <Button loading={loading} type="primary" className={styles.submitBtn} htmlType="submit">
                  Submit
                </Button>
              </Form.Item>

              <div className='d-flex justify-content-between' >
                <div className=' cursor-pointer' style={{fontSize:"15px"}}>Forgot Password</div>
                <div onClick={handleSignup} className='cursor-pointer' style={{fontSize:"15px"}}>Sign-up</div>
              </div>
            </Form>
          </div>
        </div>
           <div className="position-absolute bottom-0 w-100 text-center text-lg">
          <div className="py-3">
            <h1 className="mb-1">&copy; 2024, made with by Creative Tim for a better web.</h1>
          </div>
          <h3 className="d-flex justify-content-around gap-5">
            <a href="#" className="text-decoration-none">Ponnaiyas Cag</a>
            <a href="#" className="text-decoration-none">Help</a>
            <a href="#" className="text-decoration-none">Tutorial</a>
          </h3>
        </div>
        </div>
    </>
  )
}

export default Login