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

out_dir = "out_components"


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
                loadClasses[loadIndex].append(clazz)
            return
        for clazz in classes:
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
    global out_dir
    index = 0

    for classLists in loadClasses:
        writedir = out_dir + "/"
        for clazz in classLists:
            path = clazz.path[2:]
            id = path.rfind("/")
            with open(writedir + str(index)+"-"+path[id+1:], 'w'): pass
            shutil.copy2(clazz.path, writedir +"/"+ str(index)+"-"+path[id+1:])
        index=index+1

def writeBypass():
    global bypassLoad
    global out_dir
    for file in bypassLoad:
        if "UserDefaultKeys" in file:
            print file
        path = file[1:]
        id = file.rfind("/")
        with open(out_dir + path[id:], 'w'): pass
        shutil.copy2(file, out_dir + path[id:])

def writeConfig():
    content = '{"compilerOptions": {"module":"none","target": "es6","noImplicitAny": false,"sourceMap": false,"watch": false,"outFile":"in.js","experimentalDecorators": false}}'
    with open("out_components/tsconfig.json",'w') as f:
        f.write(content)

if os.path.exists(out_dir):
    shutil.rmtree(out_dir)
if os.path.exists("components_out.js"):
    os.remove('components_out.js')

os.makedirs(out_dir)
findFiles("./ts/components",".ts",allFiles)
allClasses = getClassExtend(allFiles,allClasses)
addClasses(allClasses)
writeToDir()
writeBypass()
writeConfig()

os.chdir(out_dir)
process = subprocess.Popen("tsc", shell=True, stdout=subprocess.PIPE)
process.wait()
os.chdir("..")

first = True

with open(out_dir+"/in.js",'r')as r:
    with open(out_dir +'/out.js','w') as w:
        for line in r.readlines():
            if "var components;" in line and first is False:
                continue

            if "(function (components) {" in line and first is False:
                continue

            if "})(components || (components = {}));" in line and first is False:
                continue
            if "(function (components) {" in line and first is True:
                first = False
            w.write(line)
        w.write("})(components || (components = {}));")



shutil.copy2(out_dir+"/out.js", 'components_out.js')

#if os.path.exists("out_components"):
 #   shutil.rmtree('out_components')
