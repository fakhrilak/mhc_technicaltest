import React,{useEffect, useState} from 'react'
import {API,config, setAuthToken} from "../../config/API"
import dayjs from 'dayjs'
import Modal from '../../components/Modal/Modal'
const Home = (props) => {
    const [auth,setAuth] =useState(props.auth)
    const [user,setUser] = useState(props.user)
    const [data,setData] = useState([])
    const [show,setShow] = useState(false)
    const [index,setIndex] = useState(null)
    const [confirmDate,setConfirmDate] = useState(null)
    const [choose,setChoose] = useState(0)
    const [reason,setReason] = useState("")
    useEffect(()=>{
        if (localStorage.token) {
            setAuthToken(localStorage.getItem('token'));
            API.get("/auth",config)
            .then((res)=>{
              if(res.data.auth == false){
                localStorage.removeItem("token")
                window.location.reload()
              }else{
                setAuth(res.data.auth)
                setUser(res.data.data)
              }
            })
            .catch((err)=>{
              alert(err.response.data.message)
            })
        }
        if(auth){
            API.get("/event",config)
            .then((res)=>{
               setData(res.data.data)
               console.log(res.data.data)
            })
            .catch((err)=>{
                alert(err.response.message)
            })
        }
    },[auth])
    const SUBMIT=()=>{
        let newdata = {}
        if (choose == 1){
            newdata = {
                "status":"Approve",
                "reason":"",
                "confirm_Date":confirmDate,
                "event_id":index._id
            }
        }else{
            newdata = {
                "status":"Reject",
                "reason":reason,
                "confirm_Date":"",
                "event_id":index._id
            }
        }
        API.patch("/event",newdata,config)
        .then((res)=>{
            console.log(res)
            window.location.reload()
        })
        .catch((err)=>{
            alert(err.response.message)
        })
        setReason(null)
        setShow(false)
        setIndex(null)
        setConfirmDate(null)
        setChoose(null)
    }
    return (
        <div className="pt-28">
            {!auth ?
            <p className="text-center text-2xl mt-10 font-bold">Plaese Login, To Access Table</p>:
            <div className="w-10/12 m-auto pt-10">
                <div className="mb-5">
                    <p>Name : {user.username}</p>
                </div>
                <table className="w-full table-auto border-2 border-black">
                    <thead>
                        <tr>
                            <th className="border-2 border-black">Even Name</th>
                            <th  className="border-2 border-black">Vendor Name</th>
                            <th  className="border-2 border-black">Confirmed Date</th>
                            <th  className="border-2 border-black">Status</th>
                            <th  className="border-2 border-black">Date created</th>
                            <th  className="border-2 border-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {data.map((data,index)=>(
                                <tr key={index} className="text-center">
                                    <td className="border-2 border-black">{data.name}</td>
                                    <td className="border-2 border-black">{data.vendor.username}</td>
                                    <td className="border-2 border-black">{ data.confirm_Date ?dayjs(data.confirm_Date).format("DD-MM-YYYY"):null}</td>
                                    <td className="border-2 border-black">{data.status}</td>
                                    <td className="border-2 border-black">{dayjs(data.createAt).format("DD-MM-YYYY")}</td>
                                    <td className="border-2 border-black">
                                        <button className="bg-blue-300 w-20 rounded text-white"
                                        onClick={()=>{
                                            setShow(true)
                                            setIndex(data)
                                        }}
                                        >Detail</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table> 
            </div>
            }
            <Modal
            show={show} 
            handleshow={setShow} 
            heigh={"64"} 
            width={"12/12"}
            top={36}
            >
                {index ?<div className="mt-5">
                    <div className="w-11/12 m-auto text-center">
                         <p className="text-2xl font-bold">Detail Request Event</p>
                    </div>
                    <div className="w-8/12 m-auto mt-10 mb-10">
                        <table className="w-full table-auto border-2 border-black">
                            <tbody>
                                <tr>
                                    <td className="border-2 border-black">Event Name</td>
                                    <td className="border-2 border-black">{index.name}</td> 
                                </tr>
                                <tr>
                                    <td className="border-2 border-black">Vendor Name</td>
                                    <td className="border-2 border-black">{index.vendor.username}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black">Confirm Date</td>
                                    <td className="border-2 border-black">{ dayjs(index.confirm_Date).format("DD-MM-YYYY")}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black">Stateus</td>
                                    <td className="border-2 border-black">{index.status}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black">Date Created</td>
                                    <td className="border-2 border-black">{ dayjs(index.createAt).format("DD-MM-YYYY")}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black">Reason</td>
                                    <td className="border-2 border-black">{index.reason}</td>
                                </tr>
                            </tbody>
                        </table>
                        {choose == 1 && <div className="mt-5">
                            <select className="rounded"
                            value={confirmDate}
                            onChange={(e)=>setConfirmDate(e.target.value)}
                            >
                                <option>Select Date</option>
                                {index.request_Date.map((data,index)=>(
                                    <option key={index}
                                    value={data}
                                    >{ dayjs(data).format("DD-MM-YYYY")}</option>
                                ))}
                            </select>    
                        </div>}
                        {choose == 2 && <div className="mt-5">
                        <input
                        type="Text"
                        className="rounded w-full"
                        placeholder="INPUT REASON"
                        value={reason}
                        onChange={(e)=>setReason(e.target.value)}
                        />
                        </div>}
                        {((reason == null || confirmDate == null)&& (user.role == 2) && (index.status == "Pending")) ? <div className="grid grid-cols-2 w-3/6 mt-5 gap-5 mb-5">
                            <button className="rounded bg-green-500 text-white font-bold"
                            onClick={()=>setChoose(1)}
                            >APPROVE</button>
                            <button className="rounded bg-red-500 text-white font-bold"
                            onClick={()=>setChoose(2)}
                            >REJECT</button>
                        </div>:null}

                        {((reason != null || confirmDate != null) && (user.role == 2) && (index.status == "Pending")) &&<div className="mt-5 mb-5">
                            <button className="rounded w-2/6 bg-green-500 text-white font-bold"
                            onClick={()=>SUBMIT()}
                            >Submit Response</button>
                        </div>}
                    </div>
                </div>:null}
            </Modal>
        </div>
    )
}

export default Home
