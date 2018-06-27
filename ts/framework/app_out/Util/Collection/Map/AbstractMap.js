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
})(seven || (seven = {}));
