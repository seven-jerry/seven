//{INSERTORDER:2}

namespace seven {
    export class JMBMap<K,V> extends AbstractMap<K,V> {
    constructor(){
        super()
    }
    containsKey(key: K): boolean {
        return super.containsKey(key);
    }

    containsValue(value: V): boolean {
        return super.containsValue(value);
    }

    get(object: K): V {
       return super.get(object); 
    }

    isEmpty(): boolean {
      return super.isEmpty();
    }
    put(key: K, value: V): V {
       return super.put(key,value);
    }
    remove(key: K): void {
      return super.remove(key);
    }
    size(): number {
        return super.size();
    }
    values(): V[] {
       return super.values();
    }
    keys():K[]{
        return super.keys();
    }
}
}