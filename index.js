const express=require("express")
const bcrypt=require("bcrypt")
const cors=require("cors")
const jwt=require("jsonwebtoken")
const app=express()
const saltround=10;
const secretkey="vasu"
app.use(cors({
    origin:"*"
}))
app.use(express.json());

let arr=[]
app.post("/register",(req,res)=>{
    // console.log("welcome")
    const user=req.body;
    const findaccount=arr.find(item=> item.gmail==user.gmail)
    if(findaccount){
        return res.send("your email is already in use")
    }
    user.password=bcrypt.hashSync(user.password,saltround)
    console.log(user.password)
    arr.push(user)
    const token=jwt.sign({user:user.password},secretkey)
    console.log(token)
        
    return res.send({msg:"successfully registered",jwttoken:token})
})
app.post('/login',(req,res)=>{
    const logindetails=req.body;
    console.log(logindetails)
    const findaccount=arr.find(item=> item.gmail==logindetails.gmail)
    if(!findaccount){
        return res.send("your not registered user")
    }
    const validate=bcrypt.compareSync(logindetails.password,findaccount.password)
    if (validate){
        const token=jwt.sign({user:logindetails.password},secretkey)
        console.log(token)
        
        
        return res.send({msg:"your  successfully login",jwttoken:token})
    }
    else{
        return res.send("wrong password")
    }
    // const findaccount=arr.find((item)=>{
    //     item.gmail===logindetails.gmail

    //         // return res.send("user successfully logined")
    //     })
    // console.log(findaccount)
                 
    // // console.log(findaccount)
    // return res.send("successfully login")
})
app.listen(3400,()=>{
    try{
        console.log("server running in 3030 port")
    }
    catch(error){
        console.log(error);
    }
})