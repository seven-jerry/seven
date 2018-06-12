namespace seven {
    export class Logger {
    public static onlyFlag: boolean = false;
    public static noLogging: boolean = false;
    constructor() { }
    public static only(args: string) {
        console.log(args);
        Logger.onlyFlag = true;
    }
    public static log(args: string | any[]) {
        if (Logger.shouldLog() == false) {
            return;
        }
    
        var logMessage = Logger.toLogMessage(args);
        console.log(logMessage);

    }
    public static develepor(args: string | any[]) {
        
        if (Logger.shouldLog() == false) {
            return;
        }
        var logMessage = Logger.toLogMessage(args);
        console.debug(logMessage);

    }
    
    public static boot(args: string | any[]) {
        
        if (Logger.shouldLog() == false) {
            return;
        }
        var logMessage = Logger.toLogMessage(args);
        console.log(logMessage)
    }

    public static develeporError(args: string | any[]) {
        if (Logger.shouldLog() == false) {
            return;
        }
        var logMessage = Logger.toLogMessage(args);
        console.error(logMessage);
    }
    public static develeporInfo(args: string | any[]) {
        if (Logger.shouldLog() == false) {
            return;
        }
        var logMessage = Logger.toLogMessage(args);
        console.info(logMessage);
    }
    public static error(errorText: string,showErrorDialog:boolean = false) {
        if (Logger.shouldLog() == false) {
            return;
        }
        console.error(errorText);
        if(showErrorDialog == false){
            return;
        }
       
    }

    public static shouldLog(){
        if(Logger.onlyFlag == true){
            return false;
        }
        if(Logger.noLogging == true){
            return false;
        }
    }
    private static toLogMessage(args: string | any[]):string{

        if (typeof args == "string") {
            return args;
        }
        var buildMessage = "";
        var elements = new Array();
        elements = elements.concat(args);
        elements.forEach(element => {
            if (typeof element == "object") {
                buildMessage = buildMessage.concat(element.toString());
            }
            else {
                buildMessage = buildMessage.concat(element);
            }
            buildMessage = buildMessage.concat(" , ");
        });
        return buildMessage;
    }
}
}
window.onerror = function(error) {  
    seven.Logger.error(error.toString(),true);
   };

