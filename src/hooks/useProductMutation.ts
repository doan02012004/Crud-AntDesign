/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Iproduct } from '../interfaces/product'
import axios from 'axios'
import { message } from 'antd'
// import { useNavigate } from 'react-router-dom'

const useProductMutation = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const queryClient = useQueryClient()
    // const navigate = useNavigate()
    const mutation = useMutation({
        mutationKey: ['PRODUCT'],
        mutationFn: async (option: { action: string, product: Iproduct | any }) => {
            switch (option.action) {
                case 'add':
                    try {
                        const data = await axios.post('http://localhost:3000/products', option.product)
                        messageApi.open({
                            type: 'success',
                            content: 'Thêm sản phẩm thành công'
                        })
                        // setTimeout(() => {
                        //     navigate('/admin')
                        // }, 1000)
                        return data
                    } catch (error) {
                        return error
                    }
                    break;
                case 'delete':
                    try {
                        await axios.delete(`http://localhost:3000/products/${option.product.id}`)
                        messageApi.open({
                            type: 'success',
                            content: 'Xóa sản phẩm thành công'
                        })
                    } catch (error) {
                        messageApi.open({
                            type: 'error',
                            content: 'Xóa sản phẩm thất bại'
                        })
                        return error
                    }
                    break;
                case 'update':
                    try {
                        const data = await axios.put(`http://localhost:3000/products/${option.product.id}`, option.product)
                        messageApi.open({
                            type: 'success',
                            content: 'Cập nhật sản phẩm thành công'
                        })
                        // setTimeout(() => {
                        //     navigate('/admin')
                        // }, 1000)
                        return data.data
                    } catch (error) {
                        return error
                    }
                    break;
                default:
                    break;
            }

        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['PRODUCT'] })
        }
    })
    return { messageApi, contextHolder, mutation }
}

export default useProductMutation