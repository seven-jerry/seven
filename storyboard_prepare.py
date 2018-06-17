import os
import sys
import time
import subprocess
import shutil

allFiles = list()
allClasses = list()
loadClasses = list()
loadIndex = 1
loadClasses.append(list())
loadClasses.append(list())
bypassLoad = list()

class Class(object):
    classname=""
    extendname=""
    path=""
    def __init__(self,cname,ename,p):
        if "<" in cname:
            index = cname.index("<")
            self.classname = cname[:index].strip()
        else:
            self.classname = cname.strip()

        if "<" in ename:
            index = ename.index("<")
            self.extendname = ename[:index].strip()
        else:
            self.extendname = ename.strip()

        self.path = p



class StringBuffer:
    baseString = ""
    currentPos = 0

    def setBaseString(self, string):
        self.baseString = string

    def setPosFromSubString(self, string):
        try:
            self.currentPos = self.baseString.index(string) + len(string)

        except ValueError:
            print string + " not found in base-string : " + self.baseString
            raise ValueError()

    def readTillChar(self, expectedChar, toofarChar):
        substring = self.baseString[self.currentPos:]
        resultString = ""
        for char in substring:
            if char == expectedChar:
                break
            if char == toofarChar:
                print substring + " : went too far. tried to find " + expectedChar + " but found " + toofarChar
                resultString = ""
                break
            resultString = resultString + char
        return resultString



def hasLastPathComponent(path,component):
    if component not in path:
        return False
    componentPos = path.rindex(component)
    componentlength = len(component)
    if componentPos + componentlength is len(path):
        return True
    return False

def findFiles(dir,type,array):
    for fname in os.listdir(dir):
        path = os.path.join(dir, fname)
        if os.path.isdir(path):
            findFiles(path,type,array)

        if  hasLastPathComponent(path,type):
            array.append(path)
        elif os.path.isdir(path) is False and type in path :
           array.append(path)

def getClassExtend(files,classes):
    global loadClasses
    global bypassLoad
    for file in files:
        hasEntry = False

        with open(file, 'r') as f:
            lines = f.readlines()
            for  line in lines:
                if "ScrollTouchInterpreter" in line:
                    print line
                if "@class" in line or "{" not in line:
                    continue
                if "class " in line and "extends" in line and "{" in line:
                    buffer = StringBuffer()
                    buffer.setBaseString(line)
                    buffer.setPosFromSubString("class ")
                    className = buffer.readTillChar(" ", "{")
                    buffer.setPosFromSubString("extends ")
                    if "implements" in line:
                        extendsName = buffer.readTillChar(" ", "{")
                    else:
                        extendsName = buffer.readTillChar("{", "(")

                    classes.append(Class(className,extendsName,file))
                    hasEntry = True
                    break
                elif "class " in line and "{" in line:
                    buffer = StringBuffer()
                    buffer.setBaseString(line)
                    buffer.setPosFromSubString("class ")

                    if "implements" in line:
                        classname = buffer.readTillChar(" ", "{")
                    else:
                        classname = buffer.readTillChar("{", "(")

                    loadClasses[0].append(Class(classname,"",file))
                    hasEntry = True
                    break
        if hasEntry is False:
            bypassLoad.append(file)
    return classes

def getClassNames(array):
    classnames = list()
    for clazz in array:
        classnames.append(clazz.classname)

    return classnames

def addClasses(classes):
    global loadClasses
    global loadIndex

    classnames = getClassNames(loadClasses[loadIndex-1])

    appendClassName = list()

    while len(classes) > 0 :
        if loadIndex > 30:
            print "---------------------error---------------------------"
            for clazz in classes:
                print clazz.classname
            return
        for clazz in classes:
            if "ScrollTouchInterpreter" in clazz.classname:
                print clazz.classname
            if clazz.extendname in classnames:
                loadClasses[loadIndex].append(clazz)
                classes.remove(clazz)
                appendClassName.append(clazz.classname)
        if len(classes) > 0:
            classnames.extend(appendClassName)
            loadIndex = loadIndex + 1
            loadClasses.append(list())


def writeToDir():
    global loadClasses
    outdir = "storyboard_out"
    index = 0


    for classLists in loadClasses:
        writedir = outdir + "/"
        for clazz in classLists:
            path = clazz.path[2:]
            id = path.rfind("/")
            with open(writedir + str(index)+"-"+path[id+1:], 'w'): pass
            shutil.copy2(clazz.path, writedir +"/"+ str(index)+"-"+path[id+1:])
        index=index+1

def writeBypass():
    global bypassLoad
    outdir = "storyboard_out/"
    for file in bypassLoad:
        if "UserDefaultKeys" in file:
            print file
        path = file[1:]
        id = file.rfind("/")
        with open(outdir + path[id:], 'w'): pass
        shutil.copy2(file, outdir + path[id:])

def writeConfig():
    content = '{"compilerOptions": {"module":"none","target": "es6","noImplicitAny": false,"sourceMap": false,"watch": false,"outFile":"storyboard_in.js","experimentalDecorators": false}}'
    with open("storyboard_out/tsconfig.json",'w') as f:
        f.write(content)

if os.path.exists("storyboard_out"):
    shutil.rmtree('storyboard_out')
if os.path.exists("storyboard_in.js"):
    os.remove('storyboard_in.js')
if os.path.exists("storyboard_out.js"):
    os.remove('storyboard_out.js')

os.makedirs("storyboard_out")
findFiles("./ts/stordboardAdapter",".ts",allFiles)
allClasses = getClassExtend(allFiles,allClasses)
addClasses(allClasses)
writeToDir()
writeBypass()
writeConfig()

os.chdir("storyboard_out")
process = subprocess.Popen("ntsc", shell=True, stdout=subprocess.PIPE)
process.wait()
os.chdir("..")

first = True

with open("storyboard_out/storyboard_in.js",'r')as r:
    with open('storyboard_out/storyboard_out.js','w') as w:
        for line in r.readlines():
            if "var storyboard;" in line and first is False:
                continue

            if "(function (storyboard) {" in line and first is False:
                continue

            if "})(storyboard || (storyboard = {}));" in line and first is False:
                continue
            if "(function (storyboard) {" in line and first is True:
                first = False
            w.write(line)
        w.write("})(storyboard || (storyboard = {}));")



shutil.copy2("storyboard_out/storyboard_out.js", 'storyboard_out.js')
