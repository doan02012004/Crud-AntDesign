import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Input, Popconfirm, Space, Table } from 'antd'
import { Link } from 'react-router-dom'
import useProductQuery from '../hooks/useProductQuery'
import { useEffect, useState } from 'react'
import { Iproduct } from '../interfaces/product'
import useProductMutation from '../hooks/useProductMutation'
import Search from 'antd/es/input/Search'

const List = () => {
    const [products, setProducts] = useState([] as Iproduct[])
    const query = useProductQuery()
    const mutation = useProductMutation()
    useEffect(()=>{
        if(query.data){
            const newProducts = query.data.map((product:Iproduct)=>(
                {
                    ...product,
                    key:product.id
                }
            ))
           setProducts(newProducts)
        }
    },[query.data])
    //[ data] data => 0
    const columns = [
        {
          title:"Tên sản phẩm",
          dataIndex:"name",
          key:"name",
        filterDropdown:({setSelectedKeys, confirm})=>(
                <Search placeholder="input search text" 
                onSearch={(data)=>{
                    setSelectedKeys([data])
                    confirm()
                }}
                onBlur={()=>{
                    confirm()
                }}
                enterButton />
            ),
            onFilter: (value,record) => (
               record.name.toLowerCase().includes(value.toLowerCase())
            )

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
          render: (product:Iproduct)=>(
              <Space>
                <Popconfirm
                  title="Xóa sản phẩm"
                  description="Bạn có muốn xóa không?"
                  okText="Có"
                  cancelText="Không"
                  onConfirm={()=> mutation.mutate({action:"delete",product:product})}
                >
                  <Button type='primary' danger><DeleteOutlined /></Button>
                </Popconfirm>
                <Link to={`/edit/${product.id}`}><Button type='primary' className='bg-yellow-500'><EditOutlined /></Button></Link>
              </Space>
          )
        },
    ]
  return (
    <>
         {/* Table  */}
         <div className=' container mx-auto mt-6'>
            <h1 className=' font-bold text-2xl text-center mb-4'>Danh sách sản phẩm</h1>
            <Space className='mb-4'>
              <Link to="/add"><Button type='primary'><PlusOutlined /> Sản phẩm</Button></Link>
              <Link to=""><Button type='primary'><UserOutlined /> Đăng nhập</Button></Link>
            </Space>
            <Table loading={query.isLoading? query.isLoading : mutation.isPending} columns={columns} dataSource={products} />
        </div>
    </>
  )
}

export default List