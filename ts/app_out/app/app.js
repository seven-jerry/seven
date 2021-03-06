seven.onWindowLoad((window) => {
    loadUmlObjects(window);
});
function loadUmlObjects(window) {
    var i = 0;
    var width = window.view.referenceFrame.width() / 10;
    while (i < 10) {
        var view = new seven.CanvasView().initWithReferenceFrame(new seven.Rect(width * i + 10, 20, width, 100));
        i++;
        window.view.addSubview(view);
    }
}
