const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const { name: packageName, dependencies: deps } = require('./package.json');

module.exports = (env) => {
  const analyze = env.analyze !== 'no';
  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: packageName,
        filename: 'remoteEntry.js',
        remotes: {
        },
        exposes: {
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: '>=17.0.0 <18.0.0',
          },
          'react-dom': {
            singleton: true,
            requiredVersion: '>=17.0.0 <18.0.0',
          },
          'react-router-dom': {
            singleton: true,
            requiredVersion: '>=5.2.0 <6.0.0',
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: path.join(__dirname, 'src', 'public', 'index.html'),
        favicon: path.join(__dirname, 'src', 'public', 'favicon.ico'),
      }),
    ],

    mode: 'development',
    devtool: 'source-map',

    output: {},

    resolve: {
      extensions: ['.jsx', '.js', '.json'],
    },

    devServer: {
      port: 5000,
      static: {
        directory: path.join(__dirname, 'public'),
        publicPath: '',
      },
      open: true
    },
  };
};
