namespace seven{
    export class LocalContainer implements ILocalStorageAccess{
        syncContainer: JMBMap<UserDefaultKey, any>;
        container: JMBMap<UserDefaultKey, any>;
        keepDuration:number = 2;
        cookiePrefix:string = "USERDEFAULTS";
        cookieManager:CookieManager;
        constructor(){
            this.container = new JMBMap<UserDefaultKey, any>();
            this.syncContainer = new JMBMap<UserDefaultKey, any>();
            this.cookieManager = new CookieManager();
        }
        setCookieManager(manager:CookieManager){
            this.cookieManager = manager;
        }
        setObjectForKey(key: UserDefaultKey, object: any) {
            this.syncContainer.put(key,object);
        }
        deleteObjectForKey(key: UserDefaultKey) {
            this.cookieManager.deleteCookie(this.cookiePrefix+key);
        }
        synchronize(callBack: UserDefaultStorageCallback) {
            Objects.requireNonNull("cookie manager must not be null",this.cookieManager);
            // set the entries to the cookie storage
            for(let key of this.syncContainer.keys()){
                let object = this.syncContainer.get(key);
                this.cookieManager.setCookie(this.cookiePrefix+key,object,this.keepDuration);
            }
            this.syncContainer = new JMBMap<UserDefaultKey, any>();            
            var allElements = this.cookieManager.getCookieStartWithNeedle(this.cookiePrefix);
            var buildContainer = new  JMBMap<UserDefaultKey, any>();

            
            for(let key of allElements.keys()){
                var strippedKey = parseInt(key.replace(this.cookiePrefix,""));
                buildContainer.put(strippedKey,allElements.get(key));
            }
            if(callBack){
                callBack.call(buildContainer);
            }
        }
        
    }
}