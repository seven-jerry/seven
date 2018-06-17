//{INSERTORDER:1}
var seven;
(function (seven) {
    class AbstractMap {
        constructor() {
            this.containerObject = new Object();
        }
        containsKey(key) {
            return this.containerObject.hasOwnProperty("" + key);
        }
        containsValue(value) {
            for (var k in this.containerObject) {
                if (this.containerObject[k] == value) {
                    return true;
                }
            }
            return false;
        }
        get(object) {
            if (this.containsKey(object) == true) {
                return this.containerObject["" + object];
            }
        }
        isEmpty() {
            for (var k in this.containerObject) {
                return false;
            }
            return true;
        }
        put(key, value) {
            this.containerObject["" + key] = value;
            return this.containerObject["" + key];
        }
        remove(key) {
            delete this.containerObject["" + key];
        }
        size() {
            var counter = 0;
            for (var k in this.containerObject) {
                counter++;
            }
            return counter;
        }
        values() {
            var values = new Array();
            for (var key in this.containerObject) {
                values.push(this.containerObject[key]);
            }
            return values;
        }
        keys() {
            return Object.keys(this.containerObject);
        }
    }
    seven.AbstractMap = AbstractMap;
/**
 * addd a border to a view object
 *
*/
    (function (lineType) {
        lineType[lineType["solid"] = 0] = "solid";
        lineType[lineType["dotted"] = 1] = "dotted";
    })(seven.lineType || (seven.lineType = {}));
    var lineType = seven.lineType;
    function top(width, type, color) {
        return new Border().intitWithSubBorders(new TopBorder().init(width, type, color));
    }
    seven.top = top;
    function right(width, type, color) {
        return new Border().intitWithSubBorders(new RightBorder().init(width, type, color));
    }
    seven.right = right;
    function bottom(width, type, color) {
        return new Border().intitWithSubBorders(new BottomBorder().init(width, type, color));
    }
    seven.bottom = bottom;
    function left(width, type, color) {
        return new Border().intitWithSubBorders(new LeftBorder().init(width, type, color));
    }
    seven.left = left;
    function border(width, type, color) {
        return new Border().intitWithSubBorders(new TotalBorder().init(width, type, color));
    }
    seven.border = border;
    class Border {
        constructor() {
            this.subBorders = new Array();
        }
        /*   actually :HTMLElement, but typescript is being a bitch */
        draw(element /*HTMLElement*/) {
            seven.Logger.error("Border is drawable on generic view - be more specific");
        }
        intitWithSubBorders(...borders) {
            this.subBorders = borders;
            return this;
        }
        drawOnElement(element) {
            for (let subBorder of this.subBorders) {
                subBorder.drawOnElement(element);
            }
        }
        drawInContext(context, rect) {
            for (let subBorder of this.subBorders) {
                subBorder.drawInContext(context, rect);
            }
        }
    }
    seven.Border = Border;
    class SubBorder {
        draw(element) {
            seven.Logger.error("Border is drawable on generic view - be more specific");
        }
        getHtmlType() {
            switch (this.type) {
                case lineType.solid:
                    return "solid";
                case lineType.dotted:
                    return "dotted";
            }
            return "";
        }
        getCanvas() {
            switch (this.type) {
                case lineType.solid:
                    return [0, 0];
                case lineType.dotted:
                    return [5, 3];
            }
            return [0, 0];
        }
        changeSize(element, diff) {
            var currentLeft = parseInt(element.style.left.replace("px", ""));
            var currentTop = parseInt(element.style.top.replace("px", ""));
            var currentWidth = parseInt(element.style.width.replace("px", ""));
            var currentHeight = parseInt(element.style.height.replace("px", ""));
            var currentElWidth = parseInt(element.width);
            var currentElHeight = parseInt(element.height);
            if (currentElWidth != NaN) {
                element.width = currentElWidth - diff.width();
            }
            else {
                element.style.width = (currentWidth - diff.width()) + "px";
            }
            if (currentElHeight != NaN) {
                element.height = currentElHeight - diff.height();
            }
            else {
                element.style.height = (currentHeight - diff.height()) + "px";
            }
            element.style.left = (currentLeft + diff.x()) + "px";
            element.style.top = (currentTop + diff.y()) + "px";
        }
        init(width, type, color) {
            this.width = width;
            this.type = type;
            this.color = color;
            return this;
        }
        drawOnElement(element) {
            throw new Error("Method not implemented.");
        }
        drawInContext(context, rect) {
            throw new Error("Method not implemented.");
        }
    }
    class TopBorder extends SubBorder {
        drawOnElement(element) {
            var useWidth = seven.JBDocument.document().verticalScreenValue(this.width);
            element.style.borderTop = "" + useWidth + "px " + this.getHtmlType() + " " + this.color;
            this.changeSize(element, new seven.Rect(0, useWidth, 0, 0));
        }
        drawInContext(context, rect) {
            var useWidth = seven.JBDocument.document().verticalScreenValue(this.width);
            context.save();
            context.strokeStyle = this.color;
            context.setLineDash(this.getCanvas());
            context.lineWidth = useWidth;
            context.moveTo(0, 0);
            context.lineTo(rect.topRight(), rect.bottomLeft() - useWidth);
            context.restore();
        }
    }
    class RightBorder extends SubBorder {
        drawOnElement(element) {
            var useWidth = seven.JBDocument.document().horizontalScreenValue(this.width);
            element.style.borderRight = "" + useWidth + "px " + this.getHtmlType() + " " + this.color;
            this.changeSize(element, new seven.Rect(0, 0, useWidth, 0));
        }
        drawInContext(context, rect) {
            context.save();
            context.strokeStyle = this.color;
            context.setLineDash(this.getCanvas());
            context.lineWidth = this.width;
            context.moveTo(rect.topRight() - this.width, 0);
            context.lineTo(rect.topRight(), rect.bottomLeft() - this.width);
            context.restore();
        }
    }
    class BottomBorder extends SubBorder {
        drawOnElement(element) {
            var useWidth = seven.JBDocument.document().verticalScreenValue(this.width);
            element.style.borderBottom = "" + useWidth + "px " + this.getHtmlType() + " " + this.color;
            this.changeSize(element, new seven.Rect(0, 0, 0, useWidth));
        }
        drawInContext(context, rect) {
            context.save();
            context.strokeStyle = this.color;
            context.setLineDash(this.getCanvas());
            context.lineWidth = this.width;
            context.moveTo(0, rect.bottomLeft() - this.width);
            context.lineTo(rect.topRight(), rect.bottomLeft() - this.width);
            context.restore();
        }
    }
    class LeftBorder extends SubBorder {
        drawOnElement(element) {
            var useWidth = seven.JBDocument.document().horizontalScreenValue(this.width);
            element.style.borderLeft = "" + useWidth + "px " + this.getHtmlType() + " " + this.color;
            this.changeSize(element, new seven.Rect(useWidth, 0, 0, 0));
        }
        drawInContext(context, rect) {
            context.save();
            context.strokeStyle = this.color;
            context.setLineDash(this.getCanvas());
            context.lineWidth = this.width;
            context.moveTo(0, 0);
            context.lineTo(0, rect.bottomLeft() - this.width);
            context.restore();
        }
    }
    class TotalBorder extends SubBorder {
        drawOnElement(element) {
            element.style.border = "" + this.width + "px " + this.getHtmlType() + " " + this.color;
            this.changeSize(element, new seven.Rect(this.width, this.width, this.width, this.width));
        }
        drawInContext(context, rect) {
            context.save();
            context.strokeStyle = this.color;
            context.setLineDash(this.getCanvas());
            context.lineWidth = this.width;
            context.moveTo(0, 0);
            context.lineTo(rect.topRight() - this.width, 0);
            context.lineTo(rect.topRight() - this.width, rect.bottomLeft() - this.width);
            context.lineTo(0, rect.bottomLeft() - this.width);
            context.lineTo(0, 0);
            context.restore();
        }
    }
    class Callback {
        constructor(thisRef, method) {
            this.thisRef = thisRef;
            this.method = method;
        }
        call(t, u, v) {
            if (t != undefined && u != undefined && v != undefined) {
                this.method.call(this.thisRef, t, u, v);
                return;
            }
            if (t != undefined && u != undefined) {
                this.method.call(this.thisRef, t, u);
                return;
            }
            if (t != undefined) {
                this.method.call(this.thisRef, t);
                return;
            }
        }
    }
    seven.Callback = Callback;
    class VoidCallback {
        constructor(thisRef, method) {
            this.thisRef = thisRef;
            this.method = method;
        }
        call() {
            this.method.call(this.thisRef);
        }
    }
    seven.VoidCallback = VoidCallback;
//{INSERTORDER:10}
    /**
     * the ClassLoader registers and loads classes
     */
    class ClassLoader {
        constructor() {
            this.constructedClasses = {};
            this.loadClasses = new Array();
            this.priorityClass = Array();
            this.priorityClasses = {};
            this.afterClasses = {};
        }
        static manager() {
            if (ClassLoader._instance == undefined) {
                ClassLoader._instance = new ClassLoader();
            }
            return ClassLoader._instance;
        }
        /**
         *
         * @param className the fully qualified className
         * <br/>
         * this method is normally defined in the global space and gets loaded when called from the document delegate
         * it is important that the class a has public static method called 'loadedInstance():thisRef'
         *
         */
        loadInstance(className) {
            this.loadClasses.push(className);
        }
        loadInstanceAtPriority(className, priority) {
            if (this.priorityClasses[priority] == undefined) {
                this.priorityClasses[priority] = new Array();
            }
            this.priorityClasses[priority].push(className);
        }
        startLoading() {
            var keys = Object.keys(this.priorityClasses).sort((a, b) => {
                return parseInt(a) - parseInt(b);
            });
            for (let key of keys) {
                for (let value of this.priorityClasses[key]) {
                    var classObject = eval(value + ".loadedInstance();");
                }
            }
            for (let className of this.loadClasses) {
                //  try {
                seven.Logger.log(className);
                var classObject = eval(className + ".loadedInstance();");
            }
        }
        hasLoaded(classname) {
            this.constructedClasses[classname] = classname;
            if (this.afterClasses[classname] != undefined) {
                var classes = this.afterClasses[classname];
                if (classes == undefined) {
                    return;
                }
                for (let classObj of classes) {
                    this.loadInstance(classObj);
                }
            }
        }
        getLoadedInstance(classname) {
            this.constructedClasses[classname];
        }
        after(afterName, loadClassName) {
            if (this.afterClasses[afterName] == undefined) {
                this.afterClasses[afterName] = new Array();
            }
            var currentClasses = this.afterClasses[afterName];
            currentClasses.push(loadClassName);
            this.afterClasses[afterName] = currentClasses;
        }
    }
    seven.ClassLoader = ClassLoader;
//{INSERTORDER:2}
    class Color {
        static transparent() {
            return "rgba(0,0,0,0.0)";
        }
    }
    seven.Color = Color;
    class CookieManager {
        setCookie(name, value, expireHours) {
            try {
                localStorage.setItem(name, value);
            }
            catch (e) {
                var d = new Date();
                d.setTime(d.getTime() + (expireHours * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = name + "=" + value + "; " + expires;
            }
        }
        getCookie(name) {
            try {
                return localStorage.getItem(name);
            }
            catch (e) {
                name = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
            }
            return "";
        }
        getCookieStartWithNeedle(name) {
            var allCookies = new seven.JMBMap();
            try {
                for (var info in window.localStorage) {
                    if (info.indexOf(name) == 0) {
                        allCookies.put(info, this.getCookie(info));
                    }
                }
            }
            catch (e) {
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        var index = c.indexOf("=");
                        var key = c.substring(0, index);
                        allCookies.put(key, c.substring(key.length + 1, c.length));
                    }
                }
            }
            return allCookies;
        }
        getCookieArrayStartWithNeedle(name) {
            var allCookies = new Array();
            try {
                for (var info in window.localStorage) {
                    if (info.indexOf(name) == 0) {
                        allCookies.push(this.getCookie(info));
                    }
                }
            }
            catch (e) {
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        var index = c.indexOf("=");
                        var key = c.substring(0, index);
                        allCookies.push(c.substring(key.length + 1, c.length));
                    }
                }
            }
            return allCookies;
        }
        deleteCookie(name) {
            try {
                localStorage.removeItem(name);
            }
            catch (e) {
                document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
        }
        deleteAllCookiesWithNeedle(needle) {
            var cookies = this.getCookieStartWithNeedle(needle);
            for (let cookie of cookies.keys()) {
                this.deleteCookie(cookie);
            }
        }
        deleteAllCookies() {
            try {
                window.localStorage.clear();
            }
            catch (e) {
                document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            }
        }
    }
    seven.CookieManager = CookieManager;
    class DefaultValues {
        constructor() {
        }
        setupDefaultValues(callback) {
            if (this.callback) {
                seven.Logger.error("DefaultValues - setupDefaultValues has not finished ");
            }
            this.callback = callback;
            var manager = seven.UserDefaults.defaultManager().synchronize(new seven.VoidCallback(this, this.synced));
        }
        synced() {
            //  UserDefaults.defaultManager().setObjectForKey(UserDefaultKey.PVS_BLO9_NAME,"BLO9",StoringType.LOCAL,Override.FALSE);
            //   UserDefaults.defaultManager().setObjectForKey(UserDefaultKey.PVS_BLO9_AMOUNT,"10",StoringType.LOCAL,Override.FALSE);            
            seven.UserDefaults.defaultManager().synchronize(this.callback);
        }
    }
    seven.DefaultValues = DefaultValues;
    class DefaultWindowLoader {
        loadIfDefault() {
            if (seven.JBDocument.document().hasWindowLoader() == false) {
                seven.Logger.boot("no window loader found -- using default");
                seven.JBDocument.document().setWindowLoader(this);
            }
        }
        setup(document) {
            this.document = document;
        }
        loadWindows(sizeClass) {
            var window = new seven.CanvasWindow().initWithCanvasID('main');
            window.view.initWithReferenceFrame(new seven.Rect(0, 0, 1000, 800));
            this.document.addSubWindow(window);
        }
    }
    seven.DefaultWindowLoader = DefaultWindowLoader;
    class UniqueKeyEnumation {
        constructor() {
            this.keys = new Array();
        }
        hasKey(key) {
            var hasKey = 0;
            this.keys.forEach(element => {
                if (element == key) {
                    hasKey = 1;
                }
            });
            if (hasKey == 1) {
                return true;
            }
            return false;
        }
        addKey(key) {
            var hasKey = 0;
            this.keys.forEach(element => {
                if (element == key) {
                    hasKey = 1;
                }
            });
            if (hasKey == 1) {
                throw new Error("UniqueKeyEnumation - tried to add duplicate key");
            }
            this.keys.push(key);
        }
    }
    seven.UniqueKeyEnumation = UniqueKeyEnumation;
    class JBFunction {
    }
    seven.JBFunction = JBFunction;
    class ImageLoadedCallback {
        constructor(thisRef, method) {
            this.thisRef = thisRef;
            this.method = method;
        }
        call(image) {
            this.method.call(this.thisRef, image);
        }
    }
    seven.ImageLoadedCallback = ImageLoadedCallback;
    class JMBIterator {
        constructor(arr) {
            this.index = 0;
            this.inputArray = arr;
        }
        hasNext() {
            return this.index < this.inputArray.length;
        }
        next() {
            if (this.hasNext() == false) {
                return undefined;
            }
            var nextElement = this.inputArray[this.index];
            this.index++;
            return nextElement;
        }
    }
    seven.JMBIterator = JMBIterator;
    class JBNotificationCenter {
        /* private */ constructor() {
            this.observers = new seven.JMBMap();
            this.priorityObservers = new seven.JMBMap();
        }
        static touchEventManager() {
            if (JBNotificationCenter._touchEventCenter == undefined) {
                JBNotificationCenter._touchEventCenter = new JBNotificationCenter();
            }
            return JBNotificationCenter._touchEventCenter;
        }
        static defaultCenter() {
            if (JBNotificationCenter._defaultManager == undefined) {
                JBNotificationCenter._defaultManager = new JBNotificationCenter();
            }
            return JBNotificationCenter._defaultManager;
        }
        addObserverForName(name, observer, priority) {
            if (priority != undefined) {
                if (this.priorityObservers.containsKey(name) == false) {
                    this.priorityObservers.put(name, new seven.JMBMap());
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
                this.observers.put(name, new Array());
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
        postNotificationForName(name, userInfo) {
            this.postPriority(name, userInfo);
            var observerValues = this.observers.get(name);
            for (let observer of observerValues) {
                //call the observer method with userInfo 
                if (observer.userInfo) {
                    observer.method.call(observer.thisRef, userInfo);
                }
                else {
                    observer.method.call(observer.thisRef);
                }
            }
        }
        postPriority(name, userInfo) {
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
                    }
                    else {
                        observer.method.call(observer.thisRef);
                    }
                }
            }
        }
        removeObserver(observerThis, name) {
            var observerValues = this.observers.get(name);
            for (var key in observerValues) {
                if (observerValues[key].thisRef == observerThis) {
                    delete observerValues[key];
                }
            }
        }
    }
    seven.JBNotificationCenter = JBNotificationCenter;
//{INSERTORDER:1}
    class JBObject {
        constructor() {
            this.className = this.constructor.name;
            seven.ClassLoader.manager().hasLoaded(this.getClassName());
        }
        getClassName() {
            if (this.className == undefined) {
                seven.Logger.error("classname was not defined");
            }
            return this.className;
        }
        equals(object) {
            if (object == undefined) {
                return false;
            }
            return object == this;
        }
        hasBeenLoaded() {
        }
        hashcode() {
            return 0;
        }
        toString() {
            return this.className;
        }
        copyAttributes(toObject) {
            toObject.className = this.className;
        }
        copy() {
            var newObject = new JBObject();
            this.copyAttributes(newObject);
            return newObject;
        }
    }
    seven.JBObject = JBObject;
    class LeadingContraint {
        constructor() {
            this.leading = 20;
        }
        applyContraint(srcView, comparingView) {
            srcView.referenceFrame.setX(this.leading);
        }
        init(leading) {
            this.leading = leading;
            return this;
        }
        getClassName() {
            return LeadingContraint.className;
        }
    }
    LeadingContraint.className = "seven.constraint.LeadingContraint";
    seven.LeadingContraint = LeadingContraint;
    class LocalContainer {
        constructor() {
            this.keepDuration = 2;
            this.cookiePrefix = "USERDEFAULTS";
            this.container = new seven.JMBMap();
            this.syncContainer = new seven.JMBMap();
            this.cookieManager = new seven.CookieManager();
        }
        setCookieManager(manager) {
            this.cookieManager = manager;
        }
        setObjectForKey(key, object) {
            this.syncContainer.put(key, object);
        }
        deleteObjectForKey(key) {
            this.cookieManager.deleteCookie(this.cookiePrefix + key);
        }
        synchronize(callBack) {
            seven.Objects.requireNonNull("cookie manager must not be null", this.cookieManager);
            // set the entries to the cookie storage
            for (let key of this.syncContainer.keys()) {
                let object = this.syncContainer.get(key);
                this.cookieManager.setCookie(this.cookiePrefix + key, object, this.keepDuration);
            }
            this.syncContainer = new seven.JMBMap();
            var allElements = this.cookieManager.getCookieStartWithNeedle(this.cookiePrefix);
            var buildContainer = new seven.JMBMap();
            for (let key of allElements.keys()) {
                var strippedKey = parseInt(key.replace(this.cookiePrefix, ""));
                buildContainer.put(strippedKey, allElements.get(key));
            }
            if (callBack) {
                callBack.call(buildContainer);
            }
        }
    }
    seven.LocalContainer = LocalContainer;
    class Logger {
        constructor() { }
        static only(args) {
            console.log(args);
            Logger.onlyFlag = true;
        }
        static log(args) {
            if (Logger.shouldLog() == false) {
                return;
            }
            var logMessage = Logger.toLogMessage(args);
            console.log(logMessage);
        }
        static develepor(args) {
            if (Logger.shouldLog() == false) {
                return;
            }
            var logMessage = Logger.toLogMessage(args);
            console.debug(logMessage);
        }
        static boot(args) {
            if (Logger.shouldLog() == false) {
                return;
            }
            var logMessage = Logger.toLogMessage(args);
            console.log(logMessage);
        }
        static develeporError(args) {
            if (Logger.shouldLog() == false) {
                return;
            }
            var logMessage = Logger.toLogMessage(args);
            console.error(logMessage);
        }
        static develeporInfo(args) {
            if (Logger.shouldLog() == false) {
                return;
            }
            var logMessage = Logger.toLogMessage(args);
            console.info(logMessage);
        }
        static error(errorText, showErrorDialog = false) {
            if (Logger.shouldLog() == false) {
                return;
            }
            console.error(errorText);
            if (showErrorDialog == false) {
                return;
            }
        }
        static shouldLog() {
            if (Logger.onlyFlag == true) {
                return false;
            }
            if (Logger.noLogging == true) {
                return false;
            }
        }
        static toLogMessage(args) {
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
    Logger.onlyFlag = false;
    Logger.noLogging = false;
    seven.Logger = Logger;
window.onerror = function (error) {
    seven.Logger.error(error.toString(), true);
};
    class MinHeight {
        applyContraint(srcView, comparingView) {
            if (srcView.referenceFrame.height() < this.minHeight) {
                srcView.referenceFrame.setHeight(this.minHeight);
                srcView.changeReferenceFrame(srcView.referenceFrame);
            }
            // srcView.appliadFrame.setX(comparingView.appliadFrame.topRight() - srcView.appliadFrame.width() - this.leading);
        }
        init(minHeight) {
            this.minHeight = minHeight;
            return this;
        }
        getClassName() {
            return MinHeight.className;
        }
    }
    MinHeight.className = "seven.constraint.MinHeight";
    seven.MinHeight = MinHeight;
    class Objects {
        Objects() {
        }
        static requireNonNull(message, object) {
            if (object == undefined || object == null) {
                throw new Error(message);
            }
            return object;
        }
        static requireNumber(message, object) {
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
        static orElse(object, replacement) {
            if (object != undefined && object != null) {
                return object;
            }
            return replacement;
        }
    }
    seven.Objects = Objects;
    class Observer {
        constructor(thisRef, method, userInfo) {
            this.thisRef = thisRef;
            this.method = method;
            this.userInfo = userInfo;
        }
    }
    seven.Observer = Observer;
    class On {
        constructor() {
            this.registry = {};
        }
        static on() {
            if (On._instance == undefined) {
                On._instance = new On();
            }
            return On._instance;
        }
        register(key, method) {
            if (this.registry[key] == undefined) {
                this.registry[key] = new Array();
            }
            this.registry[key].push(method);
        }
        call(key, args = undefined) {
            if (this.registry[key] == undefined) {
                return;
            }
            for (let method of this.registry[key]) {
                method.call(this, args);
            }
        }
    }
    seven.On = On;
    function on(action, method) {
        On.on().register(action, method);
    }
    seven.on = on;
    function onWindowLoad(method) {
        On.on().register("windowDidLoad", method);
    }
    seven.onWindowLoad = onWindowLoad;
    class RemoteContainer {
        constructor() {
            this.container = new seven.JMBMap();
            this.syncContainer = new seven.JMBMap();
        }
        setObjectForKey(key, object) {
            this.syncContainer.put(key, object);
        }
        deleteObjectForKey(key) {
            this.container.remove(key);
        }
        synchronize(callBack) {
            //load the entries to server
            callBack.call(this.container);
        }
    }
    seven.RemoteContainer = RemoteContainer;
//{INSERTORDER:4}
/**
 * This class provides the default implementation for the resize Manager
 * This class wil get loaded in the global space(last line of file)
 * Here it registeres for resize events and handles them
 */
    class ResizeManager {
        constructor() {
            this.hasRegistered = false;
            this.userScale = 0;
        }
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
         */
        static loadedInstance() {
            var loadedInstance = seven.ClassLoader.manager().getLoadedInstance(ResizeManager.className);
            if (loadedInstance != undefined) {
                seven.JBDocument.document().setResizeManager(loadedInstance);
                return loadedInstance;
            }
            var resize = new ResizeManager();
            seven.JBDocument.document().setResizeManager(resize);
            return resize;
        }
        getClassName() {
            return ResizeManager.className;
        }
        /**
        * Here we register as the resizeManager
        *
        */
        initDocument() {
            seven.JBDocument.document().setResizeManager(this);
        }
        setup(document) {
            this.document = document;
        }
        startResizing() {
            this.registerForResizeEvent();
            this.handleResize(window.innerWidth, window.innerHeight);
        }
        resize() {
            this.handleResize(this.document.doucmentView.referenceFrame.width(), this.document.doucmentView.referenceFrame.height());
        }
        hasSizeClass() {
            return this.activeSizeClass != undefined;
        }
        verticalScreenValue(value, useBaseClass = true) {
            var resizeSizeClass = this.resizeSizeClass(useBaseClass);
            if (resizeSizeClass.getHeight() == undefined) {
                return value;
            }
            if (this.document == undefined || this.document.doucmentView == undefined) {
                return value;
            }
            return (value / resizeSizeClass.getHeight()) * this.document.doucmentView.referenceFrame.height();
        }
        horizontalScreenValue(value, useBaseClass = true) {
            var resizeSizeClass = this.resizeSizeClass(useBaseClass);
            if (this.document == undefined || this.document.doucmentView == undefined) {
                return value;
            }
            return (value / resizeSizeClass.getWidth()) * this.document.doucmentView.referenceFrame.width();
        }
        verticalReferenceValue(value, useBaseClass = true) {
            var resizeSizeClass = this.resizeSizeClass(useBaseClass);
            if (resizeSizeClass.getHeight() == undefined) {
                return value;
            }
            var testValue = 10;
            var temp = this.verticalScreenValue(testValue, useBaseClass);
            var ratio = testValue / temp;
            var result = value * ratio;
            return result;
        }
        horizontalReferenceValue(value, useBaseClass = true) {
            var testValue = 10;
            var temp = this.horizontalScreenValue(testValue, useBaseClass);
            var ratio = testValue / temp;
            var result = value * ratio;
            return result;
        }
        resizeSizeClass(useBaseClass = true) {
            if (useBaseClass == false) {
                return seven.JBDocument.document().getSizeLoader().getSizeClass();
            }
            return seven.JBDocument.document().getSizeLoader().getBaseClass();
        }
        handleResize(newWidth, newHeight) {
            var userScaleChange = window.outerWidth / window.innerWidth;
            if (this.userScale != 0 && userScaleChange != this.userScale) {
                this.userScale = userScaleChange;
                return;
            }
            this.userScale = userScaleChange;
            this.document.doucmentView.initWithReferenceFrame(new seven.Rect(0, 0, newWidth, newHeight));
            seven.JBDocument.document().getSizeLoader().changeSizeClass(newWidth, newHeight);
            var nextSizeClass = seven.JBDocument.document().getSizeLoader().getSizeClass();
            this.baseSizeClass = seven.JBDocument.document().getSizeLoader().getBaseClass();
            if (this.activeSizeClass == undefined) {
                this.activeSizeClass = this.baseSizeClass;
            }
            if (nextSizeClass != this.activeSizeClass) {
                seven.SizeNotifier.notifier().postSizeClassChange(this.activeSizeClass, nextSizeClass);
                this.activeSizeClass = nextSizeClass;
            }
            var newFrame = new seven.Rect(0, 0, newWidth, newHeight);
            this.document.render();
        }
        registerForResizeEvent() {
            if (this.hasRegistered == true) {
                return;
            }
            this.hasRegistered = true;
            var self = this;
            window.onresize = function () {
                // console.log("w: "+window.screen.width+" h: "+window.screen.height);
                //self.handleResize(window.innerWidth, window.innerHeight);
                setTimeout(function () {
                    self.handleResize(window.innerWidth, window.innerHeight);
                }, 200);
            };
        }
    }
    ResizeManager.className = "seven.ResizeManager";
    seven.ResizeManager = ResizeManager;
seven.ClassLoader.manager().loadInstance(seven.ResizeManager.className);
    class Size {
        constructor(id) {
            this.classes = new Array();
            this.id = id;
        }
        static fromXML(xml, sizeLoader, variables) {
            var id = seven.Objects.requireNonNull("Size.fromXML : id was not defined", xml.attributes.getNamedItem("id").value);
            var size = new Size(id);
            let xmlChidren = xml.getElementsByTagName("sizeClass");
            for (let xmlChild of xmlChidren) {
                var sizeFrame = seven.SizeFrame.fromXML(xmlChild, sizeLoader, variables, id);
                size.classes.push(sizeFrame);
            }
            return size;
        }
        getFrameFromId(id) {
            for (let everyClass of this.classes) {
                if (everyClass.getId() == id) {
                    return everyClass.getFrame();
                }
            }
            return undefined;
        }
        getFrameForClass(sizeClass) {
            for (let everyClass of this.classes) {
                if (sizeClass.getId() == everyClass.getId()) {
                    return everyClass.getFrame();
                }
            }
            return undefined;
        }
    }
    seven.Size = Size;
    class SizeCatalog {
        constructor(name) {
            this.classes = new Array();
            this.name = name;
        }
        setBaseClass(sizeClass) {
            this.baseClass = sizeClass;
            this.classes.push(this.baseClass);
        }
        getBaseClass() {
            return this.baseClass;
        }
        addSizeClasses(sizeCLass) {
            this.classes.push(sizeCLass);
        }
        getSizeClasses() {
            return this.classes;
        }
        changeForSize(width, height) {
            if (width < this.baseClass.getWidth()) {
                this.currentSizeClass = this.findBiggestClass(width);
            }
            if (width > this.baseClass.getWidth()) {
                this.currentSizeClass = this.findSmallestClass(width);
            }
        }
        findBiggestClass(width) {
            var modulo = width % this.baseClass.getWidth();
            var runningClassObj = this.baseClass;
            for (var i in this.classes) {
                var classObj = this.classes[i];
                if (classObj.getWidth() > this.baseClass.getWidth()) {
                    continue;
                }
                if (classObj.getWidth() == width) {
                    return classObj;
                }
                if (width < classObj.getWidth() && width % classObj.getWidth() > modulo) {
                    runningClassObj = classObj;
                }
            }
            return runningClassObj;
        }
        findSmallestClass(width) {
            var baseClassDifference = width - this.baseClass.getWidth();
            var runningClassObj = this.baseClass;
            for (var i in this.classes) {
                var classObj = this.classes[i];
                if (classObj.getWidth() < this.baseClass.getWidth()) {
                    continue;
                }
                if (classObj.getWidth() == width) {
                    return classObj;
                }
                var currentClassDifference = width - classObj.getWidth();
                if (width > classObj.getWidth() && currentClassDifference < baseClassDifference) {
                    runningClassObj = classObj;
                }
            }
            return runningClassObj;
        }
        getName() {
            return this.name;
        }
        setName(name) {
            this.name = name;
        }
        getSizeClass() {
            return this.currentSizeClass || this.baseClass;
        }
    }
    seven.SizeCatalog = SizeCatalog;
    class SizeFrame {
        constructor(id, x, y, width, height) {
            this.id = id;
            this.frame = new seven.Rect(x, y, width, height);
        }
        static fromXML(xml, sizeLoader, variables, superId) {
            var id = seven.Objects.requireNonNull("SizeFrame.fromXML : id was not defined", xml.attributes.getNamedItem("id").value);
            var xmlX = seven.Objects.requireNonNull("SizeFrame.fromXML : x was not defined", xml.attributes.getNamedItem("x").value);
            var superSizeCLass = sizeLoader.getSizeForKey(superId.substring(0, superId.lastIndexOf(".")));
            var superCLassId = "";
            var rect = seven.Rect.empty();
            if (superSizeCLass != undefined) {
                superCLassId = superSizeCLass.id;
                rect = superSizeCLass.getFrameFromId(id);
            }
            var x = SizeFrame.getNumber(id, xmlX, rect.x(), superId, variables);
            var xmlY = seven.Objects.requireNonNull("SizeFrame.fromXML : y was not defined", xml.attributes.getNamedItem("y").value);
            var y = SizeFrame.getNumber(id, xmlY, rect.y(), superId, variables);
            var xmlWidth = seven.Objects.requireNonNull("SizeFrame.fromXML : width was not defined", xml.attributes.getNamedItem("width").value);
            var width = SizeFrame.getNumber(id, xmlWidth, rect.width(), superId, variables);
            var xmlHeight = seven.Objects.requireNonNull("SizeFrame.fromXML : height was not defined", xml.attributes.getNamedItem("height").value);
            var height = SizeFrame.getNumber(id, xmlHeight, rect.height(), superId, variables);
            return new SizeFrame(id, x, y, width, height);
        }
        static getNumber(id, object, maxNumber, superClassId, variables) {
            if (typeof object == "number") {
                return object;
            }
            if (object.indexOf("%") != -1) {
                var percentValue = seven.Objects.requireNumber("SizeFrame::getNumber : number is not a percentvalue", object.substring(0, object.indexOf("%")));
                var testString = object.substring(0, object.indexOf("%") + 1);
                if (maxNumber == 0) {
                    throw new Error("SizeFrame.getNumber : <" + superClassId + "> if you use precent values you have to define a super size to reference to. in your case it would be <" + superClassId.substring(0, superClassId.lastIndexOf(".")) + "> ");
                }
                object = object.replace(testString, "" + (maxNumber * 100 / percentValue));
            }
            if (typeof object == "string" && object.indexOf("var") != 0) {
                object = parseInt(object);
                if (object != NaN) {
                    return object;
                }
            }
            if (typeof object == "string" && object.indexOf("var") == 0) {
                var testFroVar = object.trim().replace("var:", "");
                var resultObj = SizeFrame.extractOperation(testFroVar);
                testFroVar = resultObj.source;
                if (variables.containsKey(testFroVar) == true) {
                    var variable = variables.get(testFroVar);
                    var varValue = variable.getProperty(id);
                    return SizeFrame.applyOperation(varValue, resultObj.operation, resultObj.value);
                }
            }
            throw new Error("SizeFrame.fromXML : <" + object + "> could not be converted to number");
        }
        static extractOperation(sourceString) {
            var operationIndex = 0;
            var operationFound = undefined;
            var operationValue = 0;
            var operations = ["+", "-", "*", "/"];
            while (operationFound == undefined && operationIndex < operations.length) {
                var testOperation = operations[operationIndex];
                operationIndex++;
                if (sourceString.indexOf(testOperation) != -1) {
                    operationFound = testOperation;
                }
            }
            if (operationFound != undefined) {
                var operation = sourceString.substring(sourceString.indexOf(operationFound) + 1);
                if (parseInt(operation) != NaN) {
                    operationValue = parseInt(operation);
                }
                sourceString = sourceString.substring(0, sourceString.indexOf(operationFound)).trim();
            }
            return { "source": sourceString, "operation": operationFound, "value": operationValue };
        }
        static applyOperation(source, operation, value) {
            if (operation == "+") {
                return source + value;
            }
            if (operation == "-") {
                return source - value;
            }
            if (operation == "*") {
                return source * value;
            }
            if (operation == "/") {
                return source / value;
            }
            return source;
        }
        getId() {
            return this.id;
        }
        getFrame() {
            return this.frame;
        }
    }
    seven.SizeFrame = SizeFrame;
    class SizeLoadOption {
        isMobileDevice() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true;
            }
            return false;
        }
        isDesktop() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return false;
            }
            return true;
        }
    }
    seven.SizeLoadOption = SizeLoadOption;
    class SizeNotifier {
        /* private */ constructor() {
            this.observers = {};
        }
        /* syncronized */ static notifier() {
            if (SizeNotifier._notifier == undefined) {
                SizeNotifier._notifier = new SizeNotifier();
            }
            return SizeNotifier._notifier;
        }
        addResizeHandler(handler) {
            if (this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE] == undefined) {
                this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE] = new Array();
            }
            var observerArray = this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE];
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
        postSizeClassChange(fromClass, toClass) {
            seven.Objects.requireNonNull("", fromClass);
            seven.Objects.requireNonNull("", toClass);
            for (var counter in this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE]) {
                var handler = this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE][counter];
                //call the observer method with userInfo 
                handler.handleSizeClassChange(fromClass, toClass);
            }
        }
        removeSizeClassChangeHandler(observerThis) {
            for (var counter in this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE]) {
                var observer = this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE][counter];
                //call the observer method with userInfo 
                if (observer.thisRef == observerThis) {
                    delete this.observers[SizeNotifyOptions.SIZE_CLASS_CHANGE][counter];
                }
            }
        }
    }
    seven.SizeNotifier = SizeNotifier;
    var SizeNotifyOptions;
    (function (SizeNotifyOptions) {
        SizeNotifyOptions[SizeNotifyOptions["NONE"] = 0] = "NONE";
        SizeNotifyOptions[SizeNotifyOptions["SIZE_CLASS_CHANGE"] = 1] = "SIZE_CLASS_CHANGE";
    })(SizeNotifyOptions || (SizeNotifyOptions = {}));
    class UserDefaultStorageCallback {
        constructor(thisRef, method) {
            this.thisRef = thisRef;
            this.method = method;
        }
        call(map) {
            this.method.call(this.thisRef, map);
        }
    }
    seven.UserDefaultStorageCallback = UserDefaultStorageCallback;
    class Timer {
        constructor() {
            this.timeoutTimer = undefined;
        }
        timeout(time, callback) {
            this.timeoutCallback = callback;
            this.stop();
            var that = this;
            this.timeoutTimer = setTimeout(function () {
                that.timeoutCalled();
            }, time);
        }
        timeoutCalled() {
            console.log("called");
            this.stop();
            this.timeoutCallback.call();
        }
        interval(time, cllback) { }
        stop() {
            clearTimeout(this.timeoutTimer);
            this.timeoutTimer = undefined;
        }
    }
    seven.Timer = Timer;
    class Top {
        constructor() {
            this.top = 0;
        }
        applyContraint(srcView, comparingView) {
            if (this.topView != undefined) {
                srcView.referenceFrame.setY(this.topView.referenceFrame.bottomLeft() + this.top);
                return;
            }
            srcView.referenceFrame.setY(this.top);
            srcView.changeReferenceFrame(srcView.referenceFrame);
        }
        init(top, comparingView) {
            this.top = top;
            this.topView = comparingView;
            return this;
        }
        getClassName() {
            return Top.className;
        }
    }
    Top.className = "seven.constraint.Top";
    seven.Top = Top;
    class UserAgent {
        static userAgent() {
            if (UserAgent._instance == undefined) {
                UserAgent._instance = new seven.ClassLoader();
            }
            return UserAgent._instance;
        }
        hasTouchScreen() {
            return (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
        }
    }
    seven.UserAgent = UserAgent;
    class UserDefaults {
        constructor() {
            this.objects = new seven.JMBMap();
            this.callback = new Array();
        }
        /* Object Creation */
        static defaultManager() {
            if (UserDefaults._instance == undefined) {
                UserDefaults._instance = new UserDefaults();
                UserDefaults._instance.setLocalContainer(new seven.LocalContainer());
                UserDefaults._instance.setRemoteContainer(new seven.RemoteContainer());
            }
            return UserDefaults._instance;
        }
        /* IUserDefaultsSetter */
        setLocalContainer(localContainer) {
            this.localContainer = localContainer;
        }
        setRemoteContainer(remoteContainer) {
            this.remoteContainer = remoteContainer;
        }
        synchronize(callBack) {
            this.callback.push(callBack);
            if (this.callback.length > 1) {
                return;
            }
            var that = this;
            setTimeout(function () {
                console.log("start syncing " + that.callback.length);
                that.objects = new seven.JMBMap();
                that.localContainer.synchronize(new seven.UserDefaultStorageCallback(that, that.localStorageReady));
            }, 30);
        }
        localStorageReady(map) {
            this.fillContainer(map);
            this.remoteContainer.synchronize(new seven.UserDefaultStorageCallback(this, this.remoteStorageReady));
        }
        remoteStorageReady(map) {
            this.fillContainer(map);
            var tempCall = this.callback;
            this.callback = new Array();
            console.log("remoteStorageReady " + tempCall.length);
            for (let callback of tempCall) {
                callback.call();
            }
        }
        fillContainer(objects) {
            try {
                for (let key of objects.keys()) {
                    var object = objects.get(key);
                    this.objects.put(key, object);
                }
            }
            catch (e) {
                seven.Logger.error("UserDefaults : setObjects : " + e.message);
            }
        }
        setObjects(objects, type, override) {
            try {
                for (let key of objects.keys()) {
                    var object = objects.get(key);
                    this.setObjectForKey(key, object, type, override);
                }
            }
            catch (e) {
                seven.Logger.error("UserDefaults : setObjects : " + e.message);
            }
        }
        setObjectForKey(key, object, type, override) {
            if (override == seven.Override.FALSE && this.objects.get(key) != undefined) {
                seven.Logger.error("UserDefaults : setObjectForKey : has object and should not override ");
                return;
            }
            switch (type) {
                case seven.StoringType.ALL:
                    this.localContainer.setObjectForKey(key, object);
                    this.remoteContainer.setObjectForKey(key, object);
                    break;
                case seven.StoringType.LOCAL:
                    this.localContainer.setObjectForKey(key, object);
                    break;
                case seven.StoringType.REMOTE:
                    this.remoteContainer.setObjectForKey(key, object);
                    break;
            }
        }
        getEntries() {
            return this.objects;
        }
    }
    seven.UserDefaults = UserDefaults;
    class UserInfo {
        static clientInfo() {
            return new seven.SizeLoadOption();
        }
    }
    seven.UserInfo = UserInfo;
    class Variable {
        constructor(id) {
            this.values = new seven.JMBMap();
            this.id = id;
        }
        static fromXML(xml) {
            var id = seven.Objects.requireNonNull("Variable.fromXML : id was not defined", xml.attributes.getNamedItem("id").value);
            var size = new Variable(id);
            let xmlChidren = xml.getElementsByTagName("sizeClass");
            for (let xmlChild of xmlChidren) {
                Variable.sizeClassValue(size, xmlChild);
            }
            return size;
        }
        static sizeClassValue(destination, xml) {
            var classId = seven.Objects.requireNonNull("Variable.sizeClassValue : id was not defined", xml.attributes.getNamedItem("id").value);
            var value = seven.Objects.requireNumber("Variable.sizeClassValue : value was not defined", xml.attributes.getNamedItem("value").value);
            destination.values.put(classId, value);
        }
        getProperty(sizeClassId) {
            if (this.values.containsKey(sizeClassId) == false) {
                throw new Error("Variable::getProperty : not value for sizeclassid<" + sizeClassId + ">");
            }
            return this.values.get(sizeClassId);
        }
    }
    seven.Variable = Variable;
    class ViewUtility {
        constructor() {
        }
        static randomColor() {
            return '#' + this.hex(this.rg(1, 10)) + this.hex(this.rg(1, 10)) + this.hex(this.rg(1, 15)) +
                this.hex(this.rg(1, 15)) + this.hex(this.rg(1, 15)) + this.hex(this.rg(1, 15));
        }
        static rg(m, n) {
            return Math.floor(Math.random() * (n - m + 1)) + m;
        }
        static hex(i) {
            return i.toString(16);
        }
    }
    seven.ViewUtility = ViewUtility;
//{INSERTORDER:2}
    class AbstractViewController extends seven.JBObject {
        constructor() {
            super();
            this.childViewController = new Array();
            this.parentViewController = undefined;
        }
        addChildViewController(viewController) {
            viewController.setParentViewController(this);
            this.childViewController.push(viewController);
        }
        setParentViewController(viewController) {
            this.parentViewController = viewController;
        }
        setView(view) {
            this.view = view;
        }
        dragStart(orgin, view) {
            return view;
        }
        dragHasMoved(orgin, view) {
            if (this.parentViewController != undefined) {
                this.parentViewController.dragHasMoved(orgin, view);
            }
        }
        dragHasEnded(orgin, view) {
            if (this.parentViewController != undefined) {
                return this.parentViewController.dragHasEnded(orgin, view);
            }
            return false;
        }
        dragHasLeft() {
            if (this.parentViewController != undefined) {
                this.parentViewController.dragHasLeft();
            }
        }
    }
    seven.AbstractViewController = AbstractViewController;
//{INSERTORDER:2}
    class GestureCallback extends seven.JBObject {
        constructor() {
            super();
        }
        initWithMethod(thisRef, method) {
            this.thisRef = thisRef;
            this.method = method;
            return this;
        }
        call(values) {
            this.method.call(this.thisRef);
        }
        getType() {
            return seven.GestureType.None;
        }
        getKey() {
            return "" + seven.GestureType.None;
        }
        copyAttributes(toObject) {
            super.copyAttributes(toObject);
            toObject.thisRef = this.thisRef;
            toObject.method = this.method;
        }
        copy() {
            var newObject = new GestureCallback();
            this.copyAttributes(newObject);
            return newObject;
        }
    }
    seven.GestureCallback = GestureCallback;
//{INSERTORDER:2}
    class JBTouchEvent extends seven.JBObject {
        constructor() {
            super();
            this.orgin = seven.Orgin.empty();
            this.difference = seven.Orgin.empty();
            this.differenceFromStart = seven.Orgin.empty();
            this.dragging = false;
            this.elementId = "";
            this.dragging = false;
        }
        setOrgin(orgin) {
            this.orgin = orgin;
        }
        getOrgin() {
            return this.orgin.copy();
        }
        setDifference(difference) {
            this.difference = difference;
        }
        getDifference() {
            return this.difference.copy();
        }
        setDifferenceFromStart(differenceFromStart) {
            this.differenceFromStart = differenceFromStart;
        }
        getDifferenceFromStart() {
            return this.differenceFromStart.copy();
        }
        isDragging() {
            return this.dragging;
        }
        setDragging(dragging) {
            this.dragging = dragging;
        }
        copyAttributes(toObject) {
            toObject.orgin = this.orgin.copy();
            toObject.configuration = this.configuration;
            toObject.difference = this.difference.copy();
            toObject.differenceFromStart = this.differenceFromStart.copy();
            toObject.dragging = this.dragging;
            this.elementId = this.elementId;
        }
        copy() {
            var newObject = new JBTouchEvent();
            this.copyAttributes(newObject);
            return newObject;
        }
    }
    seven.JBTouchEvent = JBTouchEvent;
//{INSERTORDER:2}
    class JMBMap extends seven.AbstractMap {
        constructor() {
            super();
        }
        containsKey(key) {
            return super.containsKey(key);
        }
        containsValue(value) {
            return super.containsValue(value);
        }
        get(object) {
            return super.get(object);
        }
        isEmpty() {
            return super.isEmpty();
        }
        put(key, value) {
            return super.put(key, value);
        }
        remove(key) {
            return super.remove(key);
        }
        size() {
            return super.size();
        }
        values() {
            return super.values();
        }
        keys() {
            return super.keys();
        }
    }
    seven.JMBMap = JMBMap;
//{INSERTORDER:2}
    class JMBWindow extends seven.JBObject {
        constructor() {
            super();
        }
        initWithID(id) {
            this.htmlElementId = id;
            this.htmlElement = document.getElementById(id);
            Object.freeze(this.htmlElement);
        }
        setupTouches() {
        }
        setController(controller) {
            this.windowController = controller;
            controller.setWindow(this);
            if (this.view != undefined) {
                this.view.setController(controller);
            }
        }
        getController() {
            return this.windowController;
        }
        hasMovedToWindowController(controller) {
            this.windowController = controller;
        }
    }
    seven.JMBWindow = JMBWindow;
/** @class Orgin
 *
 * defines a point in space using x and y corrdinates
 *
*/
    class Orgin extends seven.JBObject {
        constructor(x, y) {
            super();
            this.empty = true;
            this.x = x;
            this.y = y;
        }
        // empty is better that undefined 
        static empty() {
            var resultOrgin = new Orgin(0, 0);
            return resultOrgin;
        }
        /**
         *
         * @param srcOrgin the orgin which should be copied
         * @returns the copied orgin
         */
        static copyOrgin(srcOrgin) {
            var resultOrgin = new Orgin(0, 0);
            resultOrgin.x = srcOrgin.x;
            resultOrgin.y = srcOrgin.y;
            return resultOrgin;
        }
        /**
         * this method contains the difference between two Orgins
         * @param source the dominand orgin
         * @param counter the orgin which gets removed from source
         *@returns the source - counter
         */
        static difference(source, counter) {
            var result = new Orgin(0, 0);
            result.x = source.x - counter.x;
            result.y = source.y - counter.y;
            return result;
        }
        addOrgin(orgin) {
            if (orgin == undefined) {
                seven.Logger.develepor("Tried to add undefined orgin");
                return;
            }
            this.addX(orgin.x);
            this.addY(orgin.y);
        }
        removeOrgin(orgin) {
            if (orgin == undefined) {
                seven.Logger.develepor("Tried to remove undefined orgin");
                return this;
            }
            this.removeX(orgin.x);
            this.removeY(orgin.y);
            return this;
        }
        setX(x) {
            this.x = x;
        }
        setY(y) {
            this.y = y;
        }
        addX(x) {
            this.x = this.x + x;
        }
        addY(y) {
            this.y = this.y + y;
        }
        removeX(x) {
            this.x = this.x - x;
        }
        removeY(y) {
            this.y = this.y - y;
        }
        isEmpty() {
            return this.empty && this.x == 0 && this.x == 0;
        }
        setEmpty(empty) {
            this.empty = empty;
        }
        toString() {
            return "[x: " + this.x + " y: " + this.y + "]";
        }
        //@Override JBObject
        copyAttributes(toObject) {
            toObject.x = this.x;
            toObject.y = this.y;
        }
        //@Override JBObject
        copy() {
            var newOrgin = Orgin.copyOrgin(this);
            this.copyAttributes(newOrgin);
            return newOrgin;
        }
        toAbsolute() {
            this.x = Math.abs(this.x);
            this.y = Math.abs(this.y);
            return this;
        }
    }
    seven.Orgin = Orgin;
    class ResourceManager extends seven.JBObject {
        constructor() {
            super();
            this.images = new seven.JMBMap();
            this.callbacks = new seven.JMBMap();
            this.loadImage = undefined;
        }
        static manager() {
            if (ResourceManager._instance == undefined) {
                ResourceManager._instance = new ResourceManager();
            }
            return ResourceManager._instance;
        }
        imageForSrc(src, callback) {
            if (src == undefined) {
                return;
            }
            if (this.images.containsKey(src) == true) {
                return this.images.get(src);
            }
            this.callbacks.put(src, callback);
            if (this.loadImage != undefined) {
                return;
            }
            this.loadNextImage();
        }
        loadNextImage() {
            if (this.callbacks.keys().length == 0) {
                return;
            }
            var imageSrc = this.callbacks.keys()[0];
            this.loadImage = new Image();
            this.loadImage.src = imageSrc;
            this.loadImage.onload = (ev) => {
                this.imageLoaded();
            };
        }
        imageLoaded() {
            if (this.callbacks.keys().length == 0) {
                return;
            }
            var imageSrc = this.callbacks.keys()[0];
            var callback = this.callbacks.get(imageSrc);
            this.callbacks.remove(imageSrc);
            var imageClone = this.loadImage.cloneNode(true);
            imageClone.onload = undefined;
            this.images.put(imageSrc, imageClone);
            callback.call(imageClone);
            if (this.callbacks.keys().length > 0) {
                this.loadNextImage();
                return;
            }
            this.loadImage = undefined;
        }
    }
    seven.ResourceManager = ResourceManager;
//{INSERTORDER:2}
    class SizeClass extends seven.JBObject {
        constructor(id, width, height, description) {
            super();
            this.description = "<>";
            this.id = id;
            this.width = width;
            this.height = height;
            this.description = description;
        }
        static fromXML(xml) {
            var width = seven.Objects.requireNumber("SizeClass.fromXML : width was not defined/not a number", xml.attributes.getNamedItem("width").value);
            var height = seven.Objects.requireNumber("SizeClass.fromXML : hieght was not defined/not a number", xml.attributes.getNamedItem("height").value);
            var id = seven.Objects.requireNonNull("SizeClass.fromXML : id was not defined", xml.attributes.getNamedItem("id").value);
            var description = seven.Objects.orElse(xml.attributes.getNamedItem("description").value, "");
            return new SizeClass(id, width, height, description);
        }
        getId() {
            return this.id;
        }
        setWidth(width) {
            this.width = width;
        }
        getWidth() {
            return this.width;
        }
        setHeight(height) {
            this.height = height;
        }
        getHeight() {
            return this.height;
        }
        asRect() {
            return new seven.Rect(this.width, this.height, this.width, this.height);
        }
        getDescription() {
            return this.description;
        }
        setDescription(description) {
            this.description = description;
        }
        //@Override JBObject
        copyAttributes(toObject) {
            toObject.width = this.width;
            toObject.height = this.height;
            toObject.description = this.description;
        }
        //@Override JBObject
        copy() {
            var newSizeClass = new SizeClass(this.id, this.width, this.height);
            this.copyAttributes(newSizeClass);
            return newSizeClass;
        }
    }
    seven.SizeClass = SizeClass;
//{INSERTORDER:2}
    class TouchIntepreter extends seven.JBObject {
        constructor() {
            super();
        }
        setDelegate(delegate) {
            this.delegate = delegate;
        }
    }
    seven.TouchIntepreter = TouchIntepreter;
//{INSERTORDER:2}
    class TouchInterpreterConfiguration extends seven.JBObject {
        constructor() {
            super();
        }
    }
    seven.TouchInterpreterConfiguration = TouchInterpreterConfiguration;
//{INSERTORDER:4}
    class TouchManager extends seven.JBObject {
        constructor() {
            super();
            //reciever
            this.recievers = new Array();
        }
        static manager() {
            if (TouchManager._instance == undefined) {
                TouchManager._instance = new TouchManager();
                TouchManager._instance.senderConfiguration = new seven.TouchSenderConfiguration();
                TouchManager._instance.interpreterConfiguration = new seven.TouchInterpreterConfiguration();
                TouchManager._instance.gestureConfiguration = new seven.GestureConfiguration();
            }
            return TouchManager._instance;
        }
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        static loadedInstance() {
            return TouchManager.manager();
        }
        getClassName() {
            return "TouchEvents.TouchManager";
        }
        // sender 
        get keyboardSender() {
            return this._keyboardSender;
        }
        set keyboardSender(sender) {
            this._keyboardSender = sender;
            sender.touchReciever = this;
            sender.setConfiguration(this.senderConfiguration);
            sender.addEventReciever(this.scrollIntepreter);
        }
        get mouseSender() {
            return this._mouseSender;
        }
        set mouseSender(sender) {
            this._mouseSender = sender;
            sender.touchReciever = this;
            sender.setConfiguration(this.senderConfiguration);
            sender.addEventReciever(this.dragIntepreter);
            sender.addEventReciever(this.tapGesture);
            sender.addEventReciever(this.scrollIntepreter);
        }
        get screenSender() {
            return this._screenSender;
        }
        set screenSender(sender) {
            this._screenSender = sender;
            sender.touchReciever = this;
            sender.setConfiguration(this.senderConfiguration);
            sender.addEventReciever(this.dragIntepreter);
            sender.addEventReciever(this.tapGesture);
            sender.addEventReciever(this.scrollIntepreter);
        }
        //interpreter
        get dragIntepreter() {
            return this._dragIntepreter;
        }
        set dragIntepreter(intepreter) {
            this._dragIntepreter = intepreter;
        }
        get scrollIntepreter() {
            return this._scrollInterpreter;
        }
        set scrollIntepreter(intepreter) {
            this._scrollInterpreter = intepreter;
        }
        //gesture
        get tapGesture() {
            return this._tapGesture;
        }
        set tapGesture(value) {
            this._tapGesture = value;
            this._tapGesture.setConfiguration(this.gestureConfiguration);
        }
        //reciever
        addTouchReciever(touchReciever) {
            this.recievers.push(touchReciever);
        }
        touchBegan(touchEvent) {
            for (let reciever of this.recievers) {
                reciever.touchBegan(touchEvent);
            }
        }
        touchMoved(touchEvent) {
            for (let reciever of this.recievers) {
                reciever.touchMoved(touchEvent);
            }
        }
        touchEnded(touchEvent) {
            for (let reciever of this.recievers) {
                reciever.touchEnded(touchEvent);
            }
        }
        touchCanceled(touchEvent) {
            for (let reciever of this.recievers) {
                reciever.touchCanceled(touchEvent);
            }
        }
    }
    TouchManager.className = "seven.TouchManager";
    seven.TouchManager = TouchManager;
seven.ClassLoader.manager().loadInstance(seven.TouchManager.className);
//{INSERTORDER:3}
    class TouchSender extends seven.JBObject {
        constructor() {
            super();
            this.eventReciever = new seven.JMBMap();
        }
        setConfiguration(configuration) {
            this.configuration = configuration;
        }
        setTouchReciever(touchReciever) {
            this.touchReciever = touchReciever;
        }
        addEventReciever(eventReciever) {
            this.eventReciever.put(eventReciever.getClassName(), eventReciever);
        }
        removeEventReciever(eventReciever) {
            this.eventReciever.remove(eventReciever.getClassName());
        }
        initEvents() {
        }
        getUserInfo(event) {
            return { "x": "0", "y": "0" };
        }
    }
    seven.TouchSender = TouchSender;
//{INSERTORDER:2}
    class TouchSenderConfiguration extends seven.JBObject {
        constructor() {
            super();
            this.keyHoldMove = 400;
            this.screenLongPressTime = 300;
            this.mouseLongPressTime = 100;
        }
        getKeyHoldMove() {
            return this.keyHoldMove;
        }
        setKeyHoldMove(value) {
            this.keyHoldMove = value;
        }
        setScreenLongPressTime(longPressTime) {
            this.screenLongPressTime = longPressTime;
        }
        getScreenLongPressTime() {
            return this.screenLongPressTime;
        }
        setMouseLongPressTime(longPressTime) {
            this.mouseLongPressTime = longPressTime;
        }
        getMouseLongPressTime() {
            return this.mouseLongPressTime;
        }
    }
    seven.TouchSenderConfiguration = TouchSenderConfiguration;
//{INSERTORDER:2}
    class View extends seven.JBObject {
        constructor() {
            super();
            this.frame = seven.Rect.empty();
            this.bounds = seven.Rect.empty();
            this.viewId = "";
            this.gestureActions = new seven.JMBMap();
            this.viewExtentions = new Array();
            this.subViews = new Array();
        }
        /**
         * @param frame the frame which the view should get
         */
        initWitFrame(frame) {
            this.frame = seven.Rect.copyRect(frame);
            return this;
        }
        /**
        * @param key a vaid size-key
        */
        initWithViewId(id) {
            this.viewId = id;
            return this;
        }
        remove() {
            if (this.superView) {
                this.superView.removeSubView(this);
            }
            this.superView = undefined;
        }
        removeSubView(subView) {
            for (var index in this.subViews) {
                if (this.subViews[index] == subView) {
                    this.subViews.splice(parseInt(index), 1);
                }
            }
        }
        getWindow() {
            if (this.window) {
                return this.window;
            }
            if (this.superView) {
                return this.superView.getWindow();
            }
        }
        addSubview(view) {
            if (view.superView != undefined) {
                view.superView.removeSubView(view);
            }
            this.subViews.push(view);
            view.setSuperView(this);
        }
        setSuperView(view) {
            this.superView = view;
        }
        //@override
        draw(orgin) { }
        drawSubViews(orgin) {
            var subViewOrgin = seven.Orgin.copyOrgin(orgin);
            this.subViews.forEach(element => {
                element.draw(subViewOrgin);
            });
        }
        addGestureCallback(callback) {
            if (callback.getType() == seven.GestureType.None) {
                seven.Logger.error("view - addGestureCallback gesture txpe must not be null");
            }
            this.gestureActions.put(callback.getKey(), callback);
        }
        getSubViews() {
            var views = new Array();
            for (let view of this.subViews) {
                views.push(view);
            }
            return views;
        }
        createHtmlContainer(id) {
            throw new Error("this method should be overwritten");
        }
        hasGestureType(needle) {
            for (let gestureType of this.gestureActions.keys()) {
                if (gestureType == needle) {
                    return true;
                }
            }
            return false;
        }
        fireGesture(key, values) {
            if (this.gestureActions.containsKey(key) == false || this.gestureActions.get(key) == undefined) {
                seven.Logger.error("view.fireGesture() - gesture not found");
            }
            var gestureAction = this.gestureActions.get(key);
            gestureAction.call(values);
        }
        //@Override JBObject
        copyAttributes(toObject) {
            super.copyAttributes(toObject);
            toObject.superView = this.superView;
            for (let gesture of this.gestureActions.values()) {
                toObject.gestureActions.put(gesture.getKey(), gesture.copy());
            }
            toObject.window = this.window;
            toObject.tag = this.tag;
        }
        //@Override - JBObject 
        copy() {
            throw new Error("can't create abstract object");
        }
        scroll(diff) {
            seven.Logger.develepor("view - scrol() called and not taken");
        }
    }
    seven.View = View;
//{INSERTORDER:3}
    class CanvasWindow extends seven.JMBWindow {
        constructor() {
            super();
        }
        //@override
        initWithCanvasID(canvasID) {
            super.initWithID(canvasID);
            this.setUpView();
            return this;
        }
        setUpView() {
            this.view = new seven.HtmlCanvasView(this.htmlElementId);
            this.view.window = this;
        }
        remove() {
            this.view.remove();
        }
    }
    seven.CanvasWindow = CanvasWindow;
//{INSERTORDER:2}
    class JBDocument extends seven.JBObject {
        constructor() {
            super();
            this.windows = new Array();
        }
        /**@returns the shared document singleton */
        static document() {
            if (JBDocument._instance == undefined) {
                JBDocument._instance = new JBDocument();
                JBDocument._instance.doucmentView = new seven.DocumentView();
                JBDocument._instance.documentController = new seven.DocumentController();
                JBDocument._instance.doucmentView.setController(JBDocument._instance.documentController);
            }
            return JBDocument._instance;
        }
        /**
        *
        * @param resizeManager resizeManager takes controll over resizing #BigSuprise usually u get this for free - your welcome
        * mostly it is defined in the {Global.ClassLoader} in the global space for the inital loader
        */
        setResizeManager(resizeManager) {
            this.resizeManager = resizeManager;
        }
        /**
        *
        * @returns resizeManager takes controll over resizing #BigSuprise usually u get this for free - your welcome
        * mostly it is defined in the {Global.ClassLoader} in the global space for the inital loader
        */
        getResizeManager() {
            return this.resizeManager;
        }
        /**
         *
         * @param sizeLoader handles the sizing - how many size classes and which one to use,i.e. ipadPortrait
         */
        setSizeLoader(sizeLoader) {
            this.sizeLoader = sizeLoader;
        }
        getSizeLoader() {
            return this.sizeLoader;
        }
        /**
         *
         * @param windowLoader the window loader is the instance that decides,which windows should be loaded
         * - this takes can only be handled by you - so provide a implementation to get started
         * mostly it is defined in the {Global.ClassLoader} in the global space for the inital loader
         */
        setWindowLoader(windowLoader) {
            this.windowLoader = windowLoader;
        }
        getWindowLoader() {
            return this.windowLoader;
        }
        hasWindowLoader() {
            if (this.windowLoader == undefined) {
                return false;
            }
            return true;
        }
        prepareLoading() {
            seven.Objects.requireNonNull("DocumentDelegate.setup() document must not be null", document);
            seven.Objects.requireNonNull("DocumentDelegate.windowLoader must not be null", JBDocument.document().getWindowLoader());
            seven.Objects.requireNonNull("DocumentDelegate.resizeManager must not be null", this.resizeManager);
            seven.Objects.requireNonNull("DocumentDelegate.sizeLoader must not be null", this.sizeLoader);
            this.windowLoader.setup(this);
            this.resizeManager.setup(this);
        }
        load() {
            //@TODO - define options better userInfo (iPad,ScreenSize,...)
            this.sizeLoader.initWithOptions(seven.UserInfo.clientInfo());
            this.windowLoader.loadWindows(this.sizeLoader.getSizeClass());
        }
        startRendering() {
            this.render();
            this.resizeManager.startResizing();
        }
        /**
         *
         *this is needed to change the window loader (switch between pages)
         */
        reloadWindows() {
            JBDocument.document().getWindowLoader().loadWindows(this.sizeLoader.getSizeClass());
            this.render();
            this.resizeManager.startResizing();
        }
        setDocumentController(documentController) {
            this.documentController = documentController;
        }
        addSubWindow(window) {
            seven.Objects.requireNonNull("Document : Added window must not be null", window);
            this.windows.push(window);
            this.doucmentView.addSubview(window.view);
            if (window.getController() != undefined) {
                this.documentController.addChildViewController(window.getController());
            }
        }
        removeSubWindow(window) {
            for (var index in this.windows) {
                if (this.windows[index] == window) {
                    this.windows.splice(parseInt(index), 1);
                }
            }
        }
        getWindows() {
            return this.windows;
        }
        /**redraw the view - this is mainly to render the changes in the canvas views */
        render() {
            for (let subView of this.doucmentView.subViews) {
                subView.resetReferenceFrame();
            }
            for (let subView of this.doucmentView.subViews) {
                subView.buildConstraints();
            }
            for (let subView of this.doucmentView.subViews) {
                subView.buildAppliadFrame();
            }
            for (let subView of this.doucmentView.subViews) {
                subView.draw(new seven.Orgin(0, 0));
            }
        }
        /**
        *                 |
        *  vetical   =    |
        *                 |
        * horizontal = -- -- --
        *
        * @argument value : the value in scale with the sizeclass
        *@returns the value in scale with the screen(actual displayed value)
        */
        verticalScreenValue(value, useBaseClass = true) {
            if (this.getResizeManager() == undefined || this.getResizeManager().hasSizeClass() == false) {
                return value;
            }
            return this.getResizeManager().verticalScreenValue(value, useBaseClass);
        }
        /**
         *                 |
         *   vetical  =    |
         *                 |
         * horizontal = -- -- --
         *
        * @argument value : the value in scale with the sizeclass
        *@returns the value in scale with the screen(actual displayed value)
        */
        horizontalScreenValue(value, useBaseClass = true) {
            if (this.getResizeManager() == undefined || this.getResizeManager().hasSizeClass() == false) {
                return value;
            }
            return this.getResizeManager().horizontalScreenValue(value, useBaseClass);
        }
        /**
         *                 |
         *   vetical  =    |
         *                 |
         * horizontal = -- -- --
         *
         * @argument value : the value in scale with the screen(actual displayed value)
         *@returns the value in scale with the sizeclass
         */
        verticalReferenceValue(value, useBaseClass = true) {
            if (this.getResizeManager() == undefined || this.getResizeManager().hasSizeClass() == false) {
                return value;
            }
            return this.getResizeManager().verticalReferenceValue(value, useBaseClass);
        }
        /**
         *                 |
         *   vetical  =    |
         *                 |
         * horizontal = -- -- --
         *
         * @argument value : the value in scale with the screen(actual displayed value)
         *@returns the value in scale with the sizeclass
         */
        horizontalReferenceValue(value, useBaseClass = true) {
            if (this.getResizeManager() == undefined || this.getResizeManager().hasSizeClass() == false) {
                return value;
            }
            return this.getResizeManager().horizontalReferenceValue(value, useBaseClass);
        }
        /*
            Callbacks from the Drag - Touchinterpreters
            will find the toppest view witch is dragable
            and notify its controller, that a dragStart
            @TODO - Maybe the wrong place for it here
        */
        dragStart(orgin) {
            this.dragView = this.doucmentView.getViewForOrignAndOptions(orgin, (view) => {
                return view.dragable == true;
            });
            if (this.dragView != undefined) {
                this.dragView = this.dragView.getController().dragStart(orgin, this.dragView);
            }
            return this.dragView;
        }
        /*
            Callbacks from the Drag - Touchinterpreters
            get the toppest view for the dragging position(finger location)
            and if a drag has stopped visiting a controllers region(draged over somewhere) --> notify that controller
            @TODO - Maybe the wrong place for it here
        */
        dragMove(orgin) {
            if (this.dragView == undefined) {
                seven.Logger.error("JBDocument.dragMove() - dragView should not be undefined here");
                return;
            }
            var testView = this.doucmentView.getViewForOrignAndOptions(orgin, (view) => {
                return view.controller != undefined;
            });
            if (testView == undefined || testView.getController() == undefined) {
                return;
            }
            var testViewController = testView.getController();
            if (this.currentDragReciever == undefined) {
                this.currentDragReciever = testViewController;
            }
            if (testViewController != this.currentDragReciever) {
                this.currentDragReciever.dragHasLeft();
                this.currentDragReciever = testViewController;
            }
            testViewController.dragHasMoved(orgin, this.dragView);
        }
        /*
            Callbacks from the Drag - Touchinterpreters
            get the toppest view for the dragging position(finger location)
            that view's controller wins and gets to decide what to to with the view
            @TODO - Maybe the wrong place for it here
        */
        dragEnd(orgin) {
            var posiibleViews = new Array();
            this.doucmentView.getViewsForOrgin(posiibleViews, orgin);
            for (let view of posiibleViews) {
                if (view == undefined || view.getController() == undefined) {
                    continue;
                }
                var testViewController = view.getController();
                if (testViewController.dragHasEnded(orgin, this.dragView)) {
                    break;
                }
            }
            //reset them vars
            this.dragView = undefined;
            this.currentDragReciever = undefined;
        }
        /*
            Callbacks from the Scroll - Touchinterpreters
            get the toppest view that is scrollable and notify it that a scroll happend
            @TODO - Maybe the wrong place for it here
        */
        scrollMove(orgin, difference) {
            var scrollView = this.doucmentView.getViewForOrignAndOptions(orgin, (view) => {
                return view.scrollable == true;
            });
            if (scrollView == undefined) {
                return;
            }
            scrollView.scroll(difference);
            this.render();
        }
        /*
            Callbacks from the Click-Gesture Sender
            get the toppest view that will react to the event
            @TODO - Maybe the wrong place for it here
        */
        tapRecieved(orgin, values) {
            var key = seven.TapGestureCallback.keyOf(values);
            var gestureReciever = this.doucmentView.getViewForOrignAndOptions(orgin, (view) => {
                return view.hasGestureType(key);
            });
            if (gestureReciever != undefined) {
                gestureReciever.fireGesture(key, values);
            }
        }
        /*
                Callbacks from the Click-Gesture Sender
                get the toppest view that will react to the event
                @TODO - Maybe the wrong place for it here
            */
        clickRecieved(orgin, values) {
            var key = seven.ClickGestureCallback.keyOf(values);
            var gestureReciever = this.doucmentView.getViewForOrignAndOptions(orgin, (view) => {
                return view.hasGestureType(key);
            });
            if (gestureReciever != undefined) {
                gestureReciever.fireGesture(key, values);
            }
        }
    }
    seven.JBDocument = JBDocument;
//{INSERTORDER:3}
    class DragTouchInterpreter extends seven.TouchIntepreter {
        constructor() {
            super();
            this.touchOffset = seven.Orgin.empty();
            this.layoutView = new Array();
            this.setDelegate(seven.JBDocument.document());
        }
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        static loadedInstance() {
            var loadedInstance = seven.ClassLoader.manager().getLoadedInstance(DragTouchInterpreter.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var dragIntepreter = new DragTouchInterpreter();
            seven.TouchManager.manager().dragIntepreter = dragIntepreter;
            return dragIntepreter;
        }
        setDelegate(delegate) {
            this.delegate = delegate;
        }
        mousedown(event, touchEvent) {
        }
        mouseup(event, touchEvent) {
            if (this.htmlContainer == undefined) {
                return;
            }
            this.delegate.dragEnd(touchEvent.getOrgin());
            this.sourceView.hidden = false;
            this.sourceView.mark = "";
            // this.sourceView.appliadFrame = Rect.copyRect(this.dragView.appliadFrame);
            //   this.sourceView.superView.addSubview(this.sourceView);
            this.htmlContainer.remove();
            this.htmlContainer = undefined;
            this.dragView = undefined;
            seven.JBDocument.document().render();
        }
        mousemove(event, touchEvent) {
            this.delegateTouchEvent = touchEvent;
            //console.info(touchEvent.getDifference().toString());
            this.checkDrag();
            if (this.htmlContainer != undefined) {
                var x = seven.JBDocument.document().getResizeManager().horizontalReferenceValue(touchEvent.getOrgin().x, true);
                var y = seven.JBDocument.document().getResizeManager().verticalReferenceValue(touchEvent.getOrgin().y, true);
                this.htmlContainer.initialReferenceFrame.setX(x - this.touchOffset.x);
                this.htmlContainer.initialReferenceFrame.setY(y - this.touchOffset.y);
                seven.JBDocument.document().render();
                this.delegate.dragMove(touchEvent.getOrgin());
                for (let view of this.layoutView) {
                    view.layoutForDrag(new seven.Orgin(x, y));
                }
            }
        }
        mouseout(event, touchEvent) {
            if (event.srcElement != event.target) {
                return;
            }
            seven.JBDocument.document().render();
            if (this.htmlContainer != undefined) {
                this.delegate.dragEnd(touchEvent.getOrgin());
            }
        }
        touchstart(event, touchEvent) {
            this.delegateTouchEvent = touchEvent;
            seven.TouchManager.manager().screenSender.addLongPressCallback(new seven.VoidCallback(this, this.screenLongPressDected));
        }
        touchmove(event, touchEvent) {
            this.delegateTouchEvent = touchEvent;
            //console.info(touchEvent.getDifference().toString());
            this.checkDrag();
            if (this.htmlContainer != undefined) {
                var x = seven.JBDocument.document().getResizeManager().horizontalReferenceValue(touchEvent.getOrgin().x, true);
                var y = seven.JBDocument.document().getResizeManager().verticalReferenceValue(touchEvent.getOrgin().y, true);
                this.htmlContainer.initialReferenceFrame.setX(x - this.touchOffset.x);
                this.htmlContainer.initialReferenceFrame.setY(y - this.touchOffset.y);
                seven.JBDocument.document().render();
                this.delegate.dragMove(touchEvent.getOrgin());
                for (let view of this.layoutView) {
                    view.layoutForDrag(new seven.Orgin(x, y));
                }
                seven.JBNotificationCenter.touchEventManager().postNotificationForName("dragStart", undefined);
            }
        }
        touchend(event, touchEvent) {
            this.delegateTouchEvent = touchEvent;
            if (this.htmlContainer == undefined) {
                return;
            }
            seven.JBNotificationCenter.touchEventManager().postNotificationForName("dragEnd", undefined);
            this.delegate.dragEnd(touchEvent.getOrgin());
            this.sourceView.hidden = false;
            this.sourceView.mark = "";
            this.htmlContainer.remove();
            this.htmlContainer = undefined;
            this.dragView = undefined;
            seven.JBDocument.document().render();
        }
        touchcancel(event, touchEvent) {
            seven.JBNotificationCenter.touchEventManager().postNotificationForName("dragEnd", undefined);
        }
        longPressDetected() {
            this.delegateTouchEvent.setDragging(true);
            this.checkDrag();
        }
        screenLongPressDected() {
            this.delegateTouchEvent.setDragging(true);
            this.screenCheckDrag();
            this.checkDrag();
        }
        screenCheckDrag() {
            if (this.delegateTouchEvent.isDragging() == true && this.htmlContainer == undefined) {
                seven.JBNotificationCenter.touchEventManager().postNotificationForName("dragStart", undefined);
            }
        }
        checkDrag() {
            if (this.delegateTouchEvent.isDragging() == true && this.htmlContainer == undefined) {
                this.sourceView = this.delegate.dragStart(this.delegateTouchEvent.getOrgin());
                if (this.sourceView == undefined) {
                    return;
                }
                this.sourceView.mark = "dragView";
                this.buildTouchOffset(this.sourceView);
                this.prepareDragView();
                this.prepareHtmlContainer();
                seven.JBDocument.document().doucmentView.addSubview(this.htmlContainer);
                this.htmlContainer.addSubview(this.dragView);
                seven.JBDocument.document().render();
            }
        }
        prepareDragView() {
            this.dragView = this.sourceView.copy();
            this.dragView.subViews = new Array();
            this.sourceView.hidden = true;
            this.dragView.referenceFrame.setX(0);
            this.dragView.referenceFrame.setY(0);
            this.sourceView.copyAllSubViews(this.dragView);
        }
        prepareHtmlContainer() {
            this.htmlContainer = this.dragView.createHtmlContainer("dragTouch");
            this.htmlContainer.zIndex = 20;
            var totalOffset = this.dragView.referenceOffset();
            this.htmlContainer.referenceFrame = seven.Rect.copyRect(this.dragView.referenceFrame);
            this.htmlContainer.referenceFrame.setX(totalOffset.x);
            this.htmlContainer.referenceFrame.setY(totalOffset.y);
            this.htmlContainer.initWithReferenceFrame(this.htmlContainer.referenceFrame);
            var con = this.htmlContainer;
            con.canvas.style.backgroundColor = "transparent";
        }
        buildTouchOffset(toView) {
            var viewOrgin = toView.screenOffset();
            var touchOrgin = this.delegateTouchEvent.getOrgin();
            touchOrgin.removeOrgin(viewOrgin);
            var x = seven.JBDocument.document().getResizeManager().horizontalReferenceValue(touchOrgin.x, true);
            var y = seven.JBDocument.document().getResizeManager().verticalReferenceValue(touchOrgin.y, true);
            this.touchOffset = new seven.Orgin(x, y);
        }
        addLayoutView(layoutView) {
            for (let view of this.layoutView) {
                if (view == layoutView) {
                    return;
                }
            }
            this.layoutView.push(layoutView);
        }
        emptyLayoutView() {
            this.layoutView = new Array();
        }
    }
    DragTouchInterpreter.className = "seven.DragTouchInterpreter";
    seven.DragTouchInterpreter = DragTouchInterpreter;
seven.ClassLoader.manager().loadInstance(seven.DragTouchInterpreter.className);
//{INSERTORDER:3}
/**
 * a wrapper for a div - htmlelement
 *
*/
    class HtmlElementView extends seven.View {
        constructor(elementId) {
            super();
            if (elementId == undefined) {
                return;
            }
            this.elementId = elementId;
            this.element = document.getElementById(elementId);
            if (this.element) {
                seven.Logger.error("Element already exists for Id : " + this.elementId);
                return;
            }
            this.element = document.createElement("div");
            this.backgroundColor = seven.ViewUtility.randomColor();
            this.element.id = elementId;
            this.element.style.position = "fixed";
            this.element.style.display = "none";
            document.body.appendChild(this.element);
        }
        setSuperView(view) {
            super.setSuperView(view);
            this.element.style.display = "inline";
        }
        remove() {
            this.element.style.display = "none";
        }
        draw(orgin) {
            var drawRect = seven.Rect.copyRect(this.appliadFrame);
            drawRect.setX(drawRect.x() + orgin.x);
            drawRect.setY(drawRect.y() + orgin.y);
            this.element.style.left = "" + drawRect.x() + "px";
            this.element.style.top = "" + drawRect.y() + "px";
            this.element.style.backgroundColor = seven.ViewUtility.randomColor();
            this.element.style.width = this.appliadFrame.width() + "px";
            this.element.style.height = this.appliadFrame.height() + "px";
            this.element.style.zIndex = "" + this.getZIndex();
            this.drawSubViews(new seven.Orgin(0, 0));
        }
    }
    seven.HtmlElementView = HtmlElementView;
//{INSERTORDER:3}
/**
 * the view for a window
 */
    class HtmlWindowView extends seven.View {
        constructor() {
            super();
            this.htmlWindow = window;
            this.initWithReferenceFrame(new seven.Rect(0, 0, this.htmlWindow.innerWidth, this.htmlWindow.innerHeight));
        }
        //@override
        draw() {
            throw new Error("this view cannot be drawn. this should only be used for sizing the subviews");
        }
    }
    seven.HtmlWindowView = HtmlWindowView;
//{INSERTORDER:4}
    class KeyboardSender extends seven.TouchSender {
        constructor() {
            super(...arguments);
            this.acceleration = 1.0;
        }
        getClassName() {
            return KeyboardSender.className;
        }
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        static loadedInstance() {
            var loadedInstance = seven.ClassLoader.manager().getLoadedInstance(KeyboardSender.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var keyboardSender = new KeyboardSender();
            seven.TouchManager.manager().keyboardSender = keyboardSender;
            keyboardSender.initEvents();
            return keyboardSender;
        }
        initEvents() {
            seven.Objects.requireNonNull("MouseTouchSender.reciever must not be null", this.touchReciever);
            var that = this;
            document.onkeydown = (event) => {
                that.keyDown.call(that, event);
            };
            document.onkeyup = (event) => {
                that.keyUp.call(that, event);
            };
            document.onkeypress = (event) => {
                that.keyPress.call(that, event);
            };
        }
        getConfiguration() {
            return this.configuration;
        }
        keyDown(event) {
            this.sendKeyDown(event);
            //  clearInterval(this.timer);
            var that = this;
            //  this.timer = setInterval(function () {
            //     that.sendKeyDown(event);
            //  }, this.configuration.getKeyHoldMove());
        }
        sendKeyDown(event) {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.keyDownRecieved(userInfo);
            if (touchEvent == undefined) {
                return;
            }
            for (let entry of this.eventReciever.values()) {
                entry.keyDown(event, touchEvent);
            }
            this.touchReciever.touchMoved(touchEvent);
        }
        keyUp(event) {
            this.acceleration = 1.0;
        }
        keyPress(event) {
        }
        getUserInfo(event) {
            return { "key": event.key };
        }
        keyDownRecieved(userInfo) {
            this.acceleration += 0.2;
            var difference = this.differenceForKey(userInfo.key);
            if (difference == undefined) {
                return undefined;
            }
            var touchEvent = new seven.JBTouchEvent();
            touchEvent.setDifference(difference);
            return touchEvent;
        }
        differenceForKey(key) {
            var move = 10 * this.acceleration;
            if (key == "ArrowLeft") {
                //left
                return new seven.Orgin(move, 0);
            }
            if (key == "ArrowUp") {
                //up
                return new seven.Orgin(0, move);
            }
            if (key == "ArrowRight") {
                //right
                return new seven.Orgin(-move, 0);
            }
            if (key == "ArrowDown") {
                //down
                return new seven.Orgin(0, -move);
            }
            return undefined;
        }
    }
    KeyboardSender.className = "seven.KeyboardSender";
    seven.KeyboardSender = KeyboardSender;
seven.ClassLoader.manager().after(seven.TouchManager.className, seven.KeyboardSender.className);
//{INSERTORDER:4}
    class MouseSender extends seven.TouchSender {
        constructor() {
            super();
            this.orgin = seven.Orgin.empty();
            this.mousePressedDown = false;
            this.startOrgin = seven.Orgin.empty();
        }
        getClassName() {
            return MouseSender.className;
        }
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        static loadedInstance() {
            var loadedInstance = seven.ClassLoader.manager().getLoadedInstance(MouseSender.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var mouseSender = new MouseSender();
            seven.TouchManager.manager().mouseSender = mouseSender;
            mouseSender.initEvents();
            return mouseSender;
        }
        getConfiguration() {
            return this.configuration;
        }
        initEvents() {
            seven.Objects.requireNonNull("MouseTouchSender.touchReciever must not be null", this.touchReciever);
            document.onmousedown = (event) => {
                this.mousedown.call(this, event);
            };
            document.onmousemove = (event) => {
                this.mousemove.call(this, event);
            };
            document.onmouseup = (event) => {
                this.mouseup.call(this, event);
            };
            document.onmouseout = (event) => {
                this.mouseout.call(this, event);
            };
            document.onwheel = (event) => {
                event.preventDefault();
                //console.log(event.deltaX);
                this.wheel(event);
            };
        }
        mousePressed() {
            this.mousePressedDown = true;
        }
        //@override TouchSender
        getUserInfo(event) {
            var userInfo = { "x": event.clientX, "y": event.clientY };
            return userInfo;
        }
        /* Callback functions for Events */
        mousedown(event) {
            this.time = setTimeout(() => {
                this.mousePressed();
            }, 100);
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.mouseDownRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.mousedown(event, touchEvent);
            }
            this.touchReciever.touchBegan(touchEvent);
        }
        mousemove(event) {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.mouseMoveRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.mousemove(event, touchEvent);
            }
            this.touchReciever.touchMoved(touchEvent);
        }
        mouseup(event) {
            window.clearTimeout(this.time);
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.mouseUpRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.mouseup(event, touchEvent);
            }
            this.touchReciever.touchEnded(touchEvent);
            this.resetState();
        }
        wheel(event) {
            //console.log(event.wheelDeltaX + " " + event.wheelDeltaY);
            for (let entry of this.eventReciever.values()) {
                if (typeof entry.mousewheel != "function") {
                    continue;
                }
                entry.mousewheel(event);
            }
        }
        mouseout(event) {
            if (event.fromElement != event.toElement) {
                return;
            }
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.mouseOutRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.mouseout(event, touchEvent);
            }
            this.touchReciever.touchCanceled(touchEvent);
            this.resetState();
        }
        /* Proccessing events for touch reciever  */
        mouseDownRecievedTouchEvent(userInfo) {
            this.orgin = new seven.Orgin(userInfo.x, userInfo.y);
            this.startOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            var mouseOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            var touchEvent = new seven.JBTouchEvent();
            touchEvent.setDragging(false);
            touchEvent.setOrgin(mouseOrgin);
            touchEvent.setDifference(seven.Orgin.difference(mouseOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(new seven.Orgin(0, 0));
            return touchEvent;
        }
        mouseMoveRecievedTouchEvent(userInfo) {
            var touchEvent = new seven.JBTouchEvent();
            var mouseOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            if (this.orgin.isEmpty() == true) {
                this.orgin = mouseOrgin;
            }
            if (this.mousePressedDown == true) {
                touchEvent.setDragging(true);
            }
            touchEvent.setOrgin(mouseOrgin);
            touchEvent.setDifference(seven.Orgin.difference(mouseOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(seven.Orgin.difference(mouseOrgin, this.startOrgin));
            this.orgin = seven.Orgin.copyOrgin(mouseOrgin);
            return touchEvent;
        }
        mouseUpRecievedTouchEvent(userInfo) {
            var touchEvent = new seven.JBTouchEvent();
            var mouseOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            touchEvent.setDragging(false);
            touchEvent.setOrgin(mouseOrgin);
            touchEvent.setDifference(seven.Orgin.difference(mouseOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(seven.Orgin.difference(mouseOrgin, this.startOrgin));
            return touchEvent;
        }
        mouseOutRecievedTouchEvent(userInfo) {
            var touchEvent = new seven.JBTouchEvent();
            var mouseOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            touchEvent.setDragging(false);
            touchEvent.setOrgin(mouseOrgin);
            touchEvent.setDifference(seven.Orgin.difference(mouseOrgin, this.orgin));
            return touchEvent;
        }
        resetState() {
            this.orgin = seven.Orgin.empty();
            this.startOrgin = seven.Orgin.empty();
            this.mousePressedDown = false;
        }
    }
    MouseSender.className = "seven.MouseSender";
    seven.MouseSender = MouseSender;
seven.ClassLoader.manager().after(seven.TouchManager.className, seven.MouseSender.className);
//{INSERTORDER:2}
/**
 * @class represents a Rectangle in 2d - space
 *
 */
    class Rect extends seven.JBObject {
        constructor(x, y, width, height) {
            super();
            this.xPosition = x;
            this.yPosition = y;
            this.widthSize = width;
            this.heightSize = height;
        }
        /**
         *
         * @param object a valid rect object
         * @returns a rect from the object
         */
        static fromObject(object) {
            var newRect = new Rect(0, 0, 0, 0);
            newRect.setX(parseInt(object.x));
            newRect.setY(parseInt(object.y));
            newRect.setWidth(parseInt(object.width));
            newRect.setHeight(parseInt(object.height));
            return newRect;
        }
        static empty() {
            return new Rect(0, 0, 0, 0);
        }
        static copyRect(inputRect) {
            return new Rect(inputRect.x(), inputRect.y(), inputRect.width(), inputRect.height());
        }
        static difference(inputRect, counterRect) {
            var resultRect = new Rect(0, 0, 0, 0);
            resultRect.setX(inputRect.x() - counterRect.x());
            resultRect.setY(inputRect.y() - counterRect.y());
            resultRect.setWidth(inputRect.width() - counterRect.width());
            resultRect.setHeight(inputRect.height() - counterRect.height());
            return resultRect;
        }
        static merge(oneRect, anotherRect) {
            var resultRect = new Rect(0, 0, 0, 0);
            resultRect.setX(oneRect.x() + anotherRect.x());
            resultRect.setY(oneRect.y() + anotherRect.y());
            resultRect.setWidth(oneRect.width() + anotherRect.width());
            resultRect.setHeight(oneRect.height() + anotherRect.height());
            return resultRect;
        }
        get xPosition() {
            return this._xPosition;
        }
        set xPosition(value) {
            this._xPosition = parseInt("" + value);
        }
        get yPosition() {
            return this._yPosition;
        }
        set yPosition(value) {
            this._yPosition = parseInt("" + value);
        }
        get widthSize() {
            return this._widthSize;
        }
        set widthSize(value) {
            this._widthSize = parseInt("" + value);
        }
        get heightSize() {
            return this._heightSize;
        }
        set heightSize(value) {
            this._heightSize = parseInt("" + value);
        }
        equals(otherRect) {
            if (otherRect == undefined) {
                return false;
            }
            if (otherRect == this) {
                return true;
            }
            var rect = otherRect;
            if (rect.x() == this.x() && rect.y() == this.y() &&
                rect.width() == this.width() && rect.height() == this.height()) {
                return true;
            }
            return false;
        }
        isEmpty() {
            return this.xPosition == 0 && this.yPosition == 0 &&
                this.widthSize == 0 && this.heightSize == 0;
        }
        x() {
            return this.xPosition;
        }
        y() {
            return this.yPosition;
        }
        bottomLeft() {
            return this.yPosition + this.heightSize;
        }
        topRight() {
            return this.xPosition + this.widthSize;
        }
        width() {
            return this.widthSize;
        }
        height() {
            return this.heightSize;
        }
        setSizeChangeCallback(sizeChangeCallback) {
            this.sizeChangeCallback = sizeChangeCallback;
        }
        sizeChanged() {
            if (this.sizeChangeCallback != undefined) {
                this.sizeChangeCallback.call();
            }
        }
        removeRect(rect) {
            this.xPosition += rect.x();
            this.yPosition += rect.y();
            this.widthSize -= rect.width() * 2;
            this.heightSize -= rect.height() * 2;
            this.sizeChanged();
            return this;
        }
        remove(ammount) {
            this.xPosition -= ammount;
            this.yPosition -= ammount;
            this.widthSize -= ammount;
            this.heightSize -= ammount;
            this.sizeChanged();
            return this;
        }
        add(ammount) {
            this.xPosition += ammount;
            this.yPosition += ammount;
            this.widthSize += ammount;
            this.heightSize += ammount;
            this.sizeChanged();
        }
        setX(x) {
            this.xPosition = x;
            this.sizeChanged();
        }
        addX(x) {
            this.xPosition = this.xPosition + x;
            ;
            this.sizeChanged();
        }
        setY(y) {
            this.yPosition = parseInt("" + y);
            this.sizeChanged();
        }
        addY(y) {
            this.yPosition = this.yPosition + y;
            this.sizeChanged();
        }
        removeY(y) {
            this.yPosition = this.yPosition - y;
            this.sizeChanged();
        }
        setWidth(width) {
            this.widthSize = width;
            this.sizeChanged();
        }
        addWidth(width) {
            this.widthSize += width;
            this.sizeChanged();
        }
        removeWidth(width) {
            this.widthSize -= width;
            this.sizeChanged();
        }
        setHeight(height) {
            this.heightSize = height;
            this.sizeChanged();
        }
        addHeight(height) {
            this.heightSize = this.heightSize + height;
            this.sizeChanged();
        }
        removeHeight(height) {
            this.heightSize = this.heightSize - height;
            this.sizeChanged();
        }
        setOrgin(orgin) {
            this.xPosition = orgin.x;
            this.yPosition = orgin.y;
            this.sizeChanged();
        }
        addOrgin(orgin) {
            this.addX(orgin.x);
            this.addY(orgin.y);
        }
        size() {
            return new Rect(0, 0, this._widthSize, this._heightSize);
        }
        scaleBy(x, y, width, height) {
            return new Rect(this._xPosition * x, this._yPosition * y, this._widthSize * width, this._heightSize * height);
        }
        stepX() {
            this.xPosition = this.xPosition + this.widthSize;
            this.sizeChanged();
        }
        stepY() {
            this.yPosition = this.yPosition + this.heightSize;
            this.sizeChanged();
        }
        lazyContainsRect(otherRect, howLazyX, howLazyY) {
            if (howLazyX == undefined) {
                howLazyX = 0;
            }
            if (howLazyY == undefined) {
                howLazyY = 0;
            }
            if ((otherRect.topRight() + howLazyX) < this.x() || (otherRect.x() - howLazyX) > this.topRight()) {
                return false;
            }
            if ((otherRect.bottomLeft() + howLazyY) < this.y() || (otherRect.y() - howLazyY) > this.bottomLeft()) {
                return false;
            }
            return true;
        }
        containsRect(otherRect) {
            var contains = this.containsX(otherRect.x()) && this.containsY(otherRect.y()) &&
                this.containsTopRight(otherRect.topRight()) && this.containsBottomLeft(otherRect.bottomLeft());
            return contains;
        }
        containsOrgin(orgin) {
            var contains = this.containsX(orgin.x) && this.containsY(orgin.y);
            return contains;
        }
        containsX(x) {
            return this.xPosition <= x && x <= this.topRight();
        }
        containsY(y) {
            return this.yPosition <= y && y <= this.bottomLeft();
        }
        containsTopRight(topRight) {
            return topRight <= this.topRight();
        }
        containsBottomLeft(bottomLeft) {
            return bottomLeft <= this.topRight();
        }
        orgin() {
            return new seven.Orgin(this.xPosition, this.yPosition);
        }
        toJSON() {
            return '{"x": "' + this.x() + '", "y": "' + this.y() + '", "width": "' + this.width() + '", "height": "' + this.height() + '"}';
        }
        toString() {
            return "[x: " + this.x() + " y: " + this.y() + " width: " + this.width() + " height: " + this.height() + "]";
        }
        //@Override JBObject 
        copyAttributes(toObject) {
            toObject.xPosition = this.xPosition;
            toObject.yPosition = this.yPosition;
            toObject.widthSize = this.widthSize;
            toObject.heightSize = this.heightSize;
        }
        //@Override JBObject
        copy() {
            var newRect = Rect.copyRect(this);
            this.copyAttributes(newRect);
            return newRect;
        }
    }
    seven.Rect = Rect;
//{INSERTORDER:3}
    class TapGestureCallback extends seven.GestureCallback {
        constructor() {
            super();
            this.tapNumber = 0;
        }
        static keyOf(values) {
            TapGestureCallback.keyGenerator.tapNumber = values.get("tapCount");
            return TapGestureCallback.keyGenerator.getKey();
        }
        initWithMethod(thisRef, method) {
            throw new Error("TouchEvents::initWithMethod : bad init method ");
        }
        init(thisRef, tapNumber, method) {
            super.initWithMethod(thisRef, method);
            this.tapNumber = tapNumber;
            return this;
        }
        getKey() {
            return "" + seven.GestureType.Tap + "" + this.tapNumber;
        }
        getType() {
            return seven.GestureType.Tap;
        }
        copyAttributes(toObject) {
            super.copyAttributes(toObject);
        }
        copy() {
            var newObject = new TapGestureCallback();
            this.copyAttributes(newObject);
            return newObject;
        }
        call(values) {
            if (values.get("tapCount") == this.tapNumber) {
                this.method.call(this.thisRef);
            }
        }
    }
    TapGestureCallback.keyGenerator = new TapGestureCallback();
    seven.TapGestureCallback = TapGestureCallback;
//{INSERTORDER:3}
    class ViewController extends seven.AbstractViewController {
        constructor() {
            super();
        }
        documentController() {
            seven.Objects.requireNonNull("ViewController.docuemntController : tried to access nonnull value", seven.JBDocument.document().documentController);
            return seven.JBDocument.document().documentController;
        }
        get windowController() {
            seven.Objects.requireNonNull("ViewController.windowController : tried to access nonnull value", this._windowController);
            return this._windowController;
        }
        set windowController(value) {
            this._windowController = value;
        }
        setParentViewController(viewController) {
            this.parentViewController = viewController;
            if (viewController.getClassName() == seven.WindowController.className) {
                this.windowController = viewController;
            }
        }
    }
    seven.ViewController = ViewController;
//{INSERTORDER:3}
    class WindowController extends seven.AbstractViewController {
        constructor() {
            super();
        }
        getClassName() {
            return WindowController.className;
        }
        setWindow(window) {
            this.window = window;
        }
        addChildViewController(viewController) {
            viewController.setParentViewController(this);
            viewController.windowController = this;
            this.childViewController.push(viewController);
        }
    }
    WindowController.className = "WindowController";
    seven.WindowController = WindowController;
//{INSERTORDER:3}
/**
 * A canvasView represents no html element
 * all canvasViews get drawn on a containing html-canvas
 * whens its time to render it gets the htmlCanvas from the containing HtmlCanvas
 *
*/
    /// < V
    class CanvasView extends seven.View {
        constructor() {
            super();
            this.viewExtentions = new Array();
        }
        initWithReferenceFrame(frame) {
            super.initWithReferenceFrame(frame);
            return this;
        }
        /**
         *
         * @param id an html id
         * @param opacity the opacity with wich the container should be inited
         */
        createHtmlContainer(id, opacity) {
            var canvasContainer = document.createElement("CANVAS");
            canvasContainer.id = id;
            canvasContainer.style.zIndex = "10";
            canvasContainer.style.position = "fixed";
            canvasContainer.style.opacity = opacity != undefined ? opacity : "0.8";
            document.body.appendChild(canvasContainer);
            var htmlCanavsView = new seven.HtmlCanvasView(id);
            htmlCanavsView.zIndex = 10;
            return htmlCanavsView;
        }
        // returns the context of the HtmlCanvas
        getContext() {
            if (this.context) {
                return this.context;
            }
            if (this.superView) {
                return this.superView.getContext();
            }
        }
        /**
         * adds an extention to the view(border)
         * @param extention a valid extention
         */
        addViewExtention(extention) {
            this.viewExtentions.push(extention);
        }
        //@override
        draw(orgin) {
            if (this.hidden == true) {
                return;
            }
            var drawRect = seven.Rect.copyRect(this.appliadFrame);
            drawRect.setX(drawRect.x() + orgin.x);
            drawRect.setY(drawRect.y() + orgin.y);
            this.totalOffset = drawRect.orgin();
            if (this.appliadFrame.x() < 0) {
                var diff = this.appliadFrame.x();
                drawRect.setX(drawRect.x() - diff);
                drawRect.setWidth(drawRect.width() + diff);
            }
            if (this.appliadFrame.y() < 0) {
                var diff = this.appliadFrame.y();
                drawRect.setY(drawRect.y() - diff);
                drawRect.setHeight(drawRect.height() + diff);
            }
            if (this.backgroundColor == undefined) {
                this.backgroundColor = "white"; //ViewUtility.randomColor();
            }
            if (this.strokeColor) {
                this.getContext().strokeStyle = "" + this.strokeColor;
                this.getContext().strokeRect(drawRect.x(), drawRect.y(), drawRect.width(), this.appliadFrame.height());
            }
            this.drawBackground(drawRect);
            this.drawInRect(drawRect);
            this.drawSubViews(drawRect.orgin());
            this.drawViewExtentions(drawRect);
            this.drawDebug();
        }
        drawBackground(drawRect) {
            this.getContext().fillStyle = "" + this.backgroundColor;
            this.getContext().fillRect(drawRect.x(), drawRect.y(), drawRect.width(), this.appliadFrame.height());
            this.getContext().fillStyle = "black";
        }
        drawInRect(rect) {
            //this.getContext().fillText(rect.toString(),rect.x(),rect.y()+10);
        }
        drawViewExtentions(rect) {
            for (let extention of this.viewExtentions) {
                extention.drawInContext(this.getContext(), rect);
            }
            if (this.additionalDrawing) {
                this.additionalDrawing.call(this, this.getContext(), rect);
            }
            // this.getContext().fillText(rect.toString(),rect.x(),rect.y()+10);
        }
        drawDebug() {
            //  this.getContext().fillText(rect.toString(),rect.x(),rect.y()+10);
        }
        //@Override View
        copyAttributes(toObject) {
            super.copyAttributes(toObject);
            toObject.superView = this.superView;
            toObject.context = this.context;
        }
        //@Override - View 
        copy() {
            var newPrototypeTableCell = new CanvasView();
            this.copyAttributes(newPrototypeTableCell);
            return newPrototypeTableCell;
        }
    }
    seven.CanvasView = CanvasView;
//{INSERTORDER:3}
    class ClickGestureCallback extends seven.GestureCallback {
        constructor() {
            super();
        }
        static keyOf(values) {
            return ClickGestureCallback.keyGenerator.getKey();
        }
        getKey() {
            return "" + seven.GestureType.Click;
        }
        getType() {
            return seven.GestureType.Click;
        }
        copyAttributes(toObject) {
            super.copyAttributes(toObject);
        }
        copy() {
            var newObject = new ClickGestureCallback();
            this.copyAttributes(newObject);
            return newObject;
        }
    }
    ClickGestureCallback.keyGenerator = new ClickGestureCallback();
    seven.ClickGestureCallback = ClickGestureCallback;
//{INSERTORDER:3}
    class DocumentController extends seven.AbstractViewController {
        constructor() {
            super();
        }
        addChildViewController(viewController) {
            viewController.setParentViewController(this);
            this.childViewController.push(viewController);
        }
    }
    seven.DocumentController = DocumentController;
//{INSERTORDER:4}
    class ScreenSender extends seven.TouchSender {
        constructor() {
            super();
            this.orgin = seven.Orgin.empty();
            this.mousePressedDown = false;
            this.hasLongTouch = false;
            this.startOrgin = seven.Orgin.empty();
        }
        getClassName() {
            return ScreenSender.className;
        }
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        static loadedInstance() {
            var loadedInstance = seven.ClassLoader.manager().getLoadedInstance(ScreenSender.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var screenSender = new ScreenSender();
            seven.TouchManager.manager().screenSender = screenSender;
            screenSender.initEvents();
            return screenSender;
        }
        getConfiguration() {
            return this.configuration;
        }
        addLongPressCallback(callBack) {
            this.longPressCallback = callBack;
        }
        initEvents() {
            seven.Objects.requireNonNull("ScreenTouchSender.touchreciever must not be null", this.touchReciever);
            var that = this;
            $(document).on("touchstart", function (event) {
                event.preventDefault();
                that.touchstart(event);
            });
            $(document).on("touchmove", function (event) {
                event.preventDefault();
                that.touchmove(event);
            });
            $(document).on("touchend", function (event) {
                event.preventDefault();
                that.touchend(event);
            });
            $(document).on("touchcancel", function (event) {
                event.preventDefault();
                that.touchcancel(event);
            });
        }
        //@override TouchSender
        getUserInfo(event) {
            return { "x": event.originalEvent.pageX, "y": event.originalEvent.pageY };
        }
        /* Callback functions for Events */
        touchstart(event) {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.touchStartRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.touchstart(event, touchEvent);
            }
            var that = this;
            this.longPressTimer = window.setTimeout(function () { that.haslongTouchTrue.call(that); }, this.getConfiguration().getScreenLongPressTime());
            this.touchReciever.touchBegan(touchEvent);
        }
        touchmove(event) {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.touchMovedReceivedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.touchmove(event, touchEvent);
            }
            clearTimeout(this.longPressTimer);
            this.touchReciever.touchMoved(touchEvent);
        }
        touchend(event) {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.touchEndedRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.touchend(event, touchEvent);
            }
            this.touchReciever.touchEnded(touchEvent);
            this.resetState();
        }
        touchcancel(event) {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.touchCanceledRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.touchcancel(event, touchEvent);
            }
            this.touchReciever.touchCanceled(touchEvent);
            this.resetState();
        }
        /* Proccessing events for touch reciever  */
        touchStartRecievedTouchEvent(userInfo) {
            this.orgin = new seven.Orgin(userInfo.x, userInfo.y);
            this.startOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            var touchOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            var touchEvent = new seven.JBTouchEvent();
            touchEvent.setOrgin(touchOrgin);
            touchEvent.setDifference(seven.Orgin.difference(touchOrgin, this.orgin));
            return touchEvent;
        }
        touchMovedReceivedTouchEvent(userInfo) {
            var touchEvent = new seven.JBTouchEvent();
            var touchOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            touchEvent.setDragging(this.hasLongTouch);
            touchEvent.setOrgin(touchOrgin);
            touchEvent.setDifference(seven.Orgin.difference(touchOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(seven.Orgin.difference(touchOrgin, this.startOrgin));
            this.orgin = seven.Orgin.copyOrgin(touchOrgin);
            return touchEvent;
        }
        touchEndedRecievedTouchEvent(userInfo) {
            var touchEvent = new seven.JBTouchEvent();
            var touchOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            touchEvent.setOrgin(touchOrgin);
            touchEvent.setDifference(seven.Orgin.difference(touchOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(seven.Orgin.difference(touchOrgin, this.startOrgin));
            return touchEvent;
        }
        touchCanceledRecievedTouchEvent(userInfo) {
            var touchEvent = new seven.JBTouchEvent();
            var touchOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            touchEvent.setOrgin(touchOrgin);
            touchEvent.setDifference(seven.Orgin.difference(touchOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(seven.Orgin.difference(touchOrgin, this.startOrgin));
            return touchEvent;
        }
        haslongTouchTrue() {
            this.hasLongTouch = true;
            if (this.longPressCallback != undefined) {
                this.longPressCallback.call();
                this.longPressCallback = undefined;
            }
        }
        resetState() {
            this.orgin = new seven.Orgin(0, 0);
            this.hasLongTouch = false;
            this.longPressCallback = undefined;
            clearTimeout(this.longPressTimer);
        }
    }
    ScreenSender.className = "seven.ScreenSender";
    seven.ScreenSender = ScreenSender;
seven.ClassLoader.manager().after(seven.TouchManager.className, seven.ScreenSender.className);
//{INSERTORDER:3}
    class ScrollTouchInterpreter extends seven.TouchIntepreter {
        constructor() {
            super();
            this.animationStart = undefined;
            this.ignoreScroll = false;
            this.animationY = 0;
            this.setDelegate(seven.JBDocument.document());
            seven.JBNotificationCenter.touchEventManager().addObserverForName("dragStart", new seven.Observer(this, this.ignoreScrolling, undefined));
            seven.JBNotificationCenter.touchEventManager().addObserverForName("dragEnd", new seven.Observer(this, this.activateScrolling, undefined));
        }
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        static loadedInstance() {
            var loadedInstance = seven.ClassLoader.manager().getLoadedInstance(ScrollTouchInterpreter.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var scrollInterpreter = new ScrollTouchInterpreter();
            seven.TouchManager.manager().scrollIntepreter = scrollInterpreter;
            return scrollInterpreter;
        }
        setDelegate(delegate) {
            this.delegate = delegate;
        }
        touchstart(event, touchEvent) {
            //     this.animationY = 0;
        }
        touchmove(event, touchEvent) {
            if (this.ignoreScroll == true) {
                return;
            }
            var movedX = touchEvent.getDifference().x;
            this.movedY = touchEvent.getDifference().y;
            if (this.movedY < -5 || this.movedY > 5) {
                this.animationY += this.movedY * 5;
            }
            else {
                this.animationY = 0;
            }
            console.log("screen " + touchEvent.getDifference().y);
            this.moveOrgin = touchEvent.getOrgin().copy();
            this.delegate.scrollMove(this.moveOrgin, new seven.Orgin(movedX, this.movedY));
        }
        touchend(event, touchEvent) {
            this.startAnimation();
        }
        touchcancel(event, touchEvent) {
        }
        startAnimation() {
            if (this.animationY < -10 && this.animationY > 10) {
                return;
            }
            this.animate();
        }
        animate() {
            if (this.animationY <= 0 && this.animationY > -10) {
                return;
            }
            if (this.animationY >= 0 && this.animationY < 10) {
                return;
            }
            var animationBite = this.animationY * 0.1;
            this.animationY -= animationBite;
            console.log(animationBite + "bite" + Math.abs(Math.round(animationBite)));
            var time = 10;
            if (Math.abs(animationBite) < 50) {
                time = 5;
            }
            if (Math.abs(animationBite) < 10) {
                time = 3;
            }
            if (Math.abs(animationBite) < 2) {
                time = 1;
            }
            console.log("time" + time);
            this.delegate.scrollMove(this.moveOrgin, new seven.Orgin(0, this.movedY));
            setTimeout(() => { this.animate(); }, time);
        }
        mousedown(event, touchEvent) {
            this.keyboardTouchOrgin = touchEvent.getOrgin().copy();
        }
        mouseup(event, touchEvent) {
            this.keyboardTouchOrgin = touchEvent.getOrgin().copy();
        }
        mousemove(event, touchEvent) {
            this.keyboardTouchOrgin = touchEvent.getOrgin().copy();
        }
        mouseout(event, touchEvent) {
            //  this.keyboardTouchOrgin = undefined;
        }
        mousewheel(event) {
            //console.log("x " + event.deltaX + " y " + event.deltaY);
            var movedX = event.deltaX;
            var movedY = event.deltaY;
            this.moveOrgin = new seven.Orgin(event.clientX, event.clientY);
            //console.log(new Orgin(movedX, movedY).toString());
            this.delegate.scrollMove(this.moveOrgin, new seven.Orgin(movedX, movedY));
            /*   if(  this.movedY > 0 ){
                   this.move();
               }
               else{
                   this.moveUp();
               }
               */
        }
        move() {
            this.delegate.scrollMove(this.moveOrgin, new seven.Orgin(0, 50));
            var that = this;
            if (this.stop == true) {
                return;
            }
            setTimeout(function () {
                if (that.movedY > 0) {
                    that.movedY -= 50;
                    that.move();
                }
            }, 12);
        }
        moveUp() {
            this.delegate.scrollMove(this.moveOrgin, new seven.Orgin(0, -50));
            var that = this;
            if (this.stop == true) {
                return;
            }
            setTimeout(function () {
                if (that.movedY < 0) {
                    that.movedY += 50;
                    that.moveUp();
                }
            }, 12);
        }
        keyDown(event, touchEvent) {
            if (this.keyboardTouchOrgin == undefined) {
                console.log("keyboardTouchOrgin = undefined");
                return;
            }
            this.delegate.scrollMove(this.keyboardTouchOrgin.copy(), touchEvent.getDifference());
        }
        keyUp(event, touchEvent) {
        }
        keyPress(event, touchEvent) {
        }
        /* */
        ignoreScrolling() {
            this.ignoreScroll = true;
        }
        activateScrolling() {
            this.ignoreScroll = false;
        }
    }
    ScrollTouchInterpreter.className = "seven.ScrollTouchInterpreter";
    seven.ScrollTouchInterpreter = ScrollTouchInterpreter;
seven.ClassLoader.manager().loadInstance(seven.ScrollTouchInterpreter.className);
//{INSERTORDER:2}
    class SizeLoader extends seven.JBObject {
        constructor() {
            super();
            this.sizes = new seven.JMBMap();
            this.variables = new seven.JMBMap();
        }
        /**
            * This gives the instance, which was loaded by the Classloader
            * You can use this to access this instance afterwoulds-or don't, you decide
        */
        static loadedInstance() {
            var loadedInstance = seven.ClassLoader.manager().getLoadedInstance(SizeLoader.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var sizeLoader = new SizeLoader();
            sizeLoader.activeSizeCatalog = sizeLoader.getXMLSizeCatalog();
            seven.JBDocument.document().setSizeLoader(sizeLoader);
            return sizeLoader;
        }
        getClassName() {
            return SizeLoader.className;
        }
        initWithOptions(options) {
            this.activeSizeCatalog = this.getXMLSizeCatalog();
        }
        getSizeForKey(key) {
            if (this.sizes.containsKey(key) == true) {
                return this.sizes.get(key);
            }
            return undefined;
        }
        getSizeRectForKey(key) {
            var frame = undefined;
            if (this.sizes.containsKey(key) == true) {
                return this.sizes.get(key).getFrameForClass(this.getSizeClass()).copy();
            }
            seven.Logger.develeporError("SizeLoader : getSizeRectForKey : no size for key key <" + key + ">");
            return seven.Rect.empty();
        }
        getSizeClass() {
            return this.activeSizeCatalog.getSizeClass();
        }
        changeSizeClass(width, height) {
            this.activeSizeCatalog.changeForSize(width, height);
        }
        getBaseClass() {
            return this.activeSizeCatalog.getBaseClass();
        }
        getXMLSizeCatalog(key = "default") {
            var catalogXML = sizeXML.getElementById(key);
            if (catalogXML == undefined || catalogXML == null) {
                throw new Error("catalog for key <" + key + "> was not defined.");
            }
            var catalog = new seven.SizeCatalog(key);
            var baseClassXML = catalogXML.getElementsByTagName("baseClass")[0];
            if (baseClassXML == undefined || baseClassXML == null) {
                throw new Error("no baseClass in catalog <" + key + ">.");
            }
            catalog.setBaseClass(seven.SizeClass.fromXML(baseClassXML));
            for (let classes of catalogXML.getElementsByTagName("sizeClass")) {
                catalog.addSizeClasses(seven.SizeClass.fromXML(classes));
            }
            for (let xmlVaraiable of sizeXML.getElementsByTagName("variable")) {
                var variable = seven.Variable.fromXML(xmlVaraiable);
                this.variables.put(variable.id, variable);
            }
            for (let sizesXml of sizeXML.getElementsByTagName("size")) {
                var size = seven.Size.fromXML(sizesXml, this, this.variables);
                this.sizes.put(size.id, size);
            }
            return catalog;
        }
    }
    SizeLoader.className = "seven.SizeLoader";
    seven.SizeLoader = SizeLoader;
seven.ClassLoader.manager().loadInstanceAtPriority(seven.SizeLoader.className, 0);
//{INSERTORDER:2}
    class GestureConfiguration extends seven.JBObject {
        constructor() {
            super();
            // this shows how much the user can move the mouse from mouseDown to mouseUp
            // to be valid click
            // it this case it means 10 px
            this.mouseClickRange = new seven.Rect(-5, -5, 10, 10);
            // this shows how much the user can move his finger from touchStart till touchEnd
            // to be valid click
            // it this case it means 20 px
            this.screenClickRange = new seven.Rect(-20, -20, 40, 40);
            // if the next tap happens within this time it gets added to the tapCount
            // ie. tapCount=1 -> next tap within time -> tapCount=2
            // else it will be treated as a new tap(tapCount=1)
            this.tapRetouchTimeout = 300 /* ms*/;
            // if the mouse/touch is held down too long it is no longer a tap
            this.tapMaximumTouchDown = 500;
        }
        getMouseClickRange() {
            return this.mouseClickRange;
        }
        setMouseClickRange(range) {
            this.mouseClickRange = range;
        }
        getScreenClickRange() {
            return this.screenClickRange;
        }
        setScreenClickRange(range) {
            this.screenClickRange = range;
        }
        getTapRetouchTimeout() {
            return this.tapRetouchTimeout;
        }
        getTapMaximumTouchDowm() {
            return this.tapMaximumTouchDown;
        }
    }
    seven.GestureConfiguration = GestureConfiguration;
//{INSERTORDER:3}
/**
 * this class represents a HTMLCanvas
 *  rendering means positing the htmlelement on the screen
 *
 */
    class HtmlCanvasView extends seven.View {
        /**
         *
         * @param canvasId the html-id of the canvas
         */
        constructor(canvasId) {
            super();
            this.canavsRect = seven.Rect.empty();
            this.viewExtentions = new Array();
            this.canvasId = canvasId;
            this.canvas = document.getElementById(canvasId);
            Object.freeze(this.canvas);
            if (this.canvas) {
                if (this.canvas != undefined) {
                    this.context = this.canvas.getContext('2d');
                    Object.freeze(this.context);
                }
                seven.Logger.develepor("canvas already exists for Id : " + this.canvasId);
                return;
            }
            this.backgroundColor = "white"; //ViewUtility.randomColor();
            this.canvas = document.createElement("canvas");
            this.backgroundColor = seven.ViewUtility.randomColor();
            this.canvas.id = canvasId;
            this.canvas.style.position = "fixed";
            this.canvas.style.display = "none";
            document.body.appendChild(this.canvas);
            if (this.canvas != undefined) {
                this.context = this.canvas.getContext('2d');
                Object.freeze(this.context);
            }
        }
        addViewExtention(extention) {
            this.viewExtentions.push(extention);
        }
        setSuperView(view) {
            super.setSuperView(view);
            this.canvas.style.display = "inline";
        }
        draw(orgin) {
            this.canavsRect = seven.Rect.copyRect(this.appliadFrame);
            this.canavsRect.addOrgin(orgin);
            this.canvas.style.left = "" + this.canavsRect.x() + "px";
            this.canvas.style.top = "" + this.canavsRect.y() + "px";
            this.canvas.style.backgroundColor = this.backgroudColor;
            this.canvas.width = this.appliadFrame.width();
            this.canvas.height = this.appliadFrame.height();
            this.context.clearRect(0, 0, this.appliadFrame.width(), this.appliadFrame.height());
            for (let extention of this.viewExtentions) {
                extention.drawOnElement(this.canvas);
            }
            this.canvas.style.zIndex = "" + this.getZIndex();
            this.drawSubViews(new seven.Orgin(0, 0));
        }
        getContext() {
            return this.context;
        }
        remove() {
            super.remove();
            if (this.canvas && this.canvas.parentElement) {
                this.canvas.parentElement.removeChild(this.canvas);
            }
        }
        addScreenOffset() {
            return this.canavsRect.orgin();
        }
    }
    seven.HtmlCanvasView = HtmlCanvasView;
    class TraillingContraint extends seven.JBObject {
        constructor() {
            super(...arguments);
            this.trailing = 0;
        }
        applyContraint(srcView, comparingView) {
            srcView.referenceFrame.setWidth(comparingView.referenceFrame.width() - srcView.referenceFrame.x() - this.trailing);
            srcView.changeReferenceFrame(srcView.referenceFrame);
        }
        init(trailing) {
            this.trailing = trailing;
            return this;
        }
        getClassName() {
            return TraillingContraint.className;
        }
    }
    TraillingContraint.className = "seven.constraint.TraillingContraint";
    seven.TraillingContraint = TraillingContraint;
//{INSERTORDER:3}
/**
 * the view of the JBDocument
 * all windowViews are attached to here
*/
    class DocumentView extends seven.View {
        constructor() {
            super();
        }
        get rect() {
            return this.referenceFrame;
        }
        getZIndex() {
            return 0;
        }
        //@override
        draw() {
            throw new Error("this view cannot be drawn. this should only be used for sizing the subviews");
        }
    }
    seven.DocumentView = DocumentView;
    class Gesture extends seven.JBObject {
        constructor() {
            super();
        }
        setDelegate(delegate) {
            this.delegate = delegate;
        }
        setConfiguration(configuration) {
            this.configuration = configuration;
        }
        getKey() {
            return seven.GestureType.None;
        }
        touchstart(event, touchEvent) {
            this.touchBeganPosition = touchEvent.copy();
        }
        touchmove(event, touchEvent) {
        }
        touchend(event, touchEvent) {
            this.touchEndPosition = touchEvent.copy();
        }
        touchcancel(event, touchEvent) {
        }
        mousedown(event, touchEvent) {
            this.touchBeganPosition = touchEvent.copy();
        }
        mouseup(event, touchEvent) {
            this.touchEndPosition = touchEvent.copy();
        }
        mousemove(event, touchEvent) {
        }
        mouseout(event, touchEvent) {
            this.touchEndPosition = touchEvent.copy();
        }
        endTouchInClickRange(range) {
            if (this.touchBeganPosition == undefined || this.touchEndPosition == undefined) {
                seven.Logger.develeporError("touchPositions not defined");
                return false;
            }
            var orgin = this.touchEndPosition.getOrgin().copy();
            orgin.removeOrgin(this.touchBeganPosition.getOrgin());
            if (orgin.x < range.x() || orgin.x > range.topRight()) {
                return false;
            }
            if (orgin.y < range.y() || orgin.y > range.bottomLeft()) {
                return false;
            }
            return true;
        }
    }
    seven.Gesture = Gesture;
//{INSERTORDER:4}
    class TapGesture extends seven.Gesture {
        constructor() {
            super();
            this.delegateData = new seven.JMBMap();
            this.tapCount = 0;
            this.firstTouchOrgin = seven.Orgin.empty();
            this.setDelegate(seven.JBDocument.document());
        }
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        static loadedInstance() {
            var loadedInstance = seven.ClassLoader.manager().getLoadedInstance(TapGesture.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var clickGesture = new TapGesture();
            seven.TouchManager.manager().tapGesture = clickGesture;
            return clickGesture;
        }
        getClassName() {
            return TapGesture.className;
        }
        setDelegate(delegate) {
            this.delegate = delegate;
        }
        getKey() {
            return seven.GestureType.Tap;
        }
        touchstart(event, touchEvent) {
            super.touchstart(event, touchEvent);
            if (this.firstTouchOrgin.isEmpty() == true) {
                this.firstTouchOrgin = touchEvent.getOrgin().copy();
            }
            this.start();
        }
        touchend(event, touchEvent) {
            super.touchend(event, touchEvent);
            this.end(this.configuration.getScreenClickRange());
        }
        mousedown(event, touchEvent) {
            super.mousedown(event, touchEvent);
            if (this.firstTouchOrgin.isEmpty() == true) {
                this.firstTouchOrgin = touchEvent.getOrgin().copy();
            }
            this.start();
        }
        mouseup(event, touchEvent) {
            super.mouseup(event, touchEvent);
            this.end(this.configuration.getMouseClickRange());
        }
        start() {
            console.log("start");
            clearTimeout(this.nextTouchTimer);
            this.touchDownTimer = setTimeout(() => {
                this.tapCount = 0;
                this.firstTouchOrgin = seven.Orgin.empty();
            }, this.configuration.getTapMaximumTouchDowm());
        }
        end(range) {
            console.log("end");
            clearTimeout(this.nextTouchTimer);
            clearTimeout(this.touchDownTimer);
            this.checkForClick(range);
            this.nextTouchTimer = setTimeout(() => {
                this.sendEvent(true);
                this.tapCount = 0;
                this.firstTouchOrgin = seven.Orgin.empty();
            }, this.configuration.getTapRetouchTimeout());
            return;
        }
        checkForClick(range) {
            var testOrgin = this.firstTouchOrgin.copy().removeOrgin(this.touchEndPosition.getOrgin());
            console.log("checkForClick " + testOrgin.toString() + " rect " + range.toString());
            if (this.endTouchInClickRange(range) == true && range.containsOrgin(testOrgin.toAbsolute()) == true) {
                this.tapCount++;
                this.sendEvent(false);
                console.log("tapped");
            }
            this.touchBeganPosition = undefined;
            //this.touchEndPosition = undefined;
        }
        sendEvent(timmerCalled) {
            if (this.tapCount == 0) {
                console.log("sendEvent : tapCount is 0");
                return;
            }
            if (timmerCalled == true) {
                if (this.tapCount == 1) {
                    this.delegate.clickRecieved(this.touchEndPosition.getOrgin(), this.getDelegateData());
                }
                return;
            }
            this.delegate.tapRecieved(this.touchEndPosition.getOrgin(), this.getDelegateData());
        }
        getDelegateData() {
            this.delegateData.put("tapCount", this.tapCount);
            return this.delegateData;
        }
    }
    TapGesture.className = "seven.TapGesture";
    seven.TapGesture = TapGesture;
seven.ClassLoader.manager().loadInstance(seven.TapGesture.className);
window.onload = function () {
    //classes can register in the global scope and get loaded at this point
    seven.ClassLoader.manager().startLoading();
    seven.On.on().call("prepareDocument");
    seven.On.on().call("prepareDocument-Default");
    seven.JBDocument.document().prepareLoading();
    seven.On.on().call("documentDidPrepare");
    seven.JBDocument.document().load();
    seven.On.on().call("windowDidLoad", seven.JBDocument.document().getWindows()[0]);
    seven.JBDocument.document().startRendering();
};
    (function (GestureType) {
        GestureType[GestureType["None"] = 0] = "None";
        GestureType[GestureType["Click"] = 1] = "Click";
        GestureType[GestureType["Tap"] = 2] = "Tap";
    })(seven.GestureType || (seven.GestureType = {}));
    var GestureType = seven.GestureType;
    (function (Override) {
        Override[Override["TRUE"] = 0] = "TRUE";
        Override[Override["FALSE"] = 1] = "FALSE";
    })(seven.Override || (seven.Override = {}));
    var Override = seven.Override;
//auto-generated
var sizeXMLText = '';
sizeXMLText += '<sizing>';
sizeXMLText += '    <avaliableSizes id="avaliableSizes">';
sizeXMLText += '        <sizeCatalog id="default">';
sizeXMLText += '            <baseClass id="iPadLandscape" width="1000" height ="768" description="iPadLandscape"/>';
sizeXMLText += '            <sizeClass id="iPadPortrait" width="768" height ="1000" description="iPadPortrait"/>';
sizeXMLText += '            <sizeClass id="desktop" width="1300" height="1000" description="Desktop"/>';
sizeXMLText += '        </sizeCatalog>';
sizeXMLText += '    </avaliableSizes>';
sizeXMLText += '    <variables>';
sizeXMLText += '        <variable id="halfWidth">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  value="384"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" value="500"/>';
sizeXMLText += '            <sizeClass id="desktop"       value="650"/>';
sizeXMLText += '        </variable>';
sizeXMLText += '        <variable id="fullWidth">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  value="768"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" value="1000"/>';
sizeXMLText += '            <sizeClass id="desktop"       value="1300"/>';
sizeXMLText += '        </variable>';
sizeXMLText += '        <variable id="quarterWidth">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  value="192"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" value="250"/>';
sizeXMLText += '            <sizeClass id="desktop"       value="325"/>';
sizeXMLText += '        </variable>';
sizeXMLText += '        <variable id="threeQuarterWidth">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  value="576"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" value="750"/>';
sizeXMLText += '            <sizeClass id="desktop"       value="975"/>';
sizeXMLText += '        </variable>';
sizeXMLText += '        <variable id="overlay.blocklist.width">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  value="434"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" value="480"/>';
sizeXMLText += '            <sizeClass id="desktop"       value="640"/>';
sizeXMLText += '        </variable>';
sizeXMLText += '    </variables>';
sizeXMLText += '    <sizes>';
sizeXMLText += '        <!-- main structure !-->';
sizeXMLText += '        <size id="navbar">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="0" width="var:fullWidth" height="60"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="0" width="var:fullWidth" height="60"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="0" width="var:fullWidth" height="40"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <size id="mainContent">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="60" width="var:fullWidth" height="800"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="60" width="var:fullWidth" height="568"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="40" width="var:fullWidth" height="860"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <size id="workingArea">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="860" width="var:fullWidth" height="140"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="628" width="var:fullWidth" height="140"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="900" width="var:fullWidth" height="100"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <!-- main content !-->';
sizeXMLText += '        <size id="mainContent.inner">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="0" width="var:fullWidth" height="800"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="0" width="var:fullWidth" height="568"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="0" width="var:fullWidth" height="860"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <!-- history content !-->';
sizeXMLText += '        <size id="historyElement">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="10" y="10" width="748" height="90"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="20" y="20" width="960" height="70"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="20" y="20" width="1260" height="40"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <!-- blocklist container !-->';
sizeXMLText += '        <size id="blockListContainer">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="10" y="10" width="748" height="200"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="20" y="20" width="960" height="200"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="20" y="20" width="1260" height="130"/>';
sizeXMLText += '        </size>';
sizeXMLText += '         <size id="blockListContainer.min">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="30" width="0" height="100"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="30" width="0" height="100"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="10" width="0" height="100"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <size id="blockListContainer.title">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="0" width="748" height="40"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="0" width="960" height="40"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="0" width="1260" height="25"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <size id="blockListEntry">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="20" width="748" height="70"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="20" width="960" height="70"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="10" width="1260" height="30"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <!-- working area !-->';
sizeXMLText += '        <size id="workingArea.dropArea">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="0" width="var:halfWidth" height="200"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="0" width="var:halfWidth" height="140"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="0" width="var:halfWidth" height="100"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <size id="workingArea.campaign">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="var:halfWidth" y="0" width="var:halfWidth" height="200"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="var:halfWidth" y="0" width="var:halfWidth" height="140"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="var:halfWidth" y="0" width="var:halfWidth" height="100"/>';
sizeXMLText += '        </size>';
sizeXMLText += '         <size id="workingArea.dropArea.entry">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="0" width="100" height="200"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="0" width="70" height="140"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="0" width="70" height="100"/>';
sizeXMLText += '        </size>';
sizeXMLText += '         <size id="workingArea.closeButton">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="7" y="7" width="30" height="30"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="7" y="7" width="30" height="30"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="5" y="5" width="25" height="25"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <!-- overlay !-->';
sizeXMLText += '         <size id="overlay.blocklist">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="320" y="10" width="var:overlay.blocklist.width" height="780"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="var:halfWidth+5" y="10" width="var:overlay.blocklist.width" height="548"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="var:halfWidth+5" y="10" width="var:overlay.blocklist.width" height="840"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <size id="overlay.insertTime">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="var:quarterWidth" y="10" width="var:threeQuarterWidth-20" height="780"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="var:quarterWidth" y="10" width="var:threeQuarterWidth-20" height="548"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="var:quarterWidth" y="10" width="var:threeQuarterWidth-20" height="840"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <!-- overlay.blocklist !-->';
sizeXMLText += '        <size id="overlay.blocklist.title">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="0" width="var:overlay.blocklist.width" height="30"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="0" width="var:overlay.blocklist.width" height="30"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="0" width="var:overlay.blocklist.width" height="30"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <size id="overlay.blocklist.header">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="30" width="var:overlay.blocklist.width" height="30"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="30" width="var:overlay.blocklist.width" height="30"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="30" width="var:overlay.blocklist.width" height="25"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <size id="overlay.blocklist.table">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="60" width="var:overlay.blocklist.width" height="720"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="60" width="var:overlay.blocklist.width" height="488"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="55" width="var:overlay.blocklist.width" height="785"/>';
sizeXMLText += '        </size>';
sizeXMLText += '         <size id="overlay.blocklist.closeButton">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="var:overlay.blocklist.width-30" y="0" width="30" height="30"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="var:overlay.blocklist.width-30" y="0" width="30" height="30"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="var:overlay.blocklist.width-30" y="2" width="25" height="25"/>';
sizeXMLText += '        </size>';
sizeXMLText += '         <size id="overlay.blocklist.errorMessage">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="680" width="var:overlay.blocklist.width" height="100"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="448" width="var:overlay.blocklist.width" height="100"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="740" width="var:overlay.blocklist.width" height="100"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <size id="overlay.blocklist.entry">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="0" width="var:overlay.blocklist.width" height="50"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="0" width="var:overlay.blocklist.width" height="50"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="0" width="var:overlay.blocklist.width" height="30"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <!-- overlay.insertTime !-->';
sizeXMLText += '         <size id="overlay.insertTime.header">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="0" width="100%" height="80"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="0" width="100%" height="80"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="0" width="100%" height="80"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <size id="overlay.insertTime.graph">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="80" width="100%" height="640"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="80" width="100%" height="408"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="80" width="100%" height="720"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <size id="overlay.insertTime.touchBar">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="720" width="100%" height="80"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="468" width="100%" height="80"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="760" width="100%" height="80"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <size id="overlay.insertTime.table">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="0" width="200" height="800"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="0" width="200" height="800"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="0" width="200" height="800"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        ';
sizeXMLText += '        <!-- overlay.small !-->';
sizeXMLText += '        <size id="overlay.insertTime.small">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="10" y="10" width="300" height="330"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="70" y="10" width="350" height="230"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="250" y="20" width="350" height="360"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <size id="overlay.workState.small">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="10" y="350" width="300" height="330"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="70" y="250" width="350" height="230"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="250" y="460" width="350" height="360"/>';
sizeXMLText += '        </size>';
sizeXMLText += '       ';
sizeXMLText += '         <!-- overlay.insertTime.small !-->';
sizeXMLText += '        <size id="overlay.insertTime.small.header">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="0" width="100%" height="40"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="0" width="100%" height="30"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="0" width="100%" height="30"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <size id="overlay.insertTime.small.graph">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="40" width="100%" height="260"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="30" width="100%" height="170"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="30" width="100%" height="300"/>';
sizeXMLText += '        </size>';
sizeXMLText += '        <size id="overlay.insertTime.small.touchBar">';
sizeXMLText += '            <sizeClass id="iPadPortrait"  x="0" y="290" width="100%" height="30"/>';
sizeXMLText += '            <sizeClass id="iPadLandscape" x="0" y="200" width="100%" height="30"/>';
sizeXMLText += '            <sizeClass id="desktop"       x="0" y="330" width="100%" height="30"/>';
sizeXMLText += '        </size>';
sizeXMLText += '    </sizes>';
sizeXMLText += '</sizing>';
var parser = new DOMParser();
var sizeXML = parser.parseFromString(sizeXMLText, "text/xml");
    (function (StoringType) {
        StoringType[StoringType["LOCAL"] = 0] = "LOCAL";
        StoringType[StoringType["REMOTE"] = 1] = "REMOTE";
        StoringType[StoringType["ALL"] = 2] = "ALL";
    })(seven.StoringType || (seven.StoringType = {}));
    var StoringType = seven.StoringType;
    function stringToBool(s) {
        if (s == undefined) {
            return false;
        }
        if (typeof s == "boolean") {
            return s;
        }
        var lower = s.toLocaleLowerCase().trim();
        if (lower == "true") {
            return true;
        }
        return false;
    }
    seven.stringToBool = stringToBool;
    (function (TextAlign) {
        TextAlign[TextAlign["LEFT"] = 0] = "LEFT";
        TextAlign[TextAlign["CENTER"] = 1] = "CENTER";
        TextAlign[TextAlign["RIGHT"] = 2] = "RIGHT";
    })(seven.TextAlign || (seven.TextAlign = {}));
    var TextAlign = seven.TextAlign;
    (function (UserDefaultKey) {
        UserDefaultKey[UserDefaultKey["PVS_BLO9_ENTRIES"] = 0] = "PVS_BLO9_ENTRIES";
        UserDefaultKey[UserDefaultKey["PVS_BLO8_ENTRIES"] = 1] = "PVS_BLO8_ENTRIES";
        UserDefaultKey[UserDefaultKey["PVS_BLO7_ENTRIES"] = 2] = "PVS_BLO7_ENTRIES";
        UserDefaultKey[UserDefaultKey["PVS_BLO6_ENTRIES"] = 3] = "PVS_BLO6_ENTRIES";
        UserDefaultKey[UserDefaultKey["PVS_BLO5_ENTRIES"] = 4] = "PVS_BLO5_ENTRIES";
        UserDefaultKey[UserDefaultKey["PVS_BLO4_ENTRIES"] = 5] = "PVS_BLO4_ENTRIES";
        UserDefaultKey[UserDefaultKey["PVS_BLO3_ENTRIES"] = 6] = "PVS_BLO3_ENTRIES";
        UserDefaultKey[UserDefaultKey["PVS_BLO2_ENTRIES"] = 7] = "PVS_BLO2_ENTRIES";
        UserDefaultKey[UserDefaultKey["PVS_AF1_ENTRIES"] = 8] = "PVS_AF1_ENTRIES";
        UserDefaultKey[UserDefaultKey["PVS_BLO13_ENTRIES"] = 9] = "PVS_BLO13_ENTRIES";
        UserDefaultKey[UserDefaultKey["dist_history_BlockMoveHistory_entries"] = 10] = "dist_history_BlockMoveHistory_entries";
    })(seven.UserDefaultKey || (seven.UserDefaultKey = {}));
    var UserDefaultKey = seven.UserDefaultKey;
})(seven || (seven = {}));