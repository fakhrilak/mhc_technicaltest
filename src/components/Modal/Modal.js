import React from 'react'
import "./Modal.css"
const Modal = (props) => {
  const {show,handleshow,width,heigh,top} = props
  return (
    <div>
        {show? (
        <div className="w-screen">
            <div
            className="justify-center opacity-25 bg-black  fixed inset-0 z-40 outline-none focus:outline-none"
            onClick={()=>handleshow()}
            >
          </div>
          <div className={`fixed left-10 right-10 top-20 lg:top-${top} bg-gradient-to-b from-green-100 shadow-2xl to-blue-400  w-10/12 lg:w-${width} h-${heigh} z-50 rounded-lg m-auto`}>
                {props.children}
          </div>
        </div>
      ) : null}
    </div>
    
  )
}
export default Modal