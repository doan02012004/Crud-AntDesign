import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


const useProductQuery = (id?:string|number|undefined) => {

    const query = useQuery({
        queryKey:['PRODUCT',id],
        queryFn: async()=>{
            try {
                const res = id? await axios.get(`http://localhost:3000/products/${id}`) : await axios.get(`http://localhost:3000/products`)
                return res.data
            } catch (error) {
                console.log(error)
            }
        }
    })

  return query
}

export default useProductQuery