namespace storyboard{
    export abstract class Object extends seven.JBObject{
		//AutoGeneratedClassName-start - do not eidt this line
		public static classname:string = "storyboard.Object";
		public getClassName():string{return Object.classname;}
		//AutoGeneratedClassName-end - do not eidt this line
        public id:string;
        public scene:Scene;
        

        public static unmodifiable(id:string,scene:Scene):Object{
            return new UnmodifiableObject(id,scene);
        }
 
        constructor(id?:string,scene?:Scene){
            super();
            this.id = id;
            this.scene = this.scene;
        }
        public getRect():seven.IRect{
            seven.Logger.error("storyboard - no rect found for object <"+this.id+">");
            return new seven.Rect(0,0,0,0);
        }

        
    }

    class UnmodifiableObject extends Object{
        constructor(id:string,scene:Scene){
            super(id),scene;
        }
    }
}