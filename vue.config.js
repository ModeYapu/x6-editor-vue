const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");

let config = {
    configureWebpack: (config) => {
        config.output = Object.assign(config.output, {
          library: "x6editor",
          libraryTarget: "var"
        })
      if(process.env.NODE_ENV === 'production') {
          config.mode = 'production'
          config.plugins.push(new EsmWebpackPlugin())
      }
    }
  
}
module.exports = config