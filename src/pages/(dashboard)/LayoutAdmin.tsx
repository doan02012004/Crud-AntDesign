import React from 'react';
import { Layout, theme } from 'antd';
import SidebarAdmin from './_components/SidebarAdmin';
import HeaderAdmin from './_components/HeaderAdmin';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const LayoutAdmin: React.FC = () => {
 
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className=' h-screen'>
     <SidebarAdmin />
      <Layout>
       <HeaderAdmin />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
         <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;