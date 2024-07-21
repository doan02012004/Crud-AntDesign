/* eslint-disable @typescript-eslint/no-explicit-any */


import { Button, Form, Input, InputNumber, Popconfirm, Space, Table } from 'antd'
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'

function App() {

  const columns = [
    {
      title:"Tên sản phẩm",
      dataIndex:"name",
      key:"name"
    },
    {
      title:"Ảnh",
      dataIndex:"image",
      key:"image",
      render: (image:string)=>(
        <>
            <div className=' size-12 rounded-full overflow-hidden'>
              <img src={image} className='w-full h-full object-cover' />
            </div>
        </>
      )
    },
    {
      title:"Giá",
      dataIndex:"price",
      key:"price"
    },
    {
      title:"Mô tả",
      dataIndex:"description",
      key:"description"
    },
    {
      title:"Chức năng",
      key:"actions",
      render: (product:any)=>(
          <Space>
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn có muốn xóa không?"
              okText="Có"
              cancelText="Không"
              // onConfirm={}
            >
              <Button type='primary' danger><DeleteOutlined /></Button>
            </Popconfirm>
            <Link to={'/'}><Button type='primary' className='bg-yellow-500'><EditOutlined /></Button></Link>
          </Space>
      )
    },
  ]
  const data = [
    {
      name:"Sản phẩm A",
      image:"http://picsum.photos/id/34/400/400",
      price:300,
      description:"Mô tả sản phẩm",
      key:1
    }
  ]
  return (
    <>
        

        {/* Table  */}
        <div className=' container mx-auto mt-6'>
            <h1 className=' font-bold text-2xl text-center mb-4'>Danh sách sản phẩm</h1>
            <Space className='mb-4'>
              <Link to=""><Button type='primary'><PlusOutlined /> Sản phẩm</Button></Link>
              <Link to=""><Button type='primary'><UserOutlined /> Đăng nhập</Button></Link>
            </Space>
            <Table columns={columns} dataSource={data}  />
        </div>
        
        {/* Form  */}
        <div className='w-[550px] mx-auto mt-20'>
            <h3 className='text-xl font-bold text-center mb-3'>Thêm sản phẩm</h3>
            <Link to={'/'} className='block mb-3'><Button type='primary' danger>Quay lại</Button></Link>
            <Form
            name='basic'
             layout='vertical'
            //  onFinish={}
             >
              <Form.Item
              label="Tên sản phẩm"
              name='name'
              rules={[{required:true,message:"Không để trống!"}]}
              >
                <Input />
              </Form.Item>
              <Form.Item
              label="Ảnh sản phẩm"
              name='image'
              rules={[{required:true,message:"Không để trống!"}]}
              >
                <Input />
              </Form.Item>
              <Form.Item
              label="Giá"
              name='price'
              rules={[{required:true,message:"Không để trống!"}]}
              >
                <InputNumber className='w-full' />
              </Form.Item>
              <Form.Item
              label="Mô tả sản phẩm"
              name='description'
              rules={[{required:true,message:"Không để trống!"}]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>Submit</Button>
              </Form.Item>
            </Form>
        </div>
    </>
  )
}

export default App
