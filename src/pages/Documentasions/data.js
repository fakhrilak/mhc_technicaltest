import json_in_pending from "../../img/json-in-pending.PNG"
import json_in_reject from "../../img/json-in-reject.PNG"
import dbstatus from "../../img/dbstatus.PNG"
import dbcol from "../../img/db-collactions.PNG"
import json_in_approve from "../../img/json-in-Approve.PNG"

import endpoint from "../../img/ENDPOINT.PNG"
import stact from "../../img/stack-and-dependensi.PNG"

import Users from "../../img/Users.PNG"
import Login from "../../img/Login.PNG"
import after_login_vendor from "../../img/after_login_vendor.PNG"
import home_hrd_admin from "../../img/home-hrd-admin.PNG"
import create_new_event from "../../img/create_new_event.PNG"
import just_view from "../../img/just_view_hrd_admin.PNG"

export const data1 = [
    {
        img:dbstatus,
        capt : "Status DB"
    },
    {
        img : json_in_approve,
        capt : "json in approve"
    },
    {
        img : json_in_pending,
        capt : "json in Pending"
    },
    {
        img : json_in_reject,
        capt : "json in reject"
    },
    {
        img : dbcol,
        capt : "dbCol"
    }
]

export const data2=[
    {
        img : endpoint,
        capt : "ENDPOINT TECHNICAL TEST"
    },
    {
        img : stact,
        capt : "STACK IN USE TECHNICAL TEST"
    }
]

export const data3 = [
    {
        img : Users,
        capt : "choose one account, hrd_admin can create a request event. vendor and vendor1 just can approve. 3 users have a same password stt123"
    },
    {
        img : Login,
        capt : "Login area in FrontEnd"
    },
    {
        img: after_login_vendor,
        capt : "After login app direct to path / , this same prosedure when we use hrd_admin or vendor1"
    },
    {
        img  : home_hrd_admin,
        capt : "Home hrd admin is different in navbar, drawing with circle blue"
    },
    {
        img : just_view,
        capt : "View in hrd if data shorted"
    },
    {
        img : create_new_event,
        capt : "hrd admin role create new event"
    }
]