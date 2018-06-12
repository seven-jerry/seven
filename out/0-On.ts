namespace seven {

    export class On {
        private static _instance;
        private registry: {} = {};
        public static on(): On {
            if (On._instance == undefined) {
                On._instance = new On();
            }
            return On._instance;
        }
        public register(key: string, method: any) {
            if (this.registry[key] == undefined) {
                this.registry[key] = new Array();
            }
            this.registry[key].push(method);
        }
        public call(key:string,args:{} = undefined){
            if(this.registry[key] == undefined){
                return;
            }
            for(let method of this.registry[key]){
                method.call(this,args);
            }
        }
    }
    export function on(action: string, method: () => void) {
        On.on().register(action,method);
    }
    export function onWindowLoad(method: (window:seven.CanvasWindow) => void){
            On.on().register("windowDidLoad",method);
    }
}