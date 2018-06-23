module.exports = {
  "extends": "google",
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "env": {
    "node": true,
    "es6": true
  },
  "rules": {
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": false,
        "ClassDeclaration": false,
        "ArrowFunctionExpression": false,
        "FunctionExpression": false
      }
    }],
    "linebreak-style": 0,
    "new-caps": {
      "properties": false,
      "capIsNew": false
    }
  }
};