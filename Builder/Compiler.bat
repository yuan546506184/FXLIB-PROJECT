@echo off
for %%t in (../Source/*.js) do java -jar ./Compiler.jar --js ../Source/%%t --js_output_file ../Minifield/%%~nt.min.js
pause