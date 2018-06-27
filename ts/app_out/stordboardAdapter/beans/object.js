var storyboard;
(function (storyboard) {
    class Object extends seven.JBObject {
        constructor(id, scene) {
            super();
            this.id = id;
            this.scene = this.scene;
        }
        static unmodifiable(id, scene) {
            return new UnmodifiableObject(id, scene);
        }
    }
    storyboard.Object = Object;
    class UnmodifiableObject extends Object {
        constructor(id, scene) {
            super(id), scene;
        }
    }
})(storyboard || (storyboard = {}));
