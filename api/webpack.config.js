const path=require('path')
const webpack = require('webpack');

// const dotenv = require('dotenv')
require('dotenv').config()

const environment=process.env.ENVIRONMENT
console.log(`environment:::`+ environment )

let ENVIRONMENT_VARIABLES={
    'process.env.ENVIRONMENT':JSON.stringify('development'),
    'process.env.PORT':JSON.stringify('3080')
}

if(environment==='development'){
    ENVIRONMENT_VARIABLES={
        'process.env.ENVIRONMENT':JSON.stringify('development'),
        'process.env.PORT':JSON.stringify('3001')
    }
}else if(environment='production'){
    ENVIRONMENT_VARIABLES={
        'process.env.ENVIRONMENT':JSON.stringify('production'),
        'process.env.PORT':JSON.stringify('5000')

    }
}

module.exports={
    entry:'./server.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'api.bundle.js',
    },
    target:'node',
    plugins:[
        new webpack.DefinePlugin(ENVIRONMENT_VARIABLES)
    ]
}