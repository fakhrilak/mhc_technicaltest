const Users = require("../../models/users")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
exports.Auth = async(req,res)=>{
    try{
        const users = req.user
        return res.status(200).send({
             massage:'Auth Success',
             data:users,
             auth : true
		})
    }catch(error){
        res.status(500).send('Server Error')
    }
}
exports.login=async(req,res)=>{
    try{
        const schema = Joi.object({
			username: Joi.string().min(6).required(),
			password: Joi.string().min(6).required()
		});
		const { error } = schema.validate(req.body);
		if (error)
			return res.status(400).send({
				message: error.details[0].message
			});
        const {username,password} = req.body
        const Cari = await Users.findOne({username})
        if (Cari){
            const validPass = await bcrypt.compare(password, Cari.password);
            if(!validPass){
                return res.status(400).send({
                    message:"Wrong Email or Password",
                })
            }else{
                const token = jwt.sign({user_id:Cari.id},process.env.SECRET_KEY)
                return res.status(200).send({
                token:token,
                message:"Login Success",
                email:Cari.email
                })
            }
        }else{
            return res.status(400).send({
                message:"Not Registered"
            })
        }
        
    }catch(err){
        console.log(err)
        return res.status(500).send({
            message:"Server error"
        })
    }
}

exports.register=async(req,res)=>{
    try{
        const schema = Joi.object({
			email: Joi.string().email().min(6).required(),
            username: Joi.string(),
			password: Joi.string().min(6).required()
		});
        
		const { error } = schema.validate(req.body);
        
		if (error)
			return res.status(400).send({
				message: error.details[0].message
			});
        const {email,password,username} = req.body
        const Cari = await Users.findOne({email:email})
       
        if (Cari){
            return res.send({
                message:"Email is already exist"
            })
        }else{
            const hashedPass = await bcrypt.hash(password,10)
            const user = await Users.create({
                ...req.body,
                password:hashedPass,
                role: "2"
            })
            const token = jwt.sign({user_id:user.id},process.env.SECRET_KEY)
            return res.status(200).send({
                token: token,
                email:user.email,
                message:"Register Success"
            })
        }
    }catch(err){
        return res.status(500).send({
            message:err.message
        })
    }
}
