import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate()
    const onSubmit = async(user:{email:string,password:string})=>{
        try {
            await axios.post('http://localhost:3000/signup',user)
            message.success("Đăng ký thành công")
            navigate('/signin')
        } catch (error) {
            console.log(error)
            message.error("Đăng ký thất bại")
        }
    }
  return (
    <div className='flex justify-center items-center'>
            <div className='w-[500px]'>
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
                            <Button  type="primary" htmlType="submit">Đăng ký</Button>
                        </Form.Item>
                    </Form>
            </div>
    </div>
  )
}

export default SignUp