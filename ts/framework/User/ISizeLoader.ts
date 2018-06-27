namespace seven {
    export interface ISizeLoader extends ISizeClassResizer, ISizeProvider {

    }

    interface ISizeClassResizer extends seven.IJBObject {
        getBaseClass(): seven.ISizeClass;
        changeSizeClass(width: number, height: number): void;
        getSizeClass(): seven.ISizeClass;
        initWithOptions(options: seven.SizeLoadOption);
    }
    interface ISizeProvider extends seven.IJBObject {
        getSizeRectForKey(key: string): seven.Rect;
       // getSizeForKey(key: string): seven.Size;
    }
}