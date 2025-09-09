type LikeString<T> = T extends String ? true : false;

let isNumber: LikeString<number>;
let isString: LikeString<string>;

isNumber = false;
isString = true;
