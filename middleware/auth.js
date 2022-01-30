const jwt = require('jsonwebtoken');
const Users =  require("../models/users")
exports.auth = async(req, res, next) => {
	let header, token;
    
	if (
		!(header = req.header('Authorization')) ||
		!(token = header.replace('Bearer ', ''))
	)
		return res.status(401).send({ message: 'Unauthorized' });

	try {
		const verified = jwt.verify(token, process.env.SECRET_KEY);
		console.log(verified)
		const Cari_User = await Users.findOne({_id:verified.user_id},"-password")
		// console.log(Cari_User)
		if (Cari_User){
			req.user = Cari_User;
			next();
		}else{
			return res.status(404).send({
				message : "User Not Found",
				auth : false,
				data : null
			})
		}
		
	} catch (error) {
        console.log(token)
		res.status(400).send({ message: error.message });
	}
};

exports.AuthVendor=async(req,res,next)=>{
	try{
		const {role} = req.user
		if(role == 1){
			return res.send({
				message:"Access Denied",
				status : 400
			})
		}
		next()
	}catch(err){
		return res.send({
			message : err.message
		})
	}
}

exports.AuthHRD=async(req,res,next)=>{
	try{
		const {role} = req.user
		if(role == 2){
			return res.send({
				message:"Access Denied",
				status : 400
			})
		}
		next()
	}catch(err){
		return res.send({
			message : err.message
		})
	}
}