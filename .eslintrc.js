module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "babel-eslint",
  "plugins": [
    "babel",
    "react"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true
    }
  },
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "rules": {
  }
};
