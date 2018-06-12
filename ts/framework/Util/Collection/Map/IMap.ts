namespace seven {
    export interface IMap<K, V> {
    containsKey(key: K): boolean;
    containsValue(value: V): boolean;
    get(object: K): V;
    isEmpty(): boolean;
    put(key: K, value: V):V;
    remove(key:K):void;
    size():number;
    values():Array<V>;
}
}