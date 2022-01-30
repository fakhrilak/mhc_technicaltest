const Event = require("../../models/event")
const Users = require("../../models/users")


exports.Create_Event=async(req,res)=>{
    try{
        const{name,vendor,request_Date} = req.body
        const Search_VendorId = await Users.findOne({_id:vendor})
        if(!Search_VendorId){
            return res.status(404).send({
                message : "Sorry Vendor Not found"
            })
        }
        const create_event = await Event.create({
            ...req.body,
            confirm_Date: "",
            status : "Pending",
            createAt: new Date(),
            reason : ""
        })
        return res.status(200).send({
            message:"Requests Event Added",
            data : create_event
        })
    }catch(err){ 
        console.log(err,"\n==============================================\nSERVER ERROR")
        return res.status(500).send({
            message : "SERVER ERROR"
        })
    }
}

exports.Get_Event=async(req,res)=>{
    try{
        const {_id,role} = req.user
        const {status} = req.query
        if(role == 1){
            if(!status){
                const Cari_Events = await Event.find({}).populate({path : 'vendor',select:'-password'})
                return res.send({
                    message : "Success",
                    data : Cari_Events
                }).status(200)
            }else{
                const Cari_Events = await Event.find({status:status}).populate({path : 'vendor',select:'-password'})
                return res.send({
                    message : "Success",
                    data : Cari_Events
                }).status(200)
            }
            
        }else if(role == 2){
            if(!status){
                const Cari_Events = await Event.find({vendor:_id}).populate({path : 'vendor',select:'-password'})
                return res.send({
                    message : "Success",
                    data : Cari_Events
                }).status(200)
            }else{
                const Cari_Events = await Event.find({status:status}).populate({path : 'vendor',select:'-password'})
                return res.send({
                    message : "Success",
                    data : Cari_Events
                }).status(200)
            }
        }
    }catch(err){
        console.log(err,"\n==============================================\nSERVER ERROR")
        return res.status(500).send({
            message : "SERVER ERROR"
        })
    }
}

exports.Response_Event=async(req,res)=>{
   try{
        const {_id} = req.user
        const {status,reason,confirm_Date,event_id} = req.body
        const Events = await Event.findOne({_id:event_id}).populate({path : 'vendor',select:'-password'})
        if(toString(Events.vendor._id) !== toString(_id)){
            return res.status(400).send({
                message : "Access Denied"
            })
        }
        if (Events.status !== "Pending"){
            return res.status(400).send({
                message : "Access Denied"
            })
        }
        const Edit_Event = await Event.updateOne({_id:event_id},{
            status:status,
            reason:status == "Approve"?"":reason,
            confirm_Date:confirm_Date
        })
        return res.send({
            message:"Success Update"
        }).status(200)
   }catch(err){
        console.log(err,"\n==============================================\nSERVER ERROR")
        return res.status(500).send({
            message : "SERVER ERROR"
        })
   }
}

exports.getUserVendor=async(req,res)=>{
    try{
        const GetUsers = await Users.find({role:2})
        if(GetUsers.length>0){
            return res.status(200).send({
                message:"Success",
                data:GetUsers
            })
        }
        return res.status(400).send({
            message : "Not Found"
        })
    }catch(err){
        console.log(err,"\n==============================================\nSERVER ERROR")
        return res.status(500).send({
            message : "SERVER ERROR"
        }) 
    }
}