$.fn.doOnce = function(func) {
  var args = Array.prototype.slice.call(arguments,1);
  this.length && func.apply(this, args);
  return this;
};
