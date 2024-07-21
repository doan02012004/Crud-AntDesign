import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Iproduct } from '../interfaces/product'
import axios from 'axios'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

const useProductMutation = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey:['PRODUCT'],
        mutationFn: async(option:{action:string, product:Iproduct})=>{
            switch (option.action) {
                case 'add':
                    try {
                        await axios.post(`http://localhost:3000/products`,option.product)
                        message.success("Thêm sản phẩm thành công!")
                        navigate('/')
                    } catch (error) {
                       console.log(error) 
                    }
                    break;
             case 'delete':
                    try {
                        await axios.delete(`http://localhost:3000/products/${option.product.id}`)
                        message.success("Xóa sản phẩm thành công!")
                    } catch (error) {
                       console.log(error) 
                       message.error("Xóa sản phẩm thất bại!")
                    }
                    break;
                    case 'update':
                        try {
                            await axios.put(`http://localhost:3000/products/${option.product.id}`,option.product)
                            message.success("Cập nhật sản phẩm thành công!")
                            navigate('/')
                        } catch (error) {
                           console.log(error) 
                        }
                        break;
                default:
                    break;
            }
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['PRODUCT']})
        }
    })
    
  return mutation
}

export default useProductMutation