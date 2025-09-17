const entry = {
  a: {
    b: {
      c: {
        dd: '1',
        f: [1, 2]
      }
    },
    d: {
      xx: '2'
    },
    e: '3'
  }
};
let ans2 = {};
function dfs(obj, path = '') {
  const isObj = (v) => v !== null && typeof v === 'object';

  // 用可变的 result 累积，减少中间对象分配
  function walk(obj, path, result) {
    if (!isObj(obj)) {
      if (path) result[path] = obj;
      return;
    }

    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        walk(obj[i], `${path}[${i}]`, result);
      }
      return;
    }

    for (const key of Object.keys(obj)) {
      const np = path ? `${path}.${key}` : key;
      walk(obj[key], np, result);
    }
  }

  const result = {};
  walk(obj, path, result);
  return result;
}

ans2 = dfs(entry);
console.log('dfs:', ans2);
