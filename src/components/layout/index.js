import React from "react";
import { Layout, Menu } from "antd";
import { CheckCircleOutlined, DatabaseOutlined, MenuOutlined, SettingOutlined, ToolOutlined, UserOutlined, WindowsOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router"; 
import styles from '../styles.module.css'

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: "/dashboard",
    icon: <MenuOutlined />,
    label: "Dashboard",
  },
  {
    icon: <ToolOutlined />,
    label: "Tools",
    children: [
      {
        key: "/tools",
        label: "CAG-RNA Analyzer",
      },
      {
        key: "/tools2",
        label: "Exo seg",
      },
    ],
  },
  {
    key: "/workspace",
    icon: <WindowsOutlined />,
    label: "Workspace",
    // children: [
    //   {
    //     key: "/my-jobs",
    //     label: "My Jobs",
    //   },
    //   {
    //     key: "/my-drive",
    //     label: "My Drive",
    //   },
    // ],
  },
  {
    key: "/database",
    icon: <DatabaseOutlined />,
    label: "Databases",
    children: [
      {
        key: "/m-gen-database",
        label: "M-Gen Database",
      },
    ],
  },
  {
    key: "/settings",
    icon: <SettingOutlined />,
    label: "Settings",
  },
  {
    key: "/subscription",
    icon: <CheckCircleOutlined />,
    label: "Book Services",
    children: [
      {
        key: "/customized-wga",
        label: "Customized Whole Genome Analysis",
      },
      {
        key: "/customized-wea",
        label: "Customized Whole Exome Analysis",
      },
    ],
  },
  {
    key: "/help",
    icon: <InfoCircleOutlined />,
    label: "Help",
  },
  {
    key: "/about",
    icon: <CheckCircleOutlined />,
    label: "About",
  },
  {
    key: "/profile",
    icon: <UserOutlined />,
    label: "Profile",
  },
];

const MenuBar = ({ children }) => {
  const router = useRouter();

  const handleMenuClick = (e) => {
    router.push(e.key);
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div>
          <div className={styles.logo}></div>
          <div style={{ color: "white", fontSize: "30px", fontWeight: "700", fontFamily: "serif" }}>
            Ponnaiya`s CAG
          </div>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[router.pathname]}
          onClick={handleMenuClick}
          style={{ flex: 1, minWidth: 0 }}
          items={items}  // ✅ Updated to use `items` prop instead of `children`
        />
      </Header>
      <Content>{children}</Content>
      {/* <Footer style={{ textAlign: "center", position: "absolute", bottom: "0", width: "100%" }}>
        ©{new Date().getFullYear()} Ponnaiya's CAG
      </Footer> */}
    </Layout>
  );
};

export default MenuBar;
