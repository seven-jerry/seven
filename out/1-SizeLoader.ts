//{INSERTORDER:2}


namespace seven {
    export class SizeLoader extends JBObject implements ISizeLoader {

    resizeManager: IResizeManager;
    activeSizeCatalog: ISizeCatalog;
    sizes: JMBMap<string, Size> = new JMBMap<string, Size>();
    variables: JMBMap<string, Variable> = new JMBMap<string, Variable>();
    public static className: string = "seven.SizeLoader";

    /**
        * This gives the instance, which was loaded by the Classloader
        * You can use this to access this instance afterwoulds-or don't, you decide
    */
    public static loadedInstance(): SizeLoader {
        var loadedInstance = ClassLoader.manager().getLoadedInstance(SizeLoader.className);
        if (loadedInstance != undefined) {
            return loadedInstance;
        }
        var sizeLoader = new SizeLoader();
        sizeLoader.activeSizeCatalog = sizeLoader.getXMLSizeCatalog();
        JBDocument.document().setSizeLoader(sizeLoader);
        return sizeLoader;
    }
    constructor() {
        super()
    }

    public getClassName(): string {
        return SizeLoader.className;
    }



    initWithOptions(options: SizeLoadOption) {
        this.activeSizeCatalog = this.getXMLSizeCatalog();
    }

    getSizeForKey(key: string): Size {
        if (this.sizes.containsKey(key) == true) {
            return this.sizes.get(key);
        }
        return undefined;
    }
    getSizeRectForKey(key: string): Rect {
        var frame = undefined;

        if (this.sizes.containsKey(key) == true) {
            return this.sizes.get(key).getFrameForClass(this.getSizeClass()).copy();
        }
        Logger.develeporError("SizeLoader : getSizeRectForKey : no size for key key <" + key + ">");
        return Rect.empty();
    }



    getSizeClass(): ISizeClass {
        return this.activeSizeCatalog.getSizeClass();
    }
    changeSizeClass(width: number, height: number): void {
        this.activeSizeCatalog.changeForSize(width, height);
    }
    getBaseClass(): ISizeClass {
        return this.activeSizeCatalog.getBaseClass();
    }


    private getXMLSizeCatalog(key: string = "default"): SizeCatalog {

        var catalogXML = sizeXML.getElementById(key);
        if (catalogXML == undefined || catalogXML == null) {
            throw new Error("catalog for key <" + key + "> was not defined.");
        }
        var catalog = new SizeCatalog(key);

        var baseClassXML = catalogXML.getElementsByTagName("baseClass")[0];
        if (baseClassXML == undefined || baseClassXML == null) {
            throw new Error("no baseClass in catalog <" + key + ">.");
        }
        catalog.setBaseClass(SizeClass.fromXML(baseClassXML));
        for (let classes of catalogXML.getElementsByTagName("sizeClass")) {
            catalog.addSizeClasses(SizeClass.fromXML(classes));
        }

        for (let xmlVaraiable of sizeXML.getElementsByTagName("variable")) {
            var variable = Variable.fromXML(xmlVaraiable);
            this.variables.put(variable.id, variable);
        }

        for (let sizesXml of sizeXML.getElementsByTagName("size")) {
            var size = Size.fromXML(sizesXml, this, this.variables);
            this.sizes.put(size.id, size);
        }

        return catalog;
    }

}
}
seven.ClassLoader.manager().loadInstanceAtPriority(seven.SizeLoader.className,0);



