const calculator = (function () {
  let result = 0;
  const calc = {
    plus: function (num) {
      result += num;
      return calc;
    },
    minus: function (num) {
      result -= num;
      return calc;
    },
    result: function () {
      return result;
    }
  };

  // 预先绑定所有方法的this
  calc.plus = calc.plus.bind(calc);
  calc.minus = calc.minus.bind(calc);
  calc.result = calc.result.bind(calc);

  return calc;
})();

// 正常调用示例
console.log(calculator.plus(5).minus(2).result()); // 3

// 解构后调用示例
const { plus, minus, result } = calculator;
console.log(plus(3).minus(1).result()); // 5
