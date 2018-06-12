namespace seven {
    export interface ILocalStorageAccess extends IStorageAccess{
        container:JMBMap<UserDefaultKey,any>;
        syncContainer:JMBMap<UserDefaultKey,any>;
    }
}