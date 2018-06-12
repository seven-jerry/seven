namespace seven {
    export class DefaultValues {
        private callback:VoidCallback;
        constructor(){
        }
        setupDefaultValues(callback:VoidCallback){
            if(this.callback){
                Logger.error("DefaultValues - setupDefaultValues has not finished ");
            }
            this.callback = callback;
            var manager = UserDefaults.defaultManager().synchronize(new VoidCallback(this,this.synced));
        }
        synced(){
          //  UserDefaults.defaultManager().setObjectForKey(UserDefaultKey.PVS_BLO9_NAME,"BLO9",StoringType.LOCAL,Override.FALSE);
         //   UserDefaults.defaultManager().setObjectForKey(UserDefaultKey.PVS_BLO9_AMOUNT,"10",StoringType.LOCAL,Override.FALSE);            
            UserDefaults.defaultManager().synchronize(this.callback);
        }
    }
}