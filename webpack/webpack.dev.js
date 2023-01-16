const webpack=require('webpack');
const reactRefreshPlugin=require('@pmmmwh/react-refresh-webpack-plugin')

module.exports={
    mode:'development',
    devServer:{
        hot:true
    },
    devtool:'cheap-module-source-map',
    plugins:[
        new webpack.DefinePlugin({
            'process.env.name':JSON.stringify('Anurag Development')
        }),
        new reactRefreshPlugin()
    ]
}