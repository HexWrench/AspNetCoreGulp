/// <reference path="typings/main.d.ts" />
/// <reference path="b.ts" />

class a {
    constructor(public greeting: string) { }
    greet() {
        var empty = $.isEmptyObject({});
        var temp = new b(this.greeting);
        temp.greet();
        return "<h1>" + this.greeting + "</h1>";
    }
};
