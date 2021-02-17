const router = require('express').Router()
const jwt = require('jsonwebtoken')
const jwtPassword = require('../Additional/Password')
const CourseModel = require('../models/CourseModel')

router.get('/',(req,res)=>{
    
    CourseModel.find({},(err,courses)=>{
        if(err){
            console.log(err)
            res.json(err)
        }
        if(req.headers.authorization !== null && req.headers.authorization !== undefined){
            let split = req.headers.authorization.split(' ')
            const token = split[1]
            jwt.verify(token,jwtPassword,(err,decoded)=>{
                if(err){
                    res.json({ok:false,courses})
                }
                else{
                    res.json({ok:true, firstName : decoded.firstName, userId : decoded.userId,courses})
                }
            })
        }
        else{
            res.json({ok : false,courses})
        }
    }).limit(12).lean()
    
})

module.exports = router