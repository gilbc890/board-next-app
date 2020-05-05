const webpack = require('webpack')
const dotenv = require('dotenv');
dotenv.config();

const { parsed: localEnv } = require('dotenv').config()

module.exports = {
  /* config options here */
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))

    return config
  }
}
