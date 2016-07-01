# React ES6 Webpack Boilerplate

Boilerplate for kick starting a project with the following technologies:
* [React](https://github.com/facebook/react)
* [Babel 6](http://babeljs.io)
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Server](http://webpack.github.io/docs/webpack-dev-server.html)
* [React Transform](https://github.com/gaearon/react-transform-hmr) for hot reloading React components in real time.
* [BrowserSync](https://www.browsersync.io/)
* [Flow like typecheck](https://github.com/codemix/babel-plugin-typecheck) for static and runtime type checking using flow type annotations.
* [PostCSS](http://postcss.org/) with:
    - postcss-import
    - precss
    - colorguard
    - doiuse
    - autoprefixer
    - cssnano
    - [rucksack](http://simplaio.github.io/rucksack): responsiveType, shorthandPosition, quantityQueries, alias, inputPseudo clearFix, fontPath, hexRGBA, easings

* [ImageMin](https://github.com/imagemin/imagemin) for PNG, JPEG, GIF and SVG images minification


### Usage

```
npm install
npm start
```

### Tests

```
npm test
```

```
npm run test:watch
```

### Linting

ESLint with React linting options have been enabled.

```
npm run lint
```

Styles lint

```
npm run stylelint
```

### Build

```
npm run build
