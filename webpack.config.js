const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Update the entry path
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'), // Output to 'dist' directory in project root
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    static: {
      directory: path.join(__dirname, 'public'), // Serve static files from 'public' directory
    },
    // Other devServer options
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          { 
            loader: 'css-loader',
            options: { modules: true },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
