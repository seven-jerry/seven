namespace seven {
    export class Observer{
		//AutoGeneratedClassName-start - do not eidt this line
		public static classname:string = "seven.Observer";
		public getClassName():string{return Observer.classname;}
		//AutoGeneratedClassName-end - do not eidt this line
    public thisRef;
    public method;
    public userInfo: boolean;
    constructor(thisRef: any, method, userInfo) {
        this.thisRef = thisRef;
        this.method = method;
        this.userInfo = userInfo;
    }

    
}
}