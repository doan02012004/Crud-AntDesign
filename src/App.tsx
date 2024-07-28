/* eslint-disable @typescript-eslint/no-explicit-any */


import { Button, Form, Input, InputNumber, Popconfirm, Space, Table, Upload, UploadProps } from 'antd'
import { Link } from 'react-router-dom'
import { CloseOutlined, DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { useState } from 'react';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
    }
  };
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <>
          <div className=' size-12 rounded-full overflow-hidden'>
            <img src={image} className='w-full h-full object-cover' />
          </div>
        </>
      )
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Chức năng",
      key: "actions",
      render: (product: any) => (
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
      name: "Sản phẩm A",
      image: "http://picsum.photos/id/34/400/400",
      price: 300,
      description: "Mô tả sản phẩm",
      key: 1
    }
  ]
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      <div className='h-screen bg-[url("https://hanoispiritofplace.com/wp-content/uploads/2018/02/hinh-nen-may-tinh-thien-nhien-dep-kich-thuoc-lon-full-hd-17.jpg")] bg-no-repeat bg-cover bg-center'>
        <div className='w-full h-full bg-black/40'>
          {/* Table  */}
          <div className=' container mx-auto pt-10'>
            <h1 className=' font-bold text-2xl text-center mb-4 text-white'>Danh sách sản phẩm</h1>
            <Space className='mb-4'>
              <Link to=""><Button type='primary'><PlusOutlined /> Sản phẩm</Button></Link>
              <Link to=""><Button type='primary'><UserOutlined /> Đăng nhập</Button></Link>
            </Space>
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>

          <div className='fixed top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center'>
            <div className='w-[650px] relative bg-white rounded-lg p-5'>
              <h3 className='text-xl font-bold text-center mb-3'>Thêm sản phẩm</h3>
              <Button type='primary' className='absolute top-2 right-2 size-9 rounded-full' ><CloseOutlined /></Button>
              <Form
                name='basic'
                layout='vertical'
              //  onFinish={}
              >
                <div className='flex gap-x-4'>
                  <div className='basis-1/2'>
                    <Form.Item
                      label="Tên sản phẩm"
                      name='name'
                      rules={[{ required: true, message: "Không để trống!" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Ảnh sản phẩm"
                      name='image'
                      rules={[{ required: true, message: "Không để trống!" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Giá"
                      name='price'
                      rules={[{ required: true, message: "Không để trống!" }]}
                    >
                      <InputNumber className='w-full' />
                    </Form.Item>
                    <Form.Item
                      label="Mô tả sản phẩm"
                      name='description'
                      rules={[{ required: true, message: "Không để trống!" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button type='primary' htmlType='submit'>Submit</Button>
                    </Form.Item>
                  </div>
                  <div className='basis-1/2'>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                      onChange={handleChange}
                    >
                      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App