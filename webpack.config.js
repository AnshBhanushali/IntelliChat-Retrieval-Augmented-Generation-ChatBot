const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development', // Change to 'production' for production build
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: './public',
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000', // Proxy API calls to the Flask backend
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
