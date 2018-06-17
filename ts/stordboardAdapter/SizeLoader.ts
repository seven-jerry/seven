namespace storyboard {
    export class SizeLoader implements seven.ISizeLoader {
        public static classname: string = "storyboard.SizeLoader";

        sizeCatalog: seven.SizeCatalog;
        deviceSize: DeviceSize = new DeviceSize();
        constructor() {

        }

        initWithDevice(device: Device) {
            this.sizeCatalog = this.deviceSize.getSize(device);
        }

        initWithOptions(options: seven.SizeLoadOption) {

        }

        getBaseClass(): seven.ISizeClass {
            return this.sizeCatalog.getBaseClass();
        }

        changeSizeClass(width: number, height: number): void {
            this.sizeCatalog.changeForSize(width, height);
        }

        getSizeClass(): seven.ISizeClass {
            return this.sizeCatalog.getSizeClass();
        }



        getClassName(): string {
            return SizeLoader.classname;
        }

        toString(): string {
            return "<storyboard.SizeLoader>";
        }

        getSizeRectForKey(key: string): seven.Rect {
            throw new Error("Method not implemented.");
        }

        getSizeForKey(key: string): seven.Size {
            throw new Error("Method not implemented.");
        }


    }

    export class DeviceSize {
        ipad9_7: seven.SizeCatalog;

        constructor() {
            this.ipad9_7 = new seven.SizeCatalog("ipad9_7");
            this.ipad9_7.addSizeClasses([
                new seven.SizeClass("portrait", 768, 1024, ""),
                new seven.SizeClass("landscape", 1024, 768, "")
            ]);
        }
        public getSize(device: Device): seven.SizeCatalog {
            if (device.id == "ipad9_7") {
                this.ipad9_7.setBaseClassById(device.orientation);
                return this.ipad9_7;
            }
            throw new Error("no size for device : " + device.id);
        }
    }
}