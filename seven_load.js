seven.on("prepareDocument-Default",()=>{
    new seven.DefaultWindowLoader().loadIfDefault()}
);
seven.on("prepareDocument-Default",()=>{
    new seven.DefaultRenderer().loadIfDefault()}
);
seven.ClassLoader.manager().after(seven.TouchManager.classname, seven.ScreenSender.classname);
seven.ClassLoader.manager().after(seven.TouchManager.classname, seven.MouseSender.classname);
seven.ClassLoader.manager().after(seven.TouchManager.classname,seven.KeyboardSender.classname);