```javascript
class Super {
    constructor (foo){
        this.foo = foo;
    }
    printFoo() {
        console.log(this.foo)
    }
}

class sub extends Super {
    constructor(foo,bar){
        super(foo);
        this.bar = bar;
    }
}

```

