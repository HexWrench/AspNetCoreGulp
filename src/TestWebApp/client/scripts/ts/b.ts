class b {
    constructor(public greeting: string) { }
    greet() {
        var empty = $.isEmptyObject({});
        return "<h1>" + this.greeting + "</h1>";
    }
};