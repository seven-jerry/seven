
namespace seven {
    export class SizeFrame {
    private id: string;
    private frame: Rect;

    public static fromXML(xml: Element, sizeLoader: ISizeLoader, variables: JMBMap<string, Variable>, superId: string): SizeFrame {
        var id = Objects.requireNonNull("SizeFrame.fromXML : id was not defined", xml.attributes.getNamedItem("id").value);
        var xmlX = Objects.requireNonNull("SizeFrame.fromXML : x was not defined", xml.attributes.getNamedItem("x").value);

        var superSizeCLass = sizeLoader.getSizeForKey(superId.substring(0, superId.lastIndexOf(".")));
        var superCLassId = "";
        var rect = Rect.empty();
        if (superSizeCLass != undefined) {
            superCLassId = superSizeCLass.id;
            rect = superSizeCLass.getFrameFromId(id);
        }


        var x = SizeFrame.getNumber(id, xmlX, rect.x(), superId, variables);

        var xmlY = Objects.requireNonNull("SizeFrame.fromXML : y was not defined", xml.attributes.getNamedItem("y").value);
        var y = SizeFrame.getNumber(id, xmlY, rect.y(), superId, variables);

        var xmlWidth = Objects.requireNonNull("SizeFrame.fromXML : width was not defined", xml.attributes.getNamedItem("width").value);
        var width = SizeFrame.getNumber(id, xmlWidth, rect.width(), superId, variables);

        var xmlHeight = Objects.requireNonNull("SizeFrame.fromXML : height was not defined", xml.attributes.getNamedItem("height").value);
        var height = SizeFrame.getNumber(id, xmlHeight, rect.height(), superId, variables);

        return new SizeFrame(id, x, y, width, height);
    }

    private static getNumber(id: string, object: any, maxNumber: number, superClassId: string, variables: JMBMap<string, Variable>): number {

        if (typeof object == "number") {
            return object;
        }

        if (object.indexOf("%") != -1) {
            var percentValue = Objects.requireNumber("SizeFrame::getNumber : number is not a percentvalue", object.substring(0, object.indexOf("%")));
            var testString = object.substring(0, object.indexOf("%") + 1);
            if (maxNumber == 0) {
                throw new Error("SizeFrame.getNumber : <" + superClassId + "> if you use precent values you have to define a super size to reference to. in your case it would be <" + superClassId.substring(0, superClassId.lastIndexOf(".")) + "> ");
            }
            object = object.replace(testString, "" + (maxNumber * 100 / percentValue));
        }

        if (typeof object == "string" && object.indexOf("var") != 0) {
            object = parseInt(object);
            if (object != NaN) {
                return object;
            }
        }


        if (typeof object == "string" && object.indexOf("var") == 0) {
            var testFroVar = object.trim().replace("var:", "");

            var resultObj = SizeFrame.extractOperation(testFroVar);
            testFroVar = resultObj.source;


            if (variables.containsKey(testFroVar) == true) {
                var variable: Variable = variables.get(testFroVar);
                var varValue = variable.getProperty(id);
                return SizeFrame.applyOperation(varValue, resultObj.operation, resultObj.value);
            }
        }
        throw new Error("SizeFrame.fromXML : <" + object + "> could not be converted to number");
    }

    private static extractOperation(sourceString: string): { source: string, operation: string, value: number } {
        var operationIndex = 0;
        var operationFound = undefined;
        var operationValue = 0;
        var operations = ["+", "-", "*", "/"];
        while (operationFound == undefined && operationIndex < operations.length) {
            var testOperation = operations[operationIndex];
            operationIndex++;
            if (sourceString.indexOf(testOperation) != -1) {
                operationFound = testOperation;
            }
        }

        if (operationFound != undefined) {
            var operation = sourceString.substring(sourceString.indexOf(operationFound) + 1);
            if (parseInt(operation) != NaN) {
                operationValue = parseInt(operation);
            }
            sourceString = sourceString.substring(0, sourceString.indexOf(operationFound)).trim();
        }

        return { "source": sourceString, "operation": operationFound, "value": operationValue };
    }
    private static applyOperation(source: number, operation: string, value: number): number {
        if (operation == "+") {
            return source + value;
        }
        if (operation == "-") {
            return source - value;
        }
        if (operation == "*") {
            return source * value;
        }
        if (operation == "/") {
            return source / value;
        }
        return source;
    }
    constructor(id: string, x: number, y: number, width: number, height: number) {
        this.id = id;
        this.frame = new Rect(x, y, width, height);
    }

    getId(): string {
        return this.id;
    }

    getFrame(): Rect {
        return this.frame;
    }
}
}