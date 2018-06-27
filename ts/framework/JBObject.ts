//{INSERTORDER:1}

namespace seven {
    export class JBObject implements IJBObject {
		//AutoGeneratedClassName-start - do not eidt this line
		public static classname:string = "seven.JBObject";
		public getClassName():string{return JBObject.classname;}
		//AutoGeneratedClassName-end - do not eidt this line
        constructor() {
            ClassLoader.manager().hasLoaded(this.getClassName());
        }
      
        public equals(object: Object): boolean {
            if (object == undefined) {
                return false;
            }
            return object == this;
        }

        public hasBeenLoaded(): void {
        }

        public hashcode(): number {
            return 0;
        }
        public toString(): string {
            return this.getClassName();
        }
        public copyAttributes(toObject: JBObject): void {
        }
        public copy(): JBObject {
            var newObject: JBObject = new JBObject();
            this.copyAttributes(newObject);
            return newObject;
        }
    }
}