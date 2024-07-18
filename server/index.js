import express   from "express";
import bodyParser  from "body-parser";
import helmet   from "helmet";
import cors   from "cors";
import path from "path"
import { fileURLToPath } from "url";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

import db from "./db/db.js"
import "./models/index.js"
import userRouter from './routes/userRouter.js' 
import postRouter from './routes/postRouter.js'
import likeRouter from './routes/like.js' 
import commentRouter from './routes/commentRouter.js' 
import authRouter from './routes/authRouter.js' 





/*CONFIGURATION */
const __filename=fileURLToPath(import.meta.url)
const _dirname=path.dirname(__filename)
dotenv.config() 
const app=express()
 
//* 
app.use(express.json())
app.use(helmet());
app.use(cors())
//app.use("/assets",express.static(path.join(_dirname, "./public")))
//app.use('/assets', express.static(path.join(_dirname, 'public')));
app.use(express.static("public"))

app.use(cookieParser())

app.use('/user',userRouter)
app.use('/post',postRouter)
app.use('/comments',commentRouter)
app.use('/auth',authRouter)
app.use('/likes',likeRouter)


const port =3000;

app.get('/',(req,res)=>{
    res.send('ok')
})

db.sync(/*{force:true}*/)

.then(console.log('Connexion reussi a la base de donner '))
.catch(err =>console.log(err))
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  })
  


