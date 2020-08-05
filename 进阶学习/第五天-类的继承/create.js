function create(parentPrototype) {
  function Fn() {};
  Fn.prototype = parentPrototype;
  return new Fn();
}