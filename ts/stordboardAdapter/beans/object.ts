namespace storyboard{
    export abstract class Object{
        public id:string;

        public static unmodifiable(id:string):Object{
            return new UnmodifiableObject(id);
        }
 
        constructor(id?:string){
            this.id = id;
        }
    }

    class UnmodifiableObject extends Object{
        constructor(id:string){
            super(id);
        }
    }
}