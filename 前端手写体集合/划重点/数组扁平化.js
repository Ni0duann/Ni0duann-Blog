function flat(arr) {
  if (!Array.isArray(arr)) {
    return [arr];
  }
  let res = [];
  for (let x of arr) {
    if (Array.isArray(x)) {
      res = res.concat(flat(x));
    } else {
      res.push(x);
    }
  }
  return res;
}

function _flat(arr) {
  if (!Array.isArray(arr)) {
    return [arr];
  }
  let ans = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      ans = [...ans, ..._flat(arr[i])];
    } else {
      ans.push(arr[i]);
    }
  }
  return ans;
}

console.log(_flat([1, 2, [3, 4, [5, 6]]]));
