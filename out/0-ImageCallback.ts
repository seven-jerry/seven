namespace seven {
    export class ImageLoadedCallback {
    thisRef: Object;
    method: (image: HTMLImageElement) => void;
    public constructor(thisRef: Object, method: (image: HTMLImageElement) => void) {
        this.thisRef = thisRef;
        this.method = method;
    }
    call(image:HTMLImageElement) {
        this.method.call(this.thisRef,image);
    }
}
}