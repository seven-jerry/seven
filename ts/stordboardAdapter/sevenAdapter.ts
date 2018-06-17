namespace storyboard{
    export class SevenAdapter{
        storyboardAdapter:StoryboardSideAdapter;
        registry:{};

        private static _instance:SevenAdapter;
        public static shared():SevenAdapter{
            if(SevenAdapter._instance == undefined){
                var inst = SevenAdapter._instance = new SevenAdapter();
                inst.storyboardAdapter = new StoryboardSideAdapter();
            }
            return SevenAdapter._instance;
        }
        public registerForObjectID(id:string,callback:IObjectLoaded){
            if(this.registry[id] == undefined){
                this.registry[id] = new Array();
            }
            this.registry[id].push(callback);
        }
    }

    export interface IObjectLoaded{
        hasLoadedObject(id:string,object:Object);
    }
}