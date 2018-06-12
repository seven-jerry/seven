namespace seven {
    export function stringToBool(s:string):boolean{
    if(s == undefined){
        return false;
    }
    if(typeof s == "boolean"){
        return s;
    }
    var lower = s.toLocaleLowerCase().trim();
    if(lower == "true"){
        return true;
    } 
    return false;
}
}