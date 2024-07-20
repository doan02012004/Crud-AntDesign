import { Button, Form, Input, InputNumber, Popconfirm, Space, Table } from "antd"
import useProductQuery from "../hooks/useProductQuery"
import { useEffect, useState } from "react"
import { Iproduct } from "../interfaces/product"
import { CloseOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons"
import useProductMutation from "../hooks/useProductMutation"
import { Link } from "react-router-dom"


const Layout = () => {
    const [form] = Form.useForm()
    const [loading,setLoading] = useState(false)
    const [products,setProducts] = useState([] as Iproduct[])
    const [isOpen,setIsOpen] = useState(false)
    const [optionForm,setOptionForm] = useState('add')
    const [id,setId] = useState<number|string>()
    const query = useProductQuery()
    const mutation = useProductMutation()
    useEffect(()=>{
        if(query.data){
            const newProducts = query.data.map((product:Iproduct)=>{
                return {
                    ...product,
                    key:product.id
                }
            })
            setProducts(newProducts)
        }

    },[query.data])
    const columns =[
        {
            title:"Tên sản phẩm",
            dataIndex:"name",
            key:"name"
        },
        {
            title:"Ảnh",
            dataIndex:"image",
            key:"image",
            render:(image:string)=>(
                <>
                    <div className="size-12 overflow-hidden rounded-full">
                        <img src={image} className="h-full w-full object-cover" alt="" />
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
            key:"chức năng",
            render:(product:Iproduct)=>(
                <Space>
                    <Popconfirm title="Xóa sản phẩm" description="Bạn có muốn xóa không?"
                    okText= "Có"
                    cancelText="Không"
                    onConfirm={()=>mutation.mutate({action:'delete',product:product})}
                    >
                        <Button type="primary" danger><DeleteOutlined /></Button>
                    </Popconfirm>
                    <Button onClick={()=>{form.setFieldsValue(product);setOptionForm('update');setIsOpen(true);setId(product.id)}} type="primary" className="bg-yellow-500"><EditOutlined /></Button>
                </Space>
            )
        },
    ]

    const onSubmit = (product:Iproduct) =>{
       setLoading(true)
      setTimeout(()=>{
         if(optionForm == 'add'){
            mutation.mutate({action:'add',product:product})
            setIsOpen(false)
            setLoading(false)
        }else{
            const newProduct = {
                ...product,
                id:id
            }
            mutation.mutate({action:'update',product:newProduct})
            setIsOpen(false)
            setLoading(false)
        }
      },1000)
        
    }
  return (
    <div>
        {isOpen && (
            <div className="fixed z-30 top-0 left-0 w-full h-full bg-black/55 flex justify-center items-center">
                <div className="w-[550px] p-5 relative bg-white rounded-md">
                    <h3 className=" font-bold text-xl text-center mb-4">{optionForm=='add'?'Thêm sản phẩm':'Cập nhật sản phẩm'}</h3>
                    <div onClick={()=>{setIsOpen(false)}} className=" cursor-pointer absolute top-1 right-1 size-10 flex justify-center items-center rounded-full border hover:bg-black hover:text-white"><CloseOutlined /></div>
                    <Form form={form} layout="vertical" onFinish={onSubmit}>
                        <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{required:true, message:"Không được để trống"}]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                        label="Ảnh"
                        name="image"
                        rules={[{required:true, message:"Không được để trống"}]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                        label="Giá"
                        name="price"
                        rules={[{required:true, message:"Không được để trống"}]}
                        >
                            <InputNumber className="w-full" />
                        </Form.Item>
                        <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{required:true, message:"Không được để trống"}]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button loading={loading} type="primary" htmlType="submit">{optionForm=='add'?'Thêm':'Cập nhật'}</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )}
        <div className="container mx-auto mt-5">
            <h1 className="mb-3 font-bold text-xl text-center">Danh sách sản phẩm</h1>
           <Space className=" mb-3">
             <Button  onClick={()=>{setIsOpen(true);form.resetFields()}} type="primary"> <PlusCircleOutlined/>Sản phẩm</Button>
             <Link to="/signin" className="block"><Button>Đăng nhập</Button></Link>
           </Space>
        <Table columns={columns} dataSource={products}/>
        </div>
       
    </div>
  )
}

export default Layout