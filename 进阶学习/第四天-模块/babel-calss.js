'use strict';

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}

var Animal = /*#__PURE__*/ (function () {
  function Animal() {
    _classCallCheck(this, Animal);

    this.name = 'shenjp';
  }

  _createClass(
    Animal,
    [
      {
        key: 'getName',
        value: function getName() {},
      },
    ],
    [
      {
        key: 'getAge',
        value: function getAge() {},
      },
    ]
  );

  return Animal;
})();

_defineProperty(Animal, 'age', 10);



class Animal {
  constructor() {
    this.name = 'shenjp';
  }
  getName() {}
  static getAge() {}
  static age = 10
}