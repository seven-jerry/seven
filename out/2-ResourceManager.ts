namespace seven {
    export class ResourceManager extends JBObject {
        private images: JMBMap<string, HTMLImageElement> = new JMBMap<string, HTMLImageElement>();
        private callbacks: JMBMap<string, ImageLoadedCallback> = new JMBMap<string, ImageLoadedCallback>();
        private loadImage: HTMLImageElement = undefined;
        private static _instance;
        public static manager(): ResourceManager {
            if (ResourceManager._instance == undefined) {
                ResourceManager._instance = new ResourceManager();
            }
            return ResourceManager._instance;
        }
        constructor() {
            super();
        }

        imageForSrc(src: string, callback: ImageLoadedCallback): HTMLImageElement {
            if(src == undefined){
                return;
            }
            
            if (this.images.containsKey(src) == true) {
                return this.images.get(src);
            }
            this.callbacks.put(src, callback);
            if (this.loadImage != undefined) {
                return;
            }
            this.loadNextImage();
        }

        loadNextImage(): void {
            if (this.callbacks.keys().length == 0) {
                return;
            }
            var imageSrc = this.callbacks.keys()[0];
            this.loadImage = new Image();
            this.loadImage.src = imageSrc;

            this.loadImage.onload = (ev: Event) => {
                this.imageLoaded();
            }
        }
        imageLoaded(): void {
            if (this.callbacks.keys().length == 0) {
                return;
            }
            var imageSrc = this.callbacks.keys()[0];
            var callback = this.callbacks.get(imageSrc);
            this.callbacks.remove(imageSrc);
            var imageClone = <HTMLImageElement>this.loadImage.cloneNode(true);
            imageClone.onload = undefined;

            this.images.put(imageSrc,imageClone);
            callback.call(imageClone);

            if(this.callbacks.keys().length > 0){
                this.loadNextImage();
                return;
            }
            this.loadImage = undefined;
        }

    }
}