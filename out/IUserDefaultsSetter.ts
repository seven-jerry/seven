namespace seven {
    export interface IUserDefaultsSetter {
        setLocalContainer(localContainer: ILocalStorageAccess);
        setRemoteContainer(remoteContainer: IRemoteStorageAccess);
        
    }
}
