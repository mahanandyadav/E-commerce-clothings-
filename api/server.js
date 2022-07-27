const path=require('path');
const express=require('express');
const routeStripePay=require('./server/routeStripePay');
const  routeWebhookStripe= require('./server/routeWebhookStripe');

const app=express();
const port=process.env.PORT || 3001;
console.log(`port ${port} and process.env ${process.env}`)

app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Origin", "*");
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




// app.use(express.json({verify: (req,res,buf) => { req.rawBody = buf }}));
app.post('/webhook', express.raw({type: 'application/json'}),routeWebhookStripe)
app.use(express.json())
app.post('/create-payment-intent',routeStripePay)


const publicPath=path.resolve(__dirname,'ui','dist');
app.use(express.static(publicPath));
console.log(publicPath+"::::::::")
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(publicPath,'index.html'));
})


app.listen(port,()=>{
    console.log('server is up on port '+port)
})