"use client";
import React, { FormEvent, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Select, Upload, UploadProps } from 'antd';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import loginimage from '../../../assets/logimg-Photoroom.png';
import styles from '../../components/styles.module.css';

const index = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [password, setpassword] = useState('');
    const [megerr, setmsgerr] = useState('Please input your Confirm password!')
    var errormsg = "Please input your Confirm password!"
    const handleEmail = (values) => {
        setpassword(values.target.value)
    }

    const confirmpass = (e) => {
        var confirmp = e.target.value
        if (confirmp === password) {
            // setmsgerr('Correct Inputs')
            errormsg = "Correct Inputs"
        } else {
            errormsg = "Please enter correct Inputs"
            console.log(megerr, 'megerr');
            // setmsgerr('Please enter correct values')

        }
    }

    // Function that handles form submission
    const onFinish = (values) => {
        console.log('Success:', values);
        setLoading(true); 

        setTimeout(() => {
            router.push('/dashboard');
        }, 1000); 
    };
    const handleLogin = () => {
        router.push('/login');
    }

    // Function that handles form submission failure
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className={styles.loginContainer}>

                <div>
                    <Image className={styles.signupimg}
                        src={loginimage}
                        width={200}
                        height={200}
                        alt="Picture of the author"
                        priority
                    />

                </div>

                <div className={styles.card}>
                    <div className={styles.formstyle}>
                        <div className='text-black font-bold text-lg'>Sign Up</div>
                        <Form
                            name="basic"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="User Name"
                                autoComplete="off"
                                name="UserName"
                                rules={[{ required: true, message: 'Please input your User Name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Phone Number"
                                name="PhoneNumber"
                                autoComplete="off"
                                rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="Email"
                                autoComplete="off"
                                rules={[{ required: true, message: 'Please input your Email!' },
                                {
                                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Please enter a valid email!',
                                }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                autoComplete="off"
                                onChange={handleEmail}
                                id="pass"
                                rules={[{ required: true, message: 'Please input your password!' },
                                {
                                    pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/,
                                    message: 'Password must contain at least 8 characters, one uppercase letter, one special character,number.',
                                }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="Confirm Password"
                                name="Confirm password"
                                autoComplete="off"
                                onChange={confirmpass}
                                rules={[{ required: true, message: "Please input your Confirm password!" },
                                {
                                    pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/,
                                    message: 'Password must contain at least 8 characters, one uppercase letter, one special character,number.',
                                }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button loading={loading} type="primary" className={styles.submitBtn} htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>

                            <div className='text-center font-bold text-md'>
                                <h1 onClick={handleLogin} className='hover:text-blue-700 cursor-pointer'>Back to Login</h1>
                            </div>
                        </Form>
                    </div>

                </div>

                <div className='text-black absolute bottom-1 w-full lg:flex lg:justify-around md:flex md:justify-around text-center'>
                    <div className='text-lg font-semibold mt-4'>
                        <h1>© 2024, made with
                            by
                            Creative Tim
                            for a better web.</h1>
                    </div>
                    <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-3 gap-2 text-center text-lg'>
                        <h2 className='hover:text-blue-700 cursor-pointer font-semibold'>Ponnaiyas cag</h2>
                        <h2 className='hover:text-blue-700 cursor-pointer font-semibold'>Help</h2>
                        <h2 className='hover:text-blue-700 cursor-pointer font-semibold'>Tutorial</h2>
                    </div>

                </div>
            </div>
        </>
    )
}

export default index