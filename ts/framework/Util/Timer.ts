
namespace seven{
    export class Timer{
        private timeoutTimer:any = undefined;
        private timeoutCallback:VoidCallback;
    
        timeout(time:number,callback:VoidCallback){
            this.timeoutCallback = callback;
           
            this.stop(); 
            var that = this;
            this.timeoutTimer = setTimeout(function(){
                that.timeoutCalled();
            },time);
        }
    
        timeoutCalled(){
            console.log("called");
            this.stop();
            this.timeoutCallback.call();
            
        }
    
    
        interval(time:number,cllback:VoidCallback){}
        stop(){
            clearTimeout(this.timeoutTimer);
            this.timeoutTimer = undefined;
        }
    }
}
