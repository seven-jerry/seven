namespace seven {
    export interface IDocumentDelegateSetter  extends IJBObject{
    getSizeLoader():ISizeLoader;
    setResizeManager(resizeManager: IResizeManager);
    setSizeLoader(sizeLoader: ISizeLoader);
}
 export interface IDocumentDelegateLifeCycle extends IJBObject{
    load(document: JBDocument);
    prepareLoading():void;
    documentDidLoad();
    getResizeManager():IResizeManager;
}
export interface IDocumentDelegate extends IDocumentDelegateLifeCycle,IDocumentDelegateSetter{
    reloadWindows();
}
}