var storyboard;
(function (storyboard) {
    function toBoolean(input) {
        if (input.toLowerCase() == "yes") {
            return true;
        }
        return false;
    }
    storyboard.toBoolean = toBoolean;
})(storyboard || (storyboard = {}));
