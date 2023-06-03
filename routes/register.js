import {Router} from 'express'
import bodyParser from 'body-parser';
import User from '../models/user.js';
import bcrypt from 'bcrypt'

const router =Router();
//get
router.get('/register',(req,res)=>{
    res.render('register')
})
//post
router.post('/register',bodyParser.urlencoded({extended:true}), async(req,res)=>{
    const hashedPassword =  await bcrypt.hash(req.body.password,10)
    const userData={
        firstName:req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password:hashedPassword
    }
    const user= await User.create(userData)
    res.redirect('/')
    console.log(user);
})

export default router