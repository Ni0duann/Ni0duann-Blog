Array.prototype._reduce = function (callback, initialValue) {
  for (let i = 0; i < this.length; i++) {
    if (i === 0 && initialValue === undefined) {
      initialValue = this[i];
      continue;
    }
    initialValue = callback(initialValue, this[i], i, this);
  }
  return initialValue;
};

console.log([1, 2, 3, 4, 5]._reduce((acc, cur) => acc + cur, 6));
console.log([1, 2, 3, 4, 5]._reduce((acc, cur) => acc + cur));
