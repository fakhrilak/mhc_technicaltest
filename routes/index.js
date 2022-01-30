const express = require('express');
const { register, login, Auth } = require('../controllers/auth');
const { Create_Event, Get_Event, Response_Event, getUserVendor } = require('../controllers/event');
const { auth, AuthHRD, AuthVendor } = require('../middleware/auth');
const router = express.Router();


router.post("/register",register)
router.post("/login",login)
router.get("/auth",auth,Auth)

router.post("/event",auth,AuthHRD,Create_Event)
router.get("/event",auth,Get_Event)
router.patch("/event",auth,AuthVendor,Response_Event)

router.get("/user-vendor",auth,AuthHRD,getUserVendor)
module.exports = router