var seven;
(function (seven) {
    function stringToBool(s) {
        if (s == undefined) {
            return false;
        }
        if (typeof s == "boolean") {
            return s;
        }
        var lower = s.toLocaleLowerCase().trim();
        if (lower == "true") {
            return true;
        }
        return false;
    }
    seven.stringToBool = stringToBool;
})(seven || (seven = {}));
