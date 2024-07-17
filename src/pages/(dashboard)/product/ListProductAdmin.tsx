import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Popconfirm, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import useProductQuery from '../../../hooks/useProductQuery';
import { DeleteFilled, EditFilled, PlusCircleFilled } from '@ant-design/icons';
import { Iproduct } from '../../../interfaces/product';
import useProductMutation from '../../../hooks/useProductMutation';
import { Link } from 'react-router-dom';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

interface Fidels {
    id?: number,
    key: number;
    name: string;
    image: string;
    price: number;
}





const ListProductAdmin: React.FC = () => {
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [optionForm, setOptionForm] = useState('add')
    const [products, setProducts] = useState([])
    const [id, setId] = useState(null)
    const productQuery = useProductQuery()
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
            render: (imageUrl) => (
                <div className='size-10 rounded-full overflow-hidden'>
                    <img src={imageUrl} className='h-full w-full object-cover' />
                </div>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (product) => (
                <Space size="middle">
                    <Popconfirm
                        title="Delete product"
                        description="Are you sure to delete this product?"
                        onConfirm={() => onRemove(product)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='primary' danger><DeleteFilled /></Button>
                    </Popconfirm>
                    <Button type='primary' onClick={() => { setId(product.id); setOptionForm('update'); setIsOpen(true); form.setFieldsValue(product) }} className='bg-yellow-500'><EditFilled /></Button>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        if (productQuery.data) {
            const newData = productQuery?.data?.map((product: Iproduct) => {
                return {
                    key: product.id,
                    ...product
                }
            })
            setProducts(newData);
        }
    }, [productQuery.data])

    const onRemove = (product: Iproduct) => {
        productMutation.mutation.mutate({ action: "delete", product: product })
    }
    const onSubmit = (formData: Iproduct) => {
        setIsLoading(true)
        setTimeout(() => {
            if(optionForm == 'add') {
                productMutation.mutation.mutate({ action: 'add', product: formData })
            }else{
                const newData = {
                    ...formData,
                    id:id
                }
                productMutation.mutation.mutate({ action: 'update', product: newData })
            }
            setIsLoading(false)
            setIsOpen(false)
        }, 1000)

    }
    return (
        <>
            {productMutation.contextHolder}
            {isOpen && (
                <div className='fixed top-0 left-0 z-50 w-full h-full bg-black/55 flex justify-center items-center'>
                    <div className='w-[500px] border rounded-lg shadow-md bg-white p-4'>
                        <div className=' w-full relative mb-5'>
                            <h1 className='text-xl font-bold text-center'>{optionForm == 'add' ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}</h1>
                            <button onClick={() => { setIsOpen(false), form.resetFields() }} className=' absolute top-0 right-2 size-8 border hover:bg-fuchsia-800 hover:text-white rounded-full'>X</button>
                        </div>
                        <Form form={form} name='basic' layout='vertical' onFinish={onSubmit}>
                            <Form.Item<Fidels>
                                label="Tên sản phẩm"
                                name='name'
                                rules={[{ required: true, message: "Bắt buộc nhập tên sản phẩm" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item<Fidels>
                                label="Ảnh sản phẩm"
                                name='image'
                                rules={[{ required: true, message: "Bắt buộc nhập ảnh sản phẩm" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item<Fidels>
                                label="Giá sản phẩm"
                                name='price'
                                rules={[{ required: true, message: "Bắt buộc nhập giá sản phẩm" }]}
                            >
                                <InputNumber min={0} />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType='submit' type='primary' loading={isLoading}>{optionForm == 'add' ? 'Thêm' : 'Cập nhật'}</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            )}
            <Button type='primary' onClick={() => { setIsOpen(true); setOptionForm('add'); form.resetFields() }} className='flex items-center gap-x-2 mb-3'><PlusCircleFilled />Product</Button>
            <Table columns={columns} dataSource={products} />
        </>
    )
};

export default ListProductAdmin;