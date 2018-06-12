namespace seven {
    export interface IStorageAccess {
        synchronize(callBack: UserDefaultStorageCallback);
        setObjectForKey(key:UserDefaultKey,object:any);
        deleteObjectForKey(key);
    }
}

