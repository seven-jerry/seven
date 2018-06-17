import os
import sys
import time
import subprocess
import shutil


def findFiles(dir,type,exclude,array):
    for fname in os.listdir(dir):
        path = os.path.join(dir, fname)
        if os.path.isdir(path):      
            findFiles(path,type,exclude,array)
            
        if len(exclude) > 0:            
            if  hasLastPathComponent(path,type) and not inArray(exclude,path):
                array.append(path)
        elif type in path :
           array.append(path)

def transpileSize():
    array = list()
    findFiles("./ts","test.xml","",array)
    for filepath in array:
        if ".xml.ts" in filepath:
            continue
        with open("ts/stordboardAdapter/storyboard.xml.ts",'w' ) as out:
            out.write("//auto-generated\n")
            out.write("namespace storyboard{ \n");
            out.write("var storyboardXmlText:string = '';\n");
            buildXml = ""
            with open(filepath, 'r') as f:
                in_file = f.readlines()
                for lineNumber,line in enumerate(in_file):
                    if "?xml" not in line and len(line) > 1:
                        out.write("storyboardXmlText += '" +line.replace("\n","") + "';\n");
            out.write("var parser = new DOMParser();\n");
            out.write("export var storyboardXml:XMLDocument = parser.parseFromString(storyboardXmlText,\"text/xml\");\n");
            out.write("} \n");
  
transpileSize()