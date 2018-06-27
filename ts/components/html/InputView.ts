//{INSERTORDER:4}
namespace components.html {
    export class InputView extends seven.HtmlElementView {
        element: HTMLInputElement;

        setText(text: string) {
            throw new Error("Method not implemented.");
        }
        getText(): string {
            throw new Error("Method not implemented.");
        }

        constructor(elementId: string) {
            super(elementId);
            this.element.type = "text";
        }

        protected getType():string{
            return "input";
        }



    }
}