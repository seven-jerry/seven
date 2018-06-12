//{INSERTORDER:1}
namespace seven {
    export abstract class AbstractMap<K, V> implements IMap<K, V>, FinalJMBMap<K, V>{
        containerObject: Object;

        constructor() {
            this.containerObject = new Object();
        }
        containsKey(key: K): boolean {
            return this.containerObject.hasOwnProperty("" + key);
        }

        containsValue(value: V): boolean {
            for (var k in this.containerObject) {
                if (this.containerObject[k] == value) {
                    return true;
                }
            }
            return false;
        }

        get(object: K): V {
            if (this.containsKey(object) == true) {
                return this.containerObject["" + object];
            }
        }

        isEmpty(): boolean {
            for (var k in this.containerObject) {
                return false;
            }
            return true;
        }
        put(key: K, value: V): V {
            this.containerObject["" + key] = value;
            return this.containerObject["" + key];
        }
        remove(key: K): void {
            delete this.containerObject["" + key];
        }
        size(): number {
            var counter: number = 0;
            for (var k in this.containerObject) {
                counter++;
            }
            return counter;
        }
        values(): V[] {
            var values = new Array<V>();
            for (var key in this.containerObject) {
                values.push(this.containerObject[key]);
            }
            return values;
        }
        keys(): K[] {

            return <any>Object.keys(this.containerObject);
        }
    }

    export interface FinalJMBMap<K, V> extends IMap<K, V> {
        containsKey(key: K): boolean;
        containsValue(value: V): boolean;
        get(object: K): V;
        isEmpty(): boolean;
        size(): number;
        values(): Array<V>;
    }
}