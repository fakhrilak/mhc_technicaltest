import React, { useEffect, useState } from 'react'
import logo from "../../img/MHC-Logo-180px.png"
import {data} from "./data"
import {useHistory} from "react-router-dom"
const Navbar = (props) => {
    const [datas,setDatas] = useState(data)
    const [triger,setTriger] = useState(false)
    useEffect(()=>{
        return(()=>{
            setDatas(data)
        })
    },[])
    const histtory = useHistory()
    return (
        <div className="h-28 border-b-2 border-gray-300 fixed z-40 bg-white w-full shadow-lg">
            <div className="w-10/12 m-auto pt-4">
                <a className="float-left">
                    <img src={logo} className="w-6/12" onClick={()=>histtory.push("/")}/>
                </a>
                {props.auth?
                <a className="float-right mt-5 ml-5 cursor-pointer"
                onClick={()=>{
                    localStorage.clear('token')
                    window.location.reload()
                    props.setAuth(null)
                }}
                >
                    Log Out
                </a>:
                <a className="float-right mt-5 ml-5 cursor-pointer"
                onClick={()=>histtory.push("/login")}
                >
                    Log In
                </a>}
                <a className="float-right mt-5 ml-5 cursor-pointer"
                onClick={()=>histtory.push("/doc")}
                >Documentasion</a>
                {props.auth && props.user.role == 1 && <a className="float-right mt-5 ml-5 cursor-pointer"
                onClick={()=>histtory.push("/create-event")}
                >Create Event</a>}
            </div>
        </div>
    )
}

export default Navbar
