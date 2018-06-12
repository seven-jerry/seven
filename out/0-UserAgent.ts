namespace seven {
    export class UserAgent {
        private static _instance;
        public static userAgent(): ClassLoader {
            if (UserAgent._instance == undefined) {
                UserAgent._instance = new ClassLoader();
            }
            return UserAgent._instance;
        }


        public hasTouchScreen():boolean{
            return (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));            
        }
        
    }

}
