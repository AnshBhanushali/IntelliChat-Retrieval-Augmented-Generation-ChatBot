
const path = require('path');

module.exports = {
  entry: './index.tsx',
  mode: 'development', 
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    static: path.join(__dirname, '../public'),
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.scss$/,
        use: ['style-loader', { loader: 'css-loader', options: { modules: true } }, 'sass-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
