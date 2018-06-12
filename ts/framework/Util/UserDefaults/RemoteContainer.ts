namespace seven {
    export class RemoteContainer implements IRemoteStorageAccess{
        syncContainer: JMBMap<UserDefaultKey, any>;
        container: JMBMap<UserDefaultKey, any>;
        constructor(){
            this.container = new JMBMap<UserDefaultKey, any>();
            this.syncContainer = new JMBMap<UserDefaultKey, any>();
        }

        setObjectForKey(key: UserDefaultKey, object: any) {
            this.syncContainer.put(key,object);
        }
        deleteObjectForKey(key: UserDefaultKey) {
           this.container.remove(key);
        }
        synchronize(callBack: UserDefaultStorageCallback) {
            //load the entries to server
            callBack.call(this.container);
        }
        

    }
}