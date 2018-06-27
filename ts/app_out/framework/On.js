var seven;
(function (seven) {
    class On {
        constructor() {
            this.registry = {};
        }
        getClassName() { return seven.On.classname; }
        static on() {
            if (On._instance == undefined) {
                On._instance = new On();
            }
            return On._instance;
        }
        register(key, method) {
            if (this.registry[key] == undefined) {
                this.registry[key] = new Array();
            }
            this.registry[key].push(method);
        }
        call(key, args = undefined) {
            if (this.registry[key] == undefined) {
                return;
            }
            for (let method of this.registry[key]) {
                method.call(this, args);
            }
        }
    }
    //AutoGeneratedClassName-start - do not eidt this line
    On.classname = "seven.On ";
    seven.On = On;
    function on(action, method) {
        On.on().register(action, method);
    }
    seven.on = on;
    function onWindowLoad(method) {
        On.on().register("windowDidLoad", method);
    }
    seven.onWindowLoad = onWindowLoad;
})(seven || (seven = {}));
