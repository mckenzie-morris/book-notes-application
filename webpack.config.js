import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

// handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: {index: path.resolve(__dirname, 'src/main.js'), notes: path.resolve(__dirname, 'src/notes.js')},
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    // clean the output directory before emit
    clean: true,
    assetModuleFilename: '[name][ext]',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ],
  },
  // 'chunks' specifies which js bundle to inject into the generated HTML file
  plugins: [
    new HtmlWebpackPlugin({
      title: "Mckenzie's Brewery Notes",
      filename: 'index.html',
      template: 'views/index.ejs',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: "Brewery Notes",
      filename: 'notes.html',
      template: 'views/notes.ejs',
      chunks: ['notes']
    }),
  ],
  devServer: {
    static: {
      // serve files from this location
      directory: path.resolve(__dirname, 'dist'),
    },
    // which port to serve from
    port: 8080,
    // open a new tab automatically
    open: true,
    // use hot module reloading
    hot: true,
    /* enable gzip compression- compression algo that compresses 
    both static and dynamic files transmitted to client by DevServer (only if
    'Accept-Encoding' header is present on client's HTTP request) */
    compress: true,
    // redirects all 404 responses to index.html file
    historyApiFallback: {
      // serve different files at different endpoints
      rewrites: [
        {from: /^\/$/, to: 'index.html'},
        {from: /^\/notes/, to: '/notes.html'},
      ]
    }
    // watch for changes in the views directory
    // watchFiles: ['views/**/*.ejs'],
  },
};
