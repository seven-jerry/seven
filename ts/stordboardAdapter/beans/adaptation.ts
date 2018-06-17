namespace storyboard{
    export class Adaptation {
        id:string;

        public static fromXML(xml: Element): Adaptation {
            var adaptation = new Adaptation();
            adaptation.id = xml.getAttribute("id");
            return adaptation;
        }
    }
}