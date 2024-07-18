import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Iproduct } from "../interfaces/product"
import axios from "axios"
import { message } from "antd"

const useProductMutation = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ['PRODUCT'],
        mutationFn: async (option: { action: string, product: Iproduct }) => {
            switch (option.action) {
                case 'add':
                    try {
                        const res = await axios.post(`http://localhost:3000/products`, option.product)
                        messageApi.open({
                            type: 'success',
                            content: "Thêm sản phẩm thành công"
                        })
                        return res.data
                    } catch (error) {
                        console.log(error)
                    }
                    break;
                case 'delete':
                    try {
                        await axios.delete(`http://localhost:3000/products/${option.product.id}`)
                        messageApi.open({
                            type: 'success',
                            content: "Xóa sản phẩm thành công"
                        })
                    } catch (error) {
                        console.log(error)
                    }
                    break;
                case 'update':
                    try {
                        await axios.put(`http://localhost:3000/products/${option.product.id}`, option.product)
                        messageApi.open({
                            type: 'success',
                            content: "Cập nhật sản phẩm thành công"
                        })
                    } catch (error) {
                        console.log(error)
                    }
                    break;

                default:
                    break;
            }
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:['PRODUCT']})
        }
    })
    return {mutation,messageApi,contextHolder}
}

export default useProductMutation