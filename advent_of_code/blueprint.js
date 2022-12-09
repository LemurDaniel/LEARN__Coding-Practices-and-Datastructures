const process = require('process')
const fs = require('fs');


const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/${{INPUT_TEST}}', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/${{INPUT_NORMAL}}', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

const input = fileContent.split('\r\n')

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/