
namespace seven {
    export class JBNotificationCenter {
    private static _defaultManager: JBNotificationCenter;
    private static _touchEventCenter: JBNotificationCenter;

    public observers: JMBMap<string, Array<Observer>> = new JMBMap<string, Array<Observer>>();
    public priorityObservers: JMBMap<string, JMBMap<number, Array<Observer>>> = new JMBMap<string, JMBMap<number, Array<Observer>>>();

    /* private */ constructor() {
    }

    public static touchEventManager(): JBNotificationCenter {
        if (JBNotificationCenter._touchEventCenter == undefined) {
            JBNotificationCenter._touchEventCenter = new JBNotificationCenter();
        }
        return JBNotificationCenter._touchEventCenter;
    }
    
    public static defaultCenter(): JBNotificationCenter {
        if (JBNotificationCenter._defaultManager == undefined) {
            JBNotificationCenter._defaultManager = new JBNotificationCenter();
        }
        return JBNotificationCenter._defaultManager;
    }

    public addObserverForName(name: string, observer: Observer, priority?: number) {
        if (priority != undefined) {
            if (this.priorityObservers.containsKey(name) == false) {
                this.priorityObservers.put(name, new JMBMap<number, Array<Observer>>());
            }
            var observerMap = this.priorityObservers.get(name);
            if (observerMap.containsKey(priority) == false) {
                observerMap.put(priority, new Array());
            }
            var observers = observerMap.get(priority);
            var found = false;
            for (let everyObserver of observers) {
                if (everyObserver.thisRef == observer.thisRef) {
                    found = true;
                }
            }
            if (found == false) {
                observers.push(observer);
            }
            return;
        }

        if (this.observers.containsKey(name) == false) {
            this.observers.put(name, new Array<Observer>());
        }
        var observerArray = this.observers.get(name);
        var found = false;
        for (let everyObserver of observerArray) {
            if (everyObserver.thisRef == observer.thisRef) {
                found = true;
            }
        }
        if (found == false) {
            observerArray.push(observer);
        }
    }

    public postNotificationForName(name: string, userInfo: any) {
        this.postPriority(name, userInfo);
        var observerValues = this.observers.get(name);
        for (let observer of observerValues) {
            //call the observer method with userInfo 
            if (observer.userInfo) {
                observer.method.call(observer.thisRef, userInfo);
            } else {
                observer.method.call(observer.thisRef);
            }
        }

    }
    private postPriority(name: string, userInfo: any) {
        var priorityMap = this.priorityObservers.get(name);
        if (priorityMap == undefined) {
            return;
        }
        var priorities = priorityMap.keys().sort((a, b) => {
            return a - b;
        });

        for (var prorityKey of priorities) {
            var values = priorityMap.get(prorityKey);
            for (let observer of values) {
                //call the observer method with userInfo 
                if (observer.userInfo) {
                    observer.method.call(observer.thisRef, userInfo);
                } else {
                    observer.method.call(observer.thisRef);
                }
            }
        }
    }
    public removeObserver(observerThis: any, name: string) {
        var observerValues = this.observers.get(name);
        for (var key in observerValues) {
            if (observerValues[key].thisRef == observerThis) {
                delete observerValues[key];
            }
        }
    }
}

}