//{INSERTORDER:3}
namespace seven {


    export interface ITouchEvent {
        //orgin
        //diffrents
        //isdragging
        setOrgin(orgin: Orgin);
        getOrgin(): Orgin;

       // setTouchConfiguration(configuration: TouchSenderConfiguration);
      //  getTouchConfiguration(): TouchSenderConfiguration;

        setDifference(difference: Orgin);
        getDifference(): Orgin;


        setDifferenceFromStart(differenceFromStart: Orgin);
        getDifferenceFromStart(): Orgin;

        isDragging(): boolean;
        setDragging(dragging: boolean);
        copy():ITouchEvent;

     //   setElementId(elementId: string);
     //   getElementId(): string;
    }
}