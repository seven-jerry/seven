namespace storyboard {

    export function main(args: Array<string>) {
        var fileLoader = new FileLoader();
        fileLoader.document = storyboardXml;
        fileLoader.load();
        var sizeLoader = new SizeLoader();
        sizeLoader.initWithDevice(SevenAdapter.shared().storyboardAdapter.document.device);
        seven.JBDocument.document().setWindowLoader(new WindowLoader());
        seven.boot();
    }
}



window.onload = function () {
    storyboard.main([]);
}