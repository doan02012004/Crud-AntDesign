import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Popconfirm, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import useProductQuery from '../hooks/useProductQuery';
import { Iproduct } from '../interfaces/product';
import useProductMutation from '../hooks/useProductMutation';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
type FieldType = {
  id? :number,
  key?:number,
  name?: string;
  image?: string;
  price?: number;
  description?:string
};



const ProductAdmin: React.FC = () => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [products,setProducts] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [optionForm, setOptionForm] = useState('add')
    const [id,setId] = useState(0)
    const query = useProductQuery()
    const productMutation = useProductMutation()
    const columns: TableProps<DataType>['columns'] = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
          render: (image) => (<div className=' size-10 rounded-full overflow-hidden'>
                    <img src={image} className='h-full w-full object-cover'/>
          </div>),
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Description',
          key: 'description',
          dataIndex: 'description',
        },
        {
          title: 'Action',
          key: 'action',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          render: (_, product:any) => (
            <Space size="middle">
             <Popconfirm
                title="Xóa sản phẩm"
                description="Bạn có muốn xóa không?"
                onConfirm={()=> productMutation.mutation.mutate({action:'delete',product:product})}
                okText="Yes"
                cancelText="No"
             >
                <Button type='primary' danger ><DeleteOutlined /></Button>
             </Popconfirm>
             <Button type='primary' onClick={()=> onHandleUpdate(product)}><FormOutlined /></Button>
            </Space>
          ),
        },
      ];
      useEffect(()=>{
          if(query.data){
            const newData = query.data.map((product:Iproduct) =>{
                return {
                ...product,
                key: product.id
                }
            })
            setProducts(newData)
          }
      },[query.data])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const onHandleUpdate = (product:any) =>{
        form.setFieldsValue(product)
        setIsOpen(true)
        setOptionForm('update')
        setId(product.id)
      }
      const onSubmit = (product:Iproduct) =>{
        setIsLoading(true)
      setTimeout(()=>{
        if(optionForm == 'add'){
          productMutation.mutation.mutate({action:'add',product:product})
          setIsOpen(false)
        }else{
          const newProduct = {
            ...product,
            id: id
          }
          productMutation.mutation.mutate({action:'update',product:newProduct})
          setIsOpen(false)
        }
        setIsLoading(false)
      },1000)
      }
    return (
        <>
        {productMutation.contextHolder}
        {isOpen && (
          <div className=' fixed z-50 top-0 left-0 bg-black/60 w-full h-full flex justify-center items-center'>
            <div className='w-[550px] pt-4 bg-white px-4 rounded-lg'>
              <div className='w-full relative'>
                <h1 className='font-bold text-xl text-center mb-5'>{optionForm == 'add'?'Thêm sản phẩm':'Cập nhật sản phẩm'}</h1>
                <div onClick={()=>{setIsOpen(false); form.resetFields()}} className=' cursor-pointer absolute top-2 right-3 size-7 rounded-full flex justify-center items-center border hover:bg-gray-300'>X</div>
              </div>
              <Form 
              form={form}
              name='basic'
              layout='vertical'
              onFinish={onSubmit}
              >
                <Form.Item<FieldType>
                label="Tên sản phẩm"
                name='name'
                rules={[{required:true, message:"Bắt buộc nhập tên sản phẩm"}]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<FieldType>
                label="Ảnh sản phẩm"
                name='image'
                rules={[{required:true, message:"Bắt buộc nhập ảnh sản phẩm"}]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<FieldType>
                label="Giá sản phẩm"
                name='price'
                rules={[{required:true, message:"Bắt buộc nhập giá sản phẩm"}]}
                >
                  <InputNumber className='w-full'/>
                </Form.Item>
                <Form.Item<FieldType>
                label="Mô tả sản phẩm"
                name='description'
                rules={[{required:true, message:"Bắt buộc nhập mô tả sản phẩm"}]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<FieldType>>
                  <Button type='primary' htmlType='submit' loading={isLoading}>{optionForm == 'add'? 'Thêm':'Cập nhật'}</Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        )}
        <Button type='primary' className='mb-3' onClick={()=>{
          setOptionForm('add')
          setIsOpen(true)
          form.resetFields()
        }}>Thêm sản phẩm</Button>
        <Table columns={columns} dataSource={products}  />
        </>
    )
};

export default ProductAdmin;