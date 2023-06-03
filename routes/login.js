import {Router} from 'express'
import bodyParser from 'body-parser';
import User from '../models/user.js';
import bcrypt from 'bcrypt'

//get
const router =Router();
router.get('/login',(req,res)=>{
    res.render('login')
})
//post
router.post('/login',bodyParser.urlencoded({extended:true}),async(req,res)=>{
    const  borUser=await User.findOne({email:req.body.email});
    if(!borUser){
        console.log('User not found'); 
        res.redirect('/login')
        return false
    };
    const truepass = await bcrypt.compare(req.body.password,borUser.password);
    if(!truepass){
        console.log('Password wrong');
        res.redirect('/login')
        return false
    };
    
    res.redirect('/')
    console.log('all is true',borUser);
})

export default router