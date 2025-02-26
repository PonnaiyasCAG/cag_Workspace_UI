"use client";
import React, { useState } from 'react'
import Link from 'next/link';
import { Button, Dropdown, Space, Menu } from 'antd';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import cagimg from '../../../assets/logimg-Photoroom.png'
import Image from 'next/image';
import { UserOutlined, ToolOutlined, DatabaseOutlined, CheckCircleOutlined, SettingOutlined, MenuOutlined, LogoutOutlined, LoginOutlined, AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from '@ant-design/icons'; // Import the icon

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer">
          SignIn
        </a>
      ),
      icon: <LoginOutlined />
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Signout
        </a>
      ),
      icon: <LogoutOutlined />,
      disabled: false,
    },


  ];

  //SideMenu Datas
  const Sidemenuitems2 = [
    {
      key: '1',
      icon: <MenuOutlined />,
      label: 'Menu',
    },
  ]
  //SideMenu Datas
  const Sidemenuitems = [
    {
      key: '1',
      icon: <ToolOutlined />,
      label: 'Tools',
    },
    {
      key: '2',
      icon: <DatabaseOutlined />,
      label: 'Databases',
    },
    {
      key: '3',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      key: 'sub1',
      label: 'Subscription',
      icon: <CheckCircleOutlined />,
    },
    {
      key: 'sub2',
      label: 'Profile',
      icon: <UserOutlined />,
      children: [
        {
          key: '9',
          label: 'Profile Setting',
        },
        {
          key: '10',
          label: 'Profile Update',
        },
      ],
    },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (

    <>
      <Navbar className='bg-white items-center h-40' onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          {/* <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          /> */}
          {/* <Button onClick={toggleCollapsed} className='border-black bg-white ml-2' as={Link} color="primary" href="#" variant="flat">
            <MenuOutlined />
          </Button> */}
          <NavbarBrand>
            <Image
              className='cursor-pointer ml-[3rem]'
              src={cagimg}
              width={150}
              height={150}
              alt="Picture of the author"
              priority 
            />
            <a className='text-black font-bold ml-2 text-3xl font-serif'>Ponnaiyas CAG</a>

          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
        
          <NavbarItem>
            <Dropdown
              menu={{
                items,
              }}
            >
              <Button className='border-black bg-white' shape="circle" as={Link} color="primary" href="#" variant="flat">
                <UserOutlined />
              </Button>
            </Dropdown>
          </NavbarItem>

        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>


      <div

        style={{
          width: 256,
        }}
      >
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          onClick={toggleCollapsed}
          inlineCollapsed={collapsed}
          items={Sidemenuitems2}
          className='bg-white'
        />
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={Sidemenuitems}
          className='h-screen bg-white '
        />
      </div>
    </>

  )
}

export default Dashboard