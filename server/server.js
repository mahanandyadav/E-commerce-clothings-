const path=require('path');
const express=require('express');

const app=express();
const publicPath=path.resolve(__dirname,'..','dist');
const port=process.env.PORT || 3001;
app.use(express.static(publicPath));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(publicPath,'index.html'));
})

app.listen(port,()=>{
    console.log('server is up on port '+port)
})