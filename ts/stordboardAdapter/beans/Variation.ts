namespace storyboard{
    export class Variation {
		//AutoGeneratedClassName-start - do not eidt this line
		public static classname:string = "storyboard.Variation";
		public getClassName():string{return Variation.classname;}
		//AutoGeneratedClassName-end - do not eidt this line
        key:string;
        mask:Mask;
    }
    export class Mask{
        key:string;
        include:Include;
    }
    export class Include{
        reference:string;
    }
}
