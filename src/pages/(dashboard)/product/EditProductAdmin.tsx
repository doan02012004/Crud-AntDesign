import { Button, Form, InputNumber } from 'antd'

import Input from 'antd/es/input/Input';
import React, { useEffect } from 'react'

import { Iproduct } from '../../../interfaces/product';
import useProductMutation from '../../../hooks/useProductMutation';
import { useParams } from 'react-router-dom';
import useProductQuery from '../../../hooks/useProductQuery';

type FieldType = {
    name?: string;
    price?: number;
    image?: string;
};

const EditProductAdmin: React.FC = () => {
    const {id} = useParams()
    const [form] = Form.useForm();
    const productMutation = useProductMutation()
    const productQuery = useProductQuery(id)
    useEffect(()=>{
        if(productQuery.data){
            form.setFieldsValue(productQuery.data)
        }
    },[id,form,productQuery.data])
    const onSubmit  = (formData:Iproduct)=>{
       const newData = {
        ...formData,
        id:id
       }
        productMutation.mutation.mutate({action:'update',product:newData})
    }
    return (
        <>
        {productMutation.contextHolder}
            <Form
                form={form}
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
                    <Button type="primary" htmlType="submit" >Cập nhật</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default EditProductAdmin