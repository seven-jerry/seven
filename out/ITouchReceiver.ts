namespace seven {
   export  interface ITouchReceiver {
        touchBegan(touchEvent: ITouchEvent);
        touchMoved(touchEvent: ITouchEvent);
        touchEnded(touchEvent: ITouchEvent);
        touchCanceled(touchEvent: ITouchEvent);
    }
}