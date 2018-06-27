//{INSERTORDER:2}
var seven;
(function (seven) {
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
})(seven || (seven = {}));
