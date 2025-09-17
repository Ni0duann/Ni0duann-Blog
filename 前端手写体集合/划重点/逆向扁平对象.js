const entry = {
  'a.b.c.dd': '1',
  'a.b.c.f[0]': 1,
  'a.b.c.f[1]': 2,
  'a.d.xx': '2',
  'a.e': '3'
};

function unflatten(obj) {
  let ans = {};
  for (const path in obj) {
    const keys = path.split('.'); // 按点分割
    let cur = ans;
    const isLast = (i) => i === keys.length - 1;
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      const arrayMatch = key.match(/(.*?)\[(\d+)\]$/); // 检测数组形式
      if (arrayMatch) {
        console.log('arrayMatch:', arrayMatch);
        key = arrayMatch[1];
        const index = parseInt(arrayMatch[2]);
        if (!cur[key]) cur[key] = []; // 初始化为数组
        if (isLast(i)) {
          cur[key][index] = obj[path]; // 最后一个，赋值
        } else {
          cur[key][index] = cur[key][index] || {}; // 初始化为对象
          cur = cur[key][index];
        }
      } else {
        isLast(i) ? (cur[key] = obj[path]) : (cur[key] = cur[key] || {}); // 赋值或初始化
        cur = cur[key];
      }
    }
  }
  return ans;
}
let ans = unflatten(entry);
console.log('unflatten:', ans);
console.log('c', ans.a.b.c);
