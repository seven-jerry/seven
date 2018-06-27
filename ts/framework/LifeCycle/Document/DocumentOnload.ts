namespace seven {
        export function boot() {
                //classes can register in the global scope and get loaded at this point
                ClassLoader.manager().startLoading();
                On.on().call("prepareDocument");
                On.on().call("prepareDocument-Default");
                JBDocument.document().prepareLoading();
                On.on().call("documentDidPrepare");
                JBDocument.document().load();
                On.on().call("documentInitSize");
                On.on().call("windowDidLoad", JBDocument.document().getWindows()[0]);
                JBDocument.document().startRendering();
        }
}

