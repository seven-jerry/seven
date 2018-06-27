var storyboard;
(function (storyboard) {
    function main(args) {
        var fileLoader = new storyboard.FileLoader();
        fileLoader.document = storyboard.storyboardXml;
        fileLoader.load();
        var sizeLoader = new storyboard.SizeLoader();
        sizeLoader.initWithDevice(storyboard.SevenAdapter.shared().storyboardAdapter.document.device);
        seven.JBDocument.document().setWindowLoader(new storyboard.WindowLoader());
        seven.boot();
    }
    storyboard.main = main;
})(storyboard || (storyboard = {}));
window.onload = function () {
    storyboard.main([]);
};
