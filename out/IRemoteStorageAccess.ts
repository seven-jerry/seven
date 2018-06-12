namespace seven{
    export interface IRemoteStorageAccess extends IStorageAccess{
        container:JMBMap<UserDefaultKey,any>;
        syncContainer:JMBMap<UserDefaultKey,any>;
    }
}

