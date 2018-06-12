//{INSERTORDER:2}
namespace seven {
  export abstract class AbstractViewController extends JBObject {

  view: View;
  childViewController: Array<AbstractViewController> = new Array();
  parentViewController: AbstractViewController = undefined;
  constructor() {
    super();
  }
  addChildViewController(viewController: AbstractViewController): void {
    viewController.setParentViewController(this);
    this.childViewController.push(viewController);
  }
  setParentViewController(viewController: AbstractViewController): void {
    this.parentViewController = viewController;
  }


  setView(view: View) {
    this.view = view;
  }

  dragStart(orgin: Orgin, view: View): View {
    return view;
  }

  dragHasMoved(orgin: Orgin, view: View): void {
    if (this.parentViewController != undefined) {
      this.parentViewController.dragHasMoved(orgin, view);
    }
  }

  dragHasEnded(orgin: Orgin, view: View): boolean {
    if (this.parentViewController != undefined) {
      return this.parentViewController.dragHasEnded(orgin, view);
    }
    return false;
  }
  dragHasLeft(): void {
    if (this.parentViewController != undefined) {
      this.parentViewController.dragHasLeft();
    }
  }
}
}