
namespace seven {
    export class Objects {
    private Objects() {

    }

    public static requireNonNull<T>(message, object: T) {

        if (object == undefined || object == null) {
            throw new Error(message);
        }
        return object;
    }


    public static requireNumber(message, object):number {
        Objects.requireNonNull(message, object);
        if (typeof object == "string") {
           object = parseInt(object);
        }
        Objects.requireNonNull(message, object);
        if (typeof object != "number") {
            throw new Error(message);
        }
        return object;
    }


    public static orElse<T>(object:T,replacement:T):T{
        if(object != undefined && object != null){
            return object;
        }
        return replacement;
    }

}
}