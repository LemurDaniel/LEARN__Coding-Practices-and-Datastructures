
const process = require('process')
const https = require('https');
const fs = require('fs');
const userInterface = require('readline')
  .createInterface({
    input: process.stdin,
    output: process.stdout
  })

const INSTRUCTIONS_FILE = 'instructions.html'
const FOLDER_POSTFIX = 'nodejs'
const INPUT_FILE = 'input.txt'
const SOLUTION_POSTFIX = '__TODO__'

const solutionFile = (day, part, postfix = '') => `day${day?.toString().padStart(2, '0')}-part${parseInt(part)}${postfix}.js`
const instructionFile = day => `day${day?.toString().padStart(2, '0')}-${INSTRUCTIONS_FILE}`
const inputFileNormal = day => `day${day?.toString().padStart(2, '0')}-${INPUT_FILE}`
const inputFileTest = day => `day${day?.toString().padStart(2, '0')}-input-test.txt`
const folderPathProblems = year => `./${year}-${FOLDER_POSTFIX}`
const folderPathInput = year => `${folderPathProblems(year)}/input`

const options = {
  hostname: 'adventofcode.com',
  path: '/',
  headers: {
    // Uses session cookie to access data (Session Cookie for AOC is valid for month (Not High Security))
    // Obtainable by logging into Browser and Access Cookies via Dev-Tools
    Cookie: undefined
  }
}
function getWebContent(path) {
  return new Promise((resolve, reject) => {
    https.get({
      ...options,
      path: path
    }, res => {
      let content = ''
      res.setEncoding('utf-8')
        .on('data', e => content += e.toString())
        .on('end', e => resolve(content))
        .on('error', reject)
    })
  })
}


async function isSessionValid() {
  try {
    await new Promise((resolve, reject) => {
      https.get({
        ...options,
        path: '/settings'
      }, res => {
        if (res.statusCode == 200) resolve(res.statusCode)
        else reject(res.statusCode)
      })
    })
    return true
  } catch {
    return false
  }
}



async function downloadProblemsYear(year) {

  if (!year) {
    //const mainHubHtml = await getWebContent('/events')

    // Using convoluted regex match instead of some html-parser for simple need.
    //const regex = /<div class="eventlist-event"><a href="\/">\[\d{4}\]<\/a>\s*<\/div>/g
    //#year = mainHubHtml.match(regex)[0].match(/\d{4}/)[0]

    year = (new Date()).getFullYear()
    console.log(`Current Year: ${year}`)
  }

  const currentFolderPath = folderPathProblems(year)
  if (!fs.existsSync(currentFolderPath)) {
    fs.mkdirSync(currentFolderPath)
    fs.mkdirSync(folderPathInput(year))
  }

  const calendarHtml = await getWebContent(`/${year}`)
  const regex = /\/\d{4}\/day\/\d{1,2}/g

  if (calendarHtml.match(regex) == null) {
    return console.log("AOC hasn't started :(")
  }

  allUnlockedDays_toDownload = calendarHtml.match(regex)
    .map(path => path.split('/')[3])
    .map(day => day.padStart(2, '0'))
    .filter(v =>
      (
        !fs.existsSync(`${currentFolderPath}/${solutionFile(v, 1, SOLUTION_POSTFIX)}`) &&
        !fs.existsSync(`${currentFolderPath}/${solutionFile(v, 2, SOLUTION_POSTFIX)}`) &&
        !fs.existsSync(`${currentFolderPath}/${solutionFile(v, 2)}`)
      ) ||
      fs.readFileSync(`${currentFolderPath}/${instructionFile(v)}`, 'utf-8')
        .match(/<p>Your puzzle answer was <code>\d*<\/code>.<\/p>/g)?.length < 2
    )
    .sort((a, b) => parseInt(a) - parseInt(b))
    .forEach(day => downloadProblem(year, day))

}

async function downloadProblem(year, day) {

  day = parseInt(day)
  const problemHtml = await getWebContent(`/${year}/day/${day}`)
  const problemInput = (await getWebContent(`/${year}/day/${day}/input`)).split('\n')

  // Solution Blueprint Files
  blueprint = fs.readFileSync('blueprint.js', 'utf-8')
    .replace('${{INPUT_NORMAL}}', inputFileNormal(day))
    .replace('${{INPUT_TEST}}', inputFileTest(day))

  const solutionPart1 = `${folderPathProblems(year)}/${solutionFile(day, 1)}`
  const solutionPart1Todo = `${folderPathProblems(year)}/${solutionFile(day, 1, SOLUTION_POSTFIX)}`
  const solutionPart2 = `${folderPathProblems(year)}/${solutionFile(day, 2)}`
  const solutionPart2Todo = `${folderPathProblems(year)}/${solutionFile(day, 2, SOLUTION_POSTFIX)}`

  const instructionPath = `${folderPathProblems(year)}/${instructionFile(day)}`
  const inputPathNormal = `${folderPathInput(year)}/${inputFileNormal(day)}`
  const inputPathTest = `${folderPathInput(year)}/${inputFileTest(day)}`


  fs.writeFileSync(instructionPath, problemHtml.match(/<main>[\S\s]*<\/main>/g)[0], 'utf-8')

  if (!(fs.existsSync(solutionPart1))) {
    fs.writeFileSync(solutionPart1Todo, blueprint, 'utf-8')
    console.log('Downloaded Part 1 - Day ', day, instructionPath, inputPathNormal)

  } else if (problemHtml.match(/<p>Your puzzle answer was <code>\d*<\/code>.<\/p>/g)?.length < 2) {
    fs.writeFileSync(solutionPart2Todo, blueprint, 'utf-8')
    console.log('Downloaded Part 2 - Day ', day, instructionPath, inputPathNormal)
    return

  } else {
    console.log('Downloaded - Day ', day, 'No New Content')
    return
  }

  let length = problemInput.length - 1
  for (; length >= 0 && problemInput[length] == ''; length--) { }
  const problemInputContent = problemInput.slice(0, length + 1).join('\r\n') // Encode CRLF files

  fs.writeFileSync(inputPathNormal, problemInputContent, 'utf-8')
  fs.writeFileSync(inputPathTest, ' <<< PUT TEST DATA HERE >>> ', 'utf-8')

}




async function main() {
  if (fs.existsSync('.sessionCookie')) {
    options.headers.Cookie = `session=${fs.readFileSync('.sessionCookie', 'utf-8')}`
  }

  if (!options.headers.Cookie || !(await isSessionValid())) {

    userInterface.question('///Please Enter Valid Session Cookie:', async userInput => {
      options.headers.Cookie = `session=${userInput}`
      fs.writeFileSync('.sessionCookie', userInput, 'utf-8')
      return main()
    })
  } else {
    userInterface.close()
    console.log('Valid Session Cookie Found!')
    downloadProblemsYear() // No Input = Current Year
  }

}

main()

