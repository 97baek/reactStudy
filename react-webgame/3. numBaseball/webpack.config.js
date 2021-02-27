const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "numbaseball-setting",
  mode: "development", // 실서비스에선 production으로 변경
  devtool: "eval", // 빠르게 하겠다는 뜻, 실서비스에선 hidden-source-map
  resolve: {
    // 알아서 파일의 확장자명을 찾아줌
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: ["./client"], // client.jsx가 WordRelay.jsx를 불러오고 있기 때문에 client.jsx만 넣어도 알아서 처리해줌
  }, // 입력

  module: {
    rules: [
      {
        test: /\.jsx?/, // js파일과 jsx파일에 loader 룰을 적용하겠다는 뜻
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env", { targets: { browsers: ["> 5% in KR", "last 2 chrome versions"] } }],
            ["@babel/preset-react"],
          ],
          plugins: ["@babel/plugin-proposal-class-properties", "react-refresh/babel"],
        },
      },
    ],
  }, // entry의 app을 module에 적용시켜 output으로 뺌

  plugins: [new RefreshWebpackPlugin()],

  output: {
    path: path.join(__dirname, "dist"), // 실제 경로. __dirname: 현재 폴더 경로
    filename: "app.js",
    publicPath: "/dist/", // 가상의 경로. node.js에서 express.static과 비슷
  }, // 출력

  devServer: {
    publicPath: "/dist/",
    hot: true,
  },
};
