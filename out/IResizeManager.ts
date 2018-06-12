
namespace seven {
    export interface IResizeManager {
    setup(document: JBDocument);
    resize();

    startResizing();
    verticalScreenValue(value: number, useBaseClass: boolean): number;
    horizontalScreenValue(value: number, useBaseClass: boolean): number;
    verticalReferenceValue(value: number, useBaseClass: boolean): number;
    horizontalReferenceValue(value: number, useBaseClass: boolean): number;
    hasSizeClass(): boolean;
}
}