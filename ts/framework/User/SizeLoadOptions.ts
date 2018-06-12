namespace seven {
    export
        class SizeLoadOption {
        isMobileDevice(): boolean {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true;
            }
            return false;
        }
        isDesktop(): boolean {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return false;
            }
            return true;
        }
    }
}