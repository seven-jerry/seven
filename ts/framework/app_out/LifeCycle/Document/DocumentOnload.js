var seven;
(function (seven) {
    function boot() {
        //classes can register in the global scope and get loaded at this point
        seven.ClassLoader.manager().startLoading();
        seven.On.on().call("prepareDocument");
        seven.On.on().call("prepareDocument-Default");
        seven.JBDocument.document().prepareLoading();
        seven.On.on().call("documentDidPrepare");
        seven.JBDocument.document().load();
        seven.On.on().call("documentInitSize");
        seven.On.on().call("windowDidLoad", seven.JBDocument.document().getWindows()[0]);
        seven.JBDocument.document().startRendering();
    }
    seven.boot = boot;
})(seven || (seven = {}));
