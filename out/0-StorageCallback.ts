namespace seven {
    export class UserDefaultStorageCallback {
        thisRef: Object;
        method: (map:JMBMap<UserDefaultKey,any>) => void; 

        constructor(thisRef: Object, method: (map:JMBMap<UserDefaultKey,any>) => void) {
            this.thisRef = thisRef;
            this.method = method;
        }
        call(map:JMBMap<UserDefaultKey,any>) {
            this.method.call(this.thisRef,map);
        }
    }
}