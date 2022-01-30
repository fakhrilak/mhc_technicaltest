import React, { useEffect, useState } from 'react'
import { API, config,setAuthToken } from '../../config/API'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router-dom';

const CreateEvent = () => {
    const [data,setData] = useState([])
    const [name,setName] = useState()
    const [vendorId,setVendorId] = useState()
    const [time1,setTime1] = useState(null)
    const [time2,setTime2] = useState(null)
    const [time3,setTime3] = useState(null)
    const [auth,setAuth] =useState(null)
    useEffect(()=>{
        API.get("/user-vendor",config)
        .then((res)=>{
            setData(res.data.data)
            setAuth(true)
        })
        .catch((err)=>{
            // alert(err.response.message)
            setAuth(false)
        })
    },[])
    const Crete =()=>{
        const newdata = {name:name,vendor:vendorId,request_Date:[time1,time2,time3]}
        API.post("/event",newdata,config)
        .then((res)=>{
            setName(null)
            setVendorId(null)
            setTime1(null)
            setTime2(null)
            setTime3(null)
            alert(res.data.message)
        })
        .catch((err)=>{
            alert(err.response.message)
        })
    }
    return auth !== false ?(
        <div className="pt-32">
            <div className="w-6/12 m-auto bg-blue-400 rounded">
                <div className="text-center">
                    <p>FORM ADD EVENT</p>
                </div>
                <div className="w-11/12 m-auto">
                   <input
                    type="text"
                    className="text-center w-full m-auto rounded"
                    placeholder="Name Event"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    /> 
                </div>
                <div className="w-11/12 mt-2 m-auto">
                    <select className="w-full rounded"
                    onChange={(e)=>setVendorId(e.target.value)}
                    >
                        <option>Select Vendor</option>
                        {data.map((i,index)=>(
                            <option value={i._id}>{i.username}</option>
                        ))}
                    </select>
                </div>
                <div className="w-11/12 m-auto mt-5 pb-5 grid grid-cols-3 gap-3 text-center">
                    <div>
                        <DatePicker selected={time1} onChange={(date) => setTime1(date)} className="rounded"/>
                    </div>
                    <div>
                        <DatePicker selected={time2} onChange={(date) => setTime2(date)} className="rounded"/>
                    </div>
                    <div>
                         <DatePicker selected={time3} onChange={(date) => setTime3(date)} className="rounded"/>
                    </div>
                </div>
                <div className="w-11/12 m-auto">
                    <button className="w-44 bg-white rounded mb-5"
                    onClick={()=>Crete()}
                    >ADD EVENT</button>
                </div>
            </div>
        </div>
    ):(<Redirect to="/"/>)
}

export default CreateEvent
