namespace storyboard{
    export class Variation {
        key:string;
        mask:Mask;
    }
    export class Mask{
        key:string;
        include:Include;
    }
    export class Include{
        reference:string;
    }
}
