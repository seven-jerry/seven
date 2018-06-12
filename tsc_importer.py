import os
import sys
import time
import subprocess

#   this script imports files into a html document(js,css)
#   1. make copy of the html file
#   2. specify INPUTFILE and OUTPUTFILE
#   3. if you need the files to have a specific order
#       go to files and add in comments
#         //{INSERTORDER:n} where smaller n's get loaded first
#       to the top of the files
#   4. editor->input_file -> at position you want files to go
#       before:
#           <html>
#               <head>
#               </head>
#       after:
#           <html>
#               <head>
#                  <!-- {SVN_AUTO_IMPORT type:.js; dir:../tsc_out; exclude:unit_test/; template:<script src="%PATH"></script>;} -->
#               </head>
#        exculde : every path containing "unit_test" will not be added
#   5. run script -> will run every 10 secounds
#   6. the output file shoud look like this:
#           <html>
#               <head>
#                   <script src="../tsc_out/script1.js"></script>
#                   <script src="../tsc_out/script2.js"></script>
#                   <script src="../tsc_out/script3.js"></script>
#                   <script src="../tsc_out/script4.js"></script>
#                   <script src="../tsc_out/script5.js"></script>
#               </head>



updateCommandStrings = list()
updateCommands = list()
in_file = list()

#    HELPER OBJECTS
class UpdateCommnad(object):
    lineNumber=""
    type=""
    dir=""
    exclude=list()
    template=""
    filePaths=list()

    
class StringBuffer:
    baseString=""
    currentPos=0
    def setBaseString(self,string):
        self.baseString = string
        
    def setPosFromSubString(self,string):
        try:
            self.currentPos = self.baseString.index(string) + len(string)
           
        except ValueError:
            print string +" not found in base-string : "+self.baseString
            raise ValueError()
    
    def readTillChar(self,expectedChar,toofarChar):
        substring = self.baseString[self.currentPos:]
        resultString = ""
        for char in substring:
            if char == expectedChar:
                break;
            if char == toofarChar:
                print substring + " : went too far. tried to find "+expectedChar+" but found "+toofarChar
                resultString = "";
                break;
            resultString = resultString + char;
        return resultString

def addSubstringAfterString(baseString,afterString,addString):
    pos = baseString.index(afterString) + len(afterString)
    return baseString[:pos] + addString + baseString[pos:]

def hasLastPathComponent(path,component):
    if component not in path:
        return False
    componentPos = path.rindex(component)
    componentlength = len(component)
    if componentPos + componentlength is len(path):
        return True
    return False

def inArray(stringArray,string):
    for everyString in stringArray:
        if everyString in string:
            return True
    return False


#     SCRIPT

# check if the give input and out files are valid
def checkFiles():
    global INPUTFILE
    global OUTPUTFILE
    if len(INPUTFILE) == 0:
        print "input file not defined"
        sys.exit()
    if len(OUTPUTFILE) == 0:
        print "output file not defined"
        sys.exit()
    if OUTPUTFILE == INPUTFILE :
        print "input file must be different as output file"
        sys.exit()

#go to inputfile and get the Import from iputfile
#these are normally stored in html comments
def getRawCommands():
    global in_file
    global INPUTFILE
    with open(INPUTFILE, 'r') as f:
        in_file = f.readlines()
        for lineNumber,line in enumerate(in_file):
            if "SVN_AUTO_IMPORT" in line:
                lineNumberFin = lineNumber+1
                lineNumberString = " source-lineNumber:"+ str(lineNumberFin)  + ";"
                in_file[lineNumber] = addSubstringAfterString(line,"SVN_AUTO_IMPORT",lineNumberString)
                updateCommandStrings.append(in_file[lineNumber])



            
#convert the raw commands from string to object
def buildCommandObjects():
    if len(updateCommandStrings) == 0:
        print "NO SVN_AUTO_IMPORT FOUND"
        sys.exit()
    for command in updateCommandStrings:
        commandObject = UpdateCommnad()
        
        buffer = StringBuffer()
        buffer.setBaseString(command)
        buffer.setPosFromSubString("lineNumber:")
        commandObject.lineNumber = buffer.readTillChar(";",":")
        
        buffer.setPosFromSubString("type:")
        commandObject.type = buffer.readTillChar(";",":")
        
        buffer.setPosFromSubString("dir:")
        commandObject.dir = buffer.readTillChar(";",":")
    
        buffer.setPosFromSubString("exclude:")
        excludeString = buffer.readTillChar(";",":")
        if len(excludeString) > 0:
             commandObject.exclude = excludeString.split(",")
        
        buffer.setPosFromSubString("template:")
        commandObject.template = buffer.readTillChar(";","}")
         
        if len(commandObject.type) > 0 and len(commandObject.dir) > 0 and len(commandObject.template) > 0:
            updateCommands.append(commandObject)

# find all the files in a given path
def findFiles(dir,type,exclude,array):
    for fname in os.listdir(dir):
        path = os.path.join(dir, fname)
        if os.path.isdir(path):      
            findFiles(path,type,exclude,array)
            
        if len(exclude) > 0:            
            if  hasLastPathComponent(path,type) and not inArray(exclude,path):
                array.append(path);
        elif type in path :
           array.append(path);
           
# sort by insertorder
def sort(array):
    distarray = list()
    counter = 0
    while counter < 20:
        for path in array:
            with open(path, 'r') as f:
                    order = int(1)
                    for line in f.readlines():
                        if "INSERTORDER" in line:
                            buffer = StringBuffer()
                            buffer.setBaseString(line)
                            buffer.setPosFromSubString("INSERTORDER:")
                            order = int(buffer.readTillChar("}", " "))
                    if order == counter:
                        distarray.append(path)
        counter += 1
    return distarray

# write the found files to output file
def writeToFile():
    global in_file
    global OUTPUTFILE
    global updateCommands
    with open(OUTPUTFILE, 'w') as f:
        f.writelines(in_file)
    for updateCommand in updateCommands:
        updateCommand.filePaths = list()
        findFiles(updateCommand.dir,
                  updateCommand.type,
                  updateCommand.exclude,
                  updateCommand.filePaths)
        updateCommand.filePaths=sort(updateCommand.filePaths)
        with open(OUTPUTFILE, 'r') as f:
            in_file = f.readlines()
        out_file = []
        for line in in_file:
            out_file.append(line)
            if 'SVN_AUTO_IMPORT' in line and updateCommand.lineNumber in line  and updateCommand.dir in line and updateCommand.type in line and updateCommand.template in line:
                for path in updateCommand.filePaths:
                    out_file.append('    '+updateCommand.template.replace("%PATH",path)+'\n')
        with open(OUTPUTFILE, 'w') as f:
            f.writelines(out_file)

def resetGlobals():
    global updateCommandStrings
    global updateCommands
    global in_file
    updateCommandStrings = list()
    updateCommands = list()
    in_file = list()
while True:
    print "start compiling"
    process = subprocess.Popen("ntsc", shell=True, stdout=subprocess.PIPE)
    process.wait()
    print "ended compiling with code" + str(process.returncode)
    print "start import"
    checkFiles()
    transpileSize()
    getRawCommands()  
    buildCommandObjects()
    writeToFile()
    resetGlobals()
    print "end import, waiting..."

