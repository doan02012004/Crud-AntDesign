import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
    const navigate = useNavigate()
    const onSubmit = async(user:{email:string,password:string})=>{
        try {
            const data =  await axios.post('http://localhost:3000/signin',user)
            message.success("Đăng nhập thành công")
            localStorage.setItem('user',JSON.stringify(data.data))
            navigate('/')
        } catch (error) {
            console.log(error)
            message.error("Đăng nhập thất bại")
        }
    }
  return (
    <div className='flex justify-center items-center'>
            <div className='w-[500px] border rounded-lg p-5'>
            <Form layout="vertical" onFinish={onSubmit}>
                        <Form.Item
                        label="Email"
                        name="email"
                        rules={[{required:true, message:"Không được để trống"},{type:'email', message:"Không đúng định dạng"}]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                        label="Email"
                        name="password"
                        rules={[{required:true, message:"Không được để trống"},{min:6, message:"Ít nhất 6 ký tự"}]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button  type="primary" htmlType="submit">Đăng nhập</Button>
                            <Link to='/signup' className='mt-4 block'>Đăng ký</Link>
                        </Form.Item>
                    </Form>
            </div>
    </div>
  )
}

export default SignIn