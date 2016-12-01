const webpack = require('webpack');
const path = require('path');
const clone = require('js.clone');
const webpackMerge = require('webpack-merge');
const V8LazyParseWebpackPlugin = require('v8-lazy-parse-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const environment = process.env.NODE_ENV || 'development';

export const commonPlugins = [
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
    root('./src/server/server'),
    {}
  ),

  new webpack.LoaderOptionsPlugin({
    minimize: (environment === "development")? false : true,
    debug: (environment === "development")? true : false
  })
];

export var commonConfig = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [ root('node_modules') ]
  },
  context: __dirname,
  output: {
    publicPath: '',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.ts$/,   use: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.scss$/,  use: ['raw-loader', 'sass-loader'], exclude: /node_modules/ },
      { test: /\.(pug|jade)$/, loader: 'pug-html-loader' },
      { test: /\.css$/,  use: 'raw-loader' },
      { test: /\.html$/, use: 'raw-loader' },
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml" }
    ],
  },
  plugins: [
    // Use commonPlugins.
  ]

};

// Client.
export var clientPlugins = [
  new CompressionPlugin({
     asset: "[path].gz[query]",
     algorithm: "gzip",
     test: /\.js$|\.css$|\.pug$|\.html$/,
     threshold: 10240,
     minRatio: 0.8
  }),

  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    compress: {
      warnings: false,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
      negate_iife: false
    },
    sourceMap: true
  })
];

export var clientConfig = {
  target: 'web',
  entry: './src/client/client',
  output: {
    path: root('dist/client')
  },
  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};


// Server.
export var serverPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    mangle: false,
    output: {
      comments: false
    },
    compress: {
      warnings: false,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
      negate_iife: false
    },
    sourceMap: true
  })
];

export var serverConfig = {
  target: 'node',
  entry: './src/server/server',
  output: {
    filename: 'index.js',
    path: root('dist/server'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      { test: /@angular(\\|\/)material/, use: "imports-loader?window=>global" }
    ],
  },
  externals: includeClientPackages(
   [ /@angularclass|angular2-universal-polyfills|@angular|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-|@angular2|ionic|-angular2|-ng2|-ng/ ]
  ),
  node: {
    global: true,
    crypto: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};

export default [
  // Client
  webpackMerge(clone(commonConfig), clientConfig, { plugins: clientPlugins.concat(commonPlugins) }),

  // Server
  webpackMerge(clone(commonConfig), serverConfig, { plugins: serverPlugins.concat(commonPlugins) })
];


// Helpers
export function includeClientPackages(packages, localModule?: string[]) {
  return function(context, request, cb) {
    if (localModule instanceof RegExp && localModule.test(request)) {
      return cb();
    }
    if (packages instanceof RegExp && packages.test(request)) {
      return cb();
    }
    if (Array.isArray(packages) && packages.indexOf(request) !== -1) {
      return cb();
    }
    if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
      return cb(null, 'commonjs ' + request);
    }
    return cb();
  };
}

export function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
