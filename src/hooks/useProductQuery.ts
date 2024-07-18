import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


const useProductQuery = () => {
    const query = useQuery({
        queryKey: ['PRODUCT'],
        queryFn: async()=>{
            try {
                const res = await axios.get('http://localhost:3000/products')
                return res.data
            } catch (error) {
                console.log(error)
                
            }
        }
    })
  return query
}

export default useProductQuery