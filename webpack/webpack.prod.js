const webpack=require('webpack');
module.exports={
    mode:'production',
    performance: {
        hints: false
    },
    devtool: 'source-map',
    plugins:[
        new webpack.DefinePlugin({
            'process.env.name':JSON.stringify('Anurag Production')
        })
    ]
}