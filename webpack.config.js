const path = require("path");

const buildPath = path.resolve(__dirname, "dist");
const contentPath = path.resolve(__dirname, "public");
const srcPath = path.resolve(__dirname, "src");
const isProd = process.env.NODE_ENV === "production";
const loclahost = "localhost";
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const getSettingsForStyles = (withModules = false) => {
  return [
    MiniCssExtractPlugin.loader,
    !withModules
      ? "css-loader"
      : {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: !isProd
              ? "[path][name]__[local]"
              : "[hash:base64]",
          },
        },
      },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["autoprefixer"],
        },
      },
    },
    "sass-loader",
  ];
};

module.exports = {
  target: !isProd ? "web" : "browserslist",
  entry: path.join(srcPath, "index.tsx"),
  output: {
    path: buildPath,
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(contentPath, "index.html"), // путь до нашего шаблона
      favicon: path.resolve(contentPath, "favicon.ico"),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Для того чтобы файл со стилями не кэшировался в браузере добавим filename
      filename: "[name]-[hash].css",
    }),
    new TsCheckerPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/,
        use: "babel-loader",
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    // теперь при импорте эти расширения файлов можно не указывать
    extensions: [".tsx", ".jsx", ".js", ".ts"],
    alias: {
      components: path.join(srcPath, "@components"),
      config: path.join(srcPath, "@config"),
      styles: path.join(srcPath, "@styles"),
      utils: path.join(srcPath, "@utils"),
      store: path.join(srcPath, "@store"),
      hook: path.join(srcPath, "@hook"),
      App: path.join(srcPath, "@App"),
      pages: path.join(srcPath, "@pages"),
    },
  },
  devServer: {
    host: loclahost, // хост нашего сервера
    port: 3000, // порт по которому к нему можно обращаться
    static: contentPath, // указывает по какому пути лежит index.html
    hot: true,
    historyApiFallback: true,
  },
};
