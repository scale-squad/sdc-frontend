const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/client/src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/client/dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [["@babel/plugin-transform-runtime", { regenerator: true }]]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  }
};


