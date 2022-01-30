import React,{useEffect, useState} from 'react'
import { API, config, setAuthToken } from '../../config/API'
import { Switch, Route, Redirect, Link, useHistory } from "react-router-dom";
const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [auth,setAuth] = useState(false)
    useEffect(()=>{
        if (localStorage.token) {
            setAuthToken(localStorage.getItem('token'))
            setAuth(true)
        }
    },[])
    const Login=()=>{
        let data = {username:email,password:password}
        API.post("/login",data ,config)
        .then((res)=>{
            localStorage.setItem("token",res.data.token)
            window.location.reload()
        })
        .catch((err)=>{
            alert(err.response.data.message)
        })
    }
    return !auth ? (
        <div className='w-10/12 m-auto pt-10'>
            <div className='h-screen flex bg-gray-bg1'>
                <div className='w-full max-w-md m-auto bg-blue-400  rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                    <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                        Log in to your account 🔐
                    </h1>
                        <div>
                            <label htmlFor='email'>Email / Uname</label>
                            <input
                                type='email'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                placeholder='Email / Uname'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                placeholder='Your Password'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <div className='flex justify-center items-center mt-6'>
                            <button
                                className={`bg-green py-2 px-4 text-sm text-black rounded border border-green focus:outline-none focus:border-green-dark`}
                            onClick={()=>Login()}
                            >
                                Login
                            </button>
                        </div>
                </div>
            </div>
        </div>
    ):(<Redirect to="/"/>)
}

export default Login
