namespace seven {
    export class ViewUtility {
    constructor(){
    }
    public static randomColor(){

     return '#' + this.hex(this.rg(1, 10)) + this.hex(this.rg(1, 10)) + this.hex(this.rg(1, 15)) +
         this.hex(this.rg(1, 15)) + this.hex(this.rg(1, 15)) + this.hex(this.rg(1, 15));
    }

    public static rg(m, n) {
        return Math.floor(Math.random() * (n - m + 1)) + m;
    }

    public static hex(i) {
        return i.toString(16);
    }
}
}