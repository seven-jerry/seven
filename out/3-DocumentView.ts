//{INSERTORDER:3}
/** 
 * the view of the JBDocument
 * all windowViews are attached to here
*/
namespace seven {
    export class DocumentView extends View{

    constructor(){
        super()
    }
    get rect(){
        return this.referenceFrame;
    }
    getZIndex(){
        return 0;
    }
   //@override
    draw(){
        throw new Error("this view cannot be drawn. this should only be used for sizing the subviews");
    }
}
}