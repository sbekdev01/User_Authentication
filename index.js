import express from "express";
import mongoose from "mongoose";
import { engine ,create} from 'express-handlebars';
import { configDotenv } from "dotenv";

import LoginRout from './routes/login.js'
import RegisterRout from './routes/register.js'


const app =express();
const hbs =create({defaultLayout:'main',extname:'hbs'})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(LoginRout);
app.use(RegisterRout)

app.get('/',(req,res)=>{
    res.render('home')
})

mongoose.connect('mongodb://0.0.0.0:27017/user')
.then(()=>{
    console.log('MongoDbga ulanildi');
})
.catch((err)=>{
    console.error('Ulanishda xato=>',err);
})

const PORT = process.env.PORT || 3030
app.listen(PORT,()=>{
    console.log(`port oyoqqa turdi${PORT}`);
})