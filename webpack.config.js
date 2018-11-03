var path=require('path');
var htmlPlugin=require('html-webpack-plugin');
module.exports={
    entry:'./src/js/index.js',
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'bundle.js'
    },
    devServer:{
        contentBase:'./dist'
    },
    plugins:[
        new htmlPlugin({
            filename:'index.html',
            template:'./src/index.html'
        })
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            }
        ]
    }
}