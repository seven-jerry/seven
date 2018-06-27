var seven;
(function (seven) {
    class SizeLoadOption {
        getClassName() { return seven.SizeLoadOption.classname; }
        ///AutoGeneratedClassName-end - do not eidt this line
        isMobileDevice() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true;
            }
            return false;
        }
        isDesktop() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return false;
            }
            return true;
        }
    }
    //AutoGeneratedClassName-start - do not eidt this line
    SizeLoadOption.classname = "seven.SizeLoadOption ";
    seven.SizeLoadOption = SizeLoadOption;
})(seven || (seven = {}));
