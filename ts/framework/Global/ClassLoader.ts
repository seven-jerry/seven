//{INSERTORDER:10}
namespace seven {
    /**
     * the ClassLoader registers and loads classes 
     */
    export class ClassLoader {
        private constructedClasses = {};
        private loadClasses = new Array();
        private priorityClass = Array();
        private priorityClasses = {};
        private afterClasses = {};


        private static _instance;
        public static manager(): ClassLoader {
            if (ClassLoader._instance == undefined) {
                ClassLoader._instance = new ClassLoader();
            }
            return ClassLoader._instance;
        }
       
        /**
         * 
         * @param className the fully qualified className
         * <br/>
         * this method is normally defined in the global space and gets loaded when called from the document delegate
         * it is important that the class a has public static method called 'loadedInstance():thisRef'
         * 
         */
        public loadInstance(className: string): void {
            this.loadClasses.push(className);
        }
        public loadInstanceAtPriority(className: string, priority: number): void {
            if (this.priorityClasses[priority] == undefined) {
                this.priorityClasses[priority]= new Array();
            }
            this.priorityClasses[priority].push(className);
        }
        public startLoading(): void {
            var keys = Object.keys(this.priorityClasses).sort((a, b) => {
                return parseInt(a) - parseInt(b);
            });
            for (let key of keys) {
                for (let value of this.priorityClasses[key]) {
                    var classObject = eval(value + ".loadedInstance();");
                }
            }
            for (let className of this.loadClasses) {
                //  try {
                Logger.log(className);
                var classObject = eval(className + ".loadedInstance();");
                /*} catch (e) {
                    Logger.error("ClassLoader - No Class found for classname");
                }*/
            }
        }

        public hasLoaded(classname: string): void {
            this.constructedClasses[classname]=classname;
            if (this.afterClasses[classname] != undefined) {
                var classes = this.afterClasses[classname];
                if (classes == undefined) {
                    return;
                }
                for (let classObj of classes) {
                    this.loadInstance(classObj);
                }
            }
        }
        public getLoadedInstance(classname: string): any {
            this.constructedClasses[classname];
        }
        public after(afterName: string, loadClassName: string): void {
            if (this.afterClasses[afterName] == undefined) {
                this.afterClasses[afterName]= new Array();
            }
            var currentClasses = this.afterClasses[afterName];
            currentClasses.push(loadClassName);
            this.afterClasses[afterName]= currentClasses;
        }
    }
}