import React from 'react'
import {data1,data2,data3} from "./data"
const Documentasion = () => {
    

    return (
        <div className="pt-32">
            <p className="ml-10 font-bold text-2xl">DB COLLACTIONS AND JSON</p>
            {data1.map((data,index)=>(
                <div className="mt-10 ml-10" key={index}>
                    <img src={data.img}/>
                    <p>{data.capt}</p>
                </div>
            ))}
            <p className="ml-10 font-bold text-2xl mt-5">BACKEND STACT AND ENDPOINT</p>
            {data2.map((data,index)=>(
                <div className="mt-10 ml-10" key={index}>
                    <img src={data.img}/>
                    <p>{data.capt}</p>
                </div>
            ))}
            <p className="ml-10 font-bold text-2xl mt-5">USER GUIDE</p>
            {data3.map((data,index)=>(
                <div className="mt-10 ml-10" key={index}>
                    <img src={data.img}/>
                    <p>{data.capt}</p>
                </div>
            ))}
        </div>
    )
}

export default Documentasion
