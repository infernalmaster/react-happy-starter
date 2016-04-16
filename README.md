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
* [ImageMin](https://github.com/imagemin/imagemin) for PNG, JPEG, GIF and SVG images minification


### Usage

```
npm install
npm start
Open http://localhost:5000
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

TODO:
  1. fix: wrong path for background images when using source maps
  2. fix: path for assets without 'src' there:  /dist/src/partials/c.png?8d852b551c92095699e726fc06a02dea
  3. https://github.com/airbnb/enzyme + https://github.com/substack/tape
  4. https://facebook.github.io/immutable-js/
