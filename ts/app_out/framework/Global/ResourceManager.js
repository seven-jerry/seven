var seven;
(function (seven) {
    class ResourceManager extends seven.JBObject {
        constructor() {
            super();
            this.images = new seven.JMBMap();
            this.callbacks = new seven.JMBMap();
            this.loadImage = undefined;
        }
        static manager() {
            if (ResourceManager._instance == undefined) {
                ResourceManager._instance = new ResourceManager();
            }
            return ResourceManager._instance;
        }
        imageForSrc(src, callback) {
            if (src == undefined) {
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
        loadNextImage() {
            if (this.callbacks.keys().length == 0) {
                return;
            }
            var imageSrc = this.callbacks.keys()[0];
            this.loadImage = new Image();
            this.loadImage.src = imageSrc;
            this.loadImage.onload = (ev) => {
                this.imageLoaded();
            };
        }
        imageLoaded() {
            if (this.callbacks.keys().length == 0) {
                return;
            }
            var imageSrc = this.callbacks.keys()[0];
            var callback = this.callbacks.get(imageSrc);
            this.callbacks.remove(imageSrc);
            var imageClone = this.loadImage.cloneNode(true);
            imageClone.onload = undefined;
            this.images.put(imageSrc, imageClone);
            callback.call(imageClone);
            if (this.callbacks.keys().length > 0) {
                this.loadNextImage();
                return;
            }
            this.loadImage = undefined;
        }
    }
    seven.ResourceManager = ResourceManager;
})(seven || (seven = {}));
