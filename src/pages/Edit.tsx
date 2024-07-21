import { Button, Form, Input, InputNumber } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { Iproduct } from '../interfaces/product'
import useProductMutation from '../hooks/useProductMutation'
import { useEffect } from 'react'
import useProductQuery from '../hooks/useProductQuery'

const Edit = () => {
    const [form] = Form.useForm() 
    const {id} = useParams()
    const query = useProductQuery(id)
    const mutation = useProductMutation()
    useEffect(()=>{
            if(query.data){
            form.setFieldsValue(query.data)
            }
    },[id,query.data,form])
    const onSubmit = (product:Iproduct)=>{
        const newProduct = {
            ...product,
            id:id
        }
        mutation.mutate({action:"update", product:newProduct})
    }
  return (
    <>
      {/* Form  */}
      <div className='w-[550px] mx-auto mt-20'>
            <h3 className='text-xl font-bold text-center mb-3'>Thêm sản phẩm</h3>
            <Link to={'/'} className='block mb-3'><Button type='primary' danger>Quay lại</Button></Link>
            <Form
            form={form}
            name='basic'
             layout='vertical'
             onFinish={onSubmit}
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

export default Edit