import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Iproduct } from "../interfaces/product"
import { message } from "antd"
import axios from "axios"


const useProductMutation = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey:['PRODUCT'],
        mutationFn:async(option:{action:string,product:Iproduct})=>{
                switch (option.action) {
                    case 'add':
                        try {
                            await axios.post('http://localhost:3000/products',option.product)
                            message.success('Thêm thành công')
                        } catch (error) {
                            console.log(error)
                        }
                        break;
                        case 'delete':
                            try {
                                await axios.delete(`http://localhost:3000/products/${option.product.id}`)
                                message.success('Xóa thành công')
                            } catch (error) {
                                console.log(error)
                            }
                            break;
                            case 'update':
                                try {
                                    await axios.put(`http://localhost:3000/products/${option.product.id}`,option.product)
                                    message.success('Cập nhật thành công')
                                } catch (error) {
                                    console.log(error)
                                }
                                break;
                    default:
                        break;
                }
        },
        onSuccess() {
            queryClient.invalidateQueries({queryKey:['PRODUCT']})
        }
    })
  return mutation
}

export default useProductMutation