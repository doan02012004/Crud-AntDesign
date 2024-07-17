import { Button, Form, InputNumber } from 'antd'

import Input from 'antd/es/input/Input';
import React from 'react'

import { Iproduct } from '../../../interfaces/product';
import useProductMutation from '../../../hooks/useProductMutation';

type FieldType = {
    name?: string;
    price?: number;
    image?: string;
};

const AddProductAdmin: React.FC = () => {
    const productMutation = useProductMutation()
    const onSubmit  = (formData:Iproduct)=>{
        console.log(formData);
        productMutation.mutation.mutate({action:'add',product:formData})
    }
    return (
        <>
        {productMutation.contextHolder}
            <Form
                name="basic"
                layout="vertical"
                style={{ maxWidth: 450 }}
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                autoComplete="on"
            >
                <h3 className='text-xl font-bold mb-5 text-center'>Thêm sản phẩm</h3>
                <Form.Item<FieldType>
                    label="Name Product"
                    name="name"
                    rules={[{ required: true, message: 'Bắt buộc nhập tên sản phẩm!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="ImageUrl Product"
                    name="image"
                    rules={[{ required: true, message: 'Bắt buộc nhập ảnh sản phẩm!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Price Product"
                    name="price"
                    rules={[{ required: true, message: 'Bắt buộc nhập giá sản phẩm!' }]}
                >
                  <InputNumber min={0} className='w-full' />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Thêm</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AddProductAdmin