// webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Ensure the entry point is correct
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
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
      directory: path.join(__dirname, 'public'), // Serve static files from 'public'
    },
    port: 8081, // Ensure this matches your access URL
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'], // Prioritize 'src' directory
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Match .ts and .tsx files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.scss$/, // Match SCSS modules
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true, // Enables CSS Modules
            },
          },
          'sass-loader', // Compiles SCSS to CSS
        ],
      },
      {
        test: /\.scss$/, // Match global SCSS files
        exclude: /\.module\.scss$/, // Exclude SCSS modules
        use: [
          'style-loader',
          'css-loader', // No modules option
          'sass-loader', // Compiles SCSS to CSS
        ],
      },
      {
        test: /\.css$/, // Match global CSS files
        use: [
          'style-loader',
          'css-loader', // No modules option
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Handle image files
        type: 'asset/resource',
      },
      // Add other loaders as needed (e.g., for fonts)
    ],
  },
};
