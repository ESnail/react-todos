
# 本项目是关于 react 的个人练习项目 todos，欢迎大家踩 ~~

## react-hook 实现：
- 主要用到了 useState 和 useEffect
- [在线 demo](https://esnail.github.io/react-todos/build/index.html#/todos-hook)
- 效果图：

![react-hooks-todos](https://github.com/ESnail/react-todos/blob/master/screenshot/react-hook-todos.png?raw=true)

## + Eslint

1. `npm run eject`
2. [eslint 参考配置](https://alligator.io/react/linting-react/)
3. `npm install --save-dev eslint eslint-loader babel-loader babel-eslint eslint-plugin-react`
4. 在项目更目录新建 .eslintrc 文件，并配置
```
{
  "parser": "babel-eslint",
  "env": {
    "browser": true
  },
  "extends": "react-app",
  "plugins": [
    "react"
  ],
  "rules": {
    "space-in-parens": [ 0, "always" ],
    "template-curly-spacing": [ 2, "always" ],
    "array-bracket-spacing": [ 2, "always" ],
    "object-curly-spacing": [ 2, "always" ],
    "computed-property-spacing": [ 2, "always" ],
    "no-multiple-empty-lines": [ 2, { "max": 1, "maxEOF": 0, "maxBOF": 0 } ],
    "quotes": [ 1, "single", "avoid-escape" ],
    "no-use-before-define": [ 2, { "functions": false } ],
    "semi": [0, "never"],
    "prefer-const": 1,
    "react/prefer-es6-class": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-curly-spacing": [ 2, "always" ],
    "react/jsx-indent": [ 2, 4 ],
    "react/prop-types": [ 1 ],
    "react/no-array-index-key": [ 1 ],
    "class-methods-use-this": [ 1 ],
    "no-undef": [ 1 ],
    "no-case-declarations": [ 1 ],
    "no-return-assign": [ 1 ],
    "no-param-reassign": [ 1 ],
    "no-shadow": [ 1 ],
    "camelcase": [ 1 ],
    "Extra comma": [0],
    "no-underscore-dangle" : [0, "always"]
  }
}
```

5. 编辑器 vscode 安装插件 eslint, 为了更好的识别 react-hooks 规则，需要安装 `npm install eslint-plugin-react-hooks --save-dev`

```
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  }
}
```

## build 路径为相对地址，能直接访问静态页面，便于展示，在 `package.json` 中加入配置

```
{
  ... // 省略
  "babel": {
    "presets": [
      "react-app"
    ]
  },
  "homepage": "." // 新加入的，修复路径不对。会在路径前加homepage的值
}
```

## 采坑记

1. 用了 `BrowserRouter` 导致打包后页面空白，原因是 `BrowserRouter` 底层是基于浏览器的 `history` 模式实现的，请求地址是 `/index`，会向服务器请求，请求不到就空白了，后面换成 `HashRouter` 就好了。

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
