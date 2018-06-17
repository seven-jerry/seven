namespace storyboard{
    export function toBoolean(input:string):boolean{
            if(input.toLowerCase() == "yes"){
                return true;
            }
            return false;
    }
}