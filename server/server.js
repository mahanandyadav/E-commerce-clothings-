const path=require('path');
const express=require('express');
const routeStripePay=require('./routeStripePay')

const app=express();
const port=process.env.PORT || 3001;
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "*");
    // res.header("Access-Control-Allow-Credentials", 'true')//true as string
    // res.header('Access-Control-Expose-Headers',
    // 'Date, Etag, Access-Control-Allow-Origin, Set-Cookie, Access-Control-Allow-Credentials')
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
        return res.status(200).send()
    }
    next();
})


/*
const publicPath=path.resolve(__dirname,'..','dist');
app.use(express.static(publicPath));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(publicPath,'index.html'));
})*/

app.post('/create-payment-intent',routeStripePay)



app.listen(port,()=>{
    console.log('server is up on port '+port)
})