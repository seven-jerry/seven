namespace seven {
    export class UserDefaults implements IUserDefaultsSetter {

        private static _instance: UserDefaults;
        private objects: JMBMap<UserDefaultKey, any>;
        private localContainer: ILocalStorageAccess;
        private remoteContainer: IRemoteStorageAccess;
        private callback: VoidCallback[];

        /* Object Creation */
        public static defaultManager(): UserDefaults {
            if (UserDefaults._instance == undefined) {
                UserDefaults._instance = new UserDefaults();
                UserDefaults._instance.setLocalContainer(new LocalContainer());
                UserDefaults._instance.setRemoteContainer(new RemoteContainer());
            }
            return UserDefaults._instance;
        }

        public constructor() {
            this.objects = new JMBMap<UserDefaultKey, any>();
            this.callback = new Array();
        }
        /* IUserDefaultsSetter */
        setLocalContainer(localContainer: ILocalStorageAccess) {
            this.localContainer = localContainer;
        }
        setRemoteContainer(remoteContainer: IRemoteStorageAccess) {
            this.remoteContainer = remoteContainer;
        }


        public synchronize(callBack: VoidCallback) {
            this.callback.push(callBack);
            if (this.callback.length > 1) {
                return;
            }
            var that = this;
            setTimeout(function () {
                console.log("start syncing "+that.callback.length);
                that.objects = new JMBMap<UserDefaultKey, any>();
                that.localContainer.synchronize(new UserDefaultStorageCallback(that, that.localStorageReady));
            }, 30);

        }


        private localStorageReady(map: JMBMap<UserDefaultKey, any>) {
            this.fillContainer(map);
            this.remoteContainer.synchronize(new UserDefaultStorageCallback(this, this.remoteStorageReady));
        }
        private remoteStorageReady(map: JMBMap<UserDefaultKey, any>) {
            this.fillContainer(map);

            var tempCall = this.callback;
            this.callback = new Array();
            console.log("remoteStorageReady "+tempCall.length);
            
            for (let callback of tempCall) {
                callback.call();
            }

        }
        private fillContainer(objects: JMBMap<UserDefaultKey, any>) {
            try {
                for (let key of objects.keys()) {
                    var object = objects.get(key);
                    this.objects.put(key, object);
                }
            } catch (e) {
                Logger.error("UserDefaults : setObjects : " + (<Error>e).message);
            }
        }

        public setObjects(objects: JMBMap<UserDefaultKey, any>, type: StoringType, override: Override) {
            try {
                for (let key of objects.keys()) {
                    var object = objects.get(key);
                    this.setObjectForKey(key, object, type, override);
                }
            } catch (e) {
                Logger.error("UserDefaults : setObjects : " + (<Error>e).message);
            }

        }
        public setObjectForKey(key: UserDefaultKey, object: any, type: StoringType, override: Override) {
            if (override == Override.FALSE && this.objects.get(key) != undefined) {
                Logger.error("UserDefaults : setObjectForKey : has object and should not override ");
                return;
            }
            switch (type) {
                case StoringType.ALL:
                    this.localContainer.setObjectForKey(key, object);
                    this.remoteContainer.setObjectForKey(key, object);
                    break;
                case StoringType.LOCAL:
                    this.localContainer.setObjectForKey(key, object);
                    break;
                case StoringType.REMOTE:
                    this.remoteContainer.setObjectForKey(key, object);
                    break;
            }
        }
        public getEntries(): FinalJMBMap<UserDefaultKey, any> {
            return this.objects;
        }


    }
}
