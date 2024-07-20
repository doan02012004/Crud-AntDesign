/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from 'antd'
import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
type AuthProps = {
    children:ReactNode
}
const Auth = ({children}:AuthProps) => {

    const dataLocal:any = localStorage.getItem('user')
    const user = JSON.parse(dataLocal)
    console.log(user)
    let check:boolean = false
    if(user.user.id == 1){
        check = true
    }
    else{
        message.error("Bạn không có quyền truy cập")
    }

  return check? children : <Navigate to={'/signin'} />
}

export default Auth