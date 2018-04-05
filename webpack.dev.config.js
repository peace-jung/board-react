var webpack = require('webpack');
var path = require('path');

module.exports = {

  entry: [
    './src/index.js',
    'webpack-dev-server/client?http://process.env.IP:8082',
    'webpack/hot/dev-server',
    './src/style.css'
  ],

  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/'
  },

  // 개발서버 설정
  devServer: {
    hot: true,
    inline: true,
    disableHostCheck: false,
    historyApiFallback: true,
    contentBase: __dirname + '/public/',
    host: "localhost",
    port: 8081,
    proxy: {
      "**": "http://process.env.IP:process.env.PORT" // express 서버주소
    },
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  },


  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
          plugins: ["react-hot-loader/babel"]
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader'
      }
    ]
  },

  resolveLoader: {
    moduleExtensions: ["-loader"]
  },

  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  }

};