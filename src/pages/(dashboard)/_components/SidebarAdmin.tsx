import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'

import {UserOutlined,VideoCameraOutlined,UploadOutlined} from '@ant-design/icons'
import { useSelector } from 'react-redux'
const SidebarAdmin = () => {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const collapsed = useSelector((state:any)=> state.ant.collapsed)
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: (
                <a href="/admin">Products</a>
              ),
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Category',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Attribute',
            },
          ]}
        />
    </Sider>
  )
}

export default SidebarAdmin