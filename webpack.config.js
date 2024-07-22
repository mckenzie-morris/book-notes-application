import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

// handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    // clean the output directory before emit
    clean: true,
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Mckenzie's Brewery Notes",
      filename: 'index.html',
      template: 'views/index.ejs',
    }),
  ],
  devServer: {
    static: {
      // serve files from this location
      directory: path.resolve(__dirname, 'dist'),
    },
    // which port to serve from
    port: 3000,
    // open a new tab automatically
    open: true,
    // use hot module reloading
    hot: true,
    // enable gzip compression
    compress: true,
    //
    historyApiFallback: true,
    // watch for changes in the views directory
    watchFiles: ['views/**/*.ejs'],
  },
};
