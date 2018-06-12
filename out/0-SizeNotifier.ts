namespace seven {
    export class SizeNotifier {
    private static _notifier: SizeNotifier;

    public observers: {};

    /* private */ constructor() {
        this.observers = {};
    }

    public /* syncronized */ static notifier(): SizeNotifier {
        if (SizeNotifier._notifier == undefined) {
            SizeNotifier._notifier = new SizeNotifier();
        }
        return SizeNotifier._notifier;
    }

    public /* syncronized */ addResizeHandler(handler: IResizeable) {
        if (this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE] == undefined) {
            this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE] = new Array<any>();
        }
        var observerArray: Array<any> = this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE];
        var found = false;
        for (let everyObserver of observerArray) {
            if (everyObserver == handler) {
                found = true;
            }
        }
        if (found == false) {
            observerArray.push(handler);
        }
        this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE] = observerArray;
    }

    public /* syncronized */ postSizeClassChange(fromClass: ISizeClass, toClass: ISizeClass) {
        Objects.requireNonNull("", fromClass);
        Objects.requireNonNull("", toClass);
        for (var counter in this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE]) {
            var handler: IResizeable = this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE][counter];
            //call the observer method with userInfo 
            handler.handleSizeClassChange(fromClass, toClass);
        }
    }

    public /* syncronized */ removeSizeClassChangeHandler(observerThis: IResizeable) {
        for (var counter in this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE]) {
            var observer: Observer = this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE][counter];
            //call the observer method with userInfo 
            if (observer.thisRef == observerThis) {
                delete this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE][counter];
            }
        }
    }
}

enum SizeNotifyOptions {
    NONE,
    SIZE_CLASS_CHANGE
}
}