
const https = require('https');
const fs = require('fs');
const userInterface = require('readline')
  .createInterface({
    input: process.stdin,
    output: process.stdout
  })



class Downloader {

  static SOLUTION_POSTFIX = '__TODO__'
  static INSTRUCTIONS_FILE = 'instructions.html'
  static FOLDER_POSTFIX = 'nodejs'
  static INPUT_FILE = 'input.txt'
  static DAY_25_NAME = 'part_final'


  static FILE_TYPES = {
    SOLUTION_FILE_PART_1: 0,
    SOLUTION_FILE_PART_2: 1,
    SOLUTION_FILE_PART_1_TODO: 2,
    SOLUTION_FILE_PART_2_TODO: 3,
    INSTRUCTIONS_FILE: 4,
    INPUT_FILE_NORMAL: 5,
    INPUT_FILE_TEST: 6,
  }

  static FOLDER_TYPES = {
    PROBLEMS: 0,
    INPUTS: 1
  }


  #year = null
  #options = {
    hostname: 'adventofcode.com',
    path: '/',
    headers: {
      // Uses session cookie to access data.
      // Session Cookie for AOC is valid for month. (Not High Security)
      // Obtainable by login via Browser and Access Cookies via Dev-Tools.
      Cookie: undefined
    }
  }

  constructor(year) {
    this.#year = year
  }

  async download() {

    let sessionCookieValid = false

    if (fs.existsSync('.sessionCookie')) {
      this.#options.headers.Cookie = fs.readFileSync('.sessionCookie', 'utf-8')
      sessionCookieValid = await this.#isSessionValid()
      if (!sessionCookieValid) {
        console.error("\x1b[48;2;255;0;0m !!! Existing Session Cookie was not valid !!! \x1b[0m")
      }
    } else {
      // ANSI-Escape-Sequences: :D
      console.log("\x1b[48;2;255;0;0m !!! No Session Cookie was found !!! \x1b[0m")
    }

    if (!sessionCookieValid) {

      userInterface.question("\x1b[38;2;255;255;0m ///Please Enter Valid Session Cookie: \x1b[0m", async userInput => {
        this.#options.headers.Cookie = `session=${userInput}`
        fs.writeFileSync('.sessionCookie', this.#options.headers.Cookie, 'utf-8')
        return this.download()
      })

    } else {
      userInterface.close()
      console.log("\x1b[48;2;0;255;0m Session Cookie is valid! \x1b[0m")
      this.#downloadYear()
    }

  }


  getFileName(type, day) {

    const problemFolderPath = this.getFolderName(Downloader.FOLDER_TYPES.PROBLEMS)
    const inputFolderPath = this.getFolderName(Downloader.FOLDER_TYPES.INPUTS)

    // Advent of Code - Day 25 on Christmas is only one final puzzle.
    const part1 = day != 25 ? "part1" : Downloader.DAY_25_NAME
    const part2 = day != 25 ? "part2" : Downloader.DAY_25_NAME
    day = day?.toString().padStart(2, '0')

    switch (type) {

      case Downloader.FILE_TYPES.SOLUTION_FILE_PART_1:
        return `${problemFolderPath}/day${day}-${part1}.js`

      case Downloader.FILE_TYPES.SOLUTION_FILE_PART_2:
        return `${problemFolderPath}/day${day}-${part2}.js`

      case Downloader.FILE_TYPES.SOLUTION_FILE_PART_1_TODO:
        return `${problemFolderPath}/day${day}-${part1}${Downloader.SOLUTION_POSTFIX}.js`

      case Downloader.FILE_TYPES.SOLUTION_FILE_PART_2_TODO:
        return `${problemFolderPath}/day${day}-${part2}${Downloader.SOLUTION_POSTFIX}.js`

      case Downloader.FILE_TYPES.INSTRUCTIONS_FILE:
        return `${problemFolderPath}/day${day}-${Downloader.INSTRUCTIONS_FILE}`

      case Downloader.FILE_TYPES.INPUT_FILE_NORMAL:
        return `${inputFolderPath}/day${day}-${Downloader.INPUT_FILE}`

      case Downloader.FILE_TYPES.INPUT_FILE_TEST:
        return `${inputFolderPath}/day${day}-${Downloader.INPUT_FILE}`
    }

  }

  getFolderName(type) {

    const folderPath = `${__dirname}/${this.#year}-${Downloader.FOLDER_POSTFIX}`
    const inputsPath = `${folderPath}/input`

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }
    if (!fs.existsSync(inputsPath)) {
      fs.mkdirSync(inputsPath)
    }

    switch (type) {

      case Downloader.FOLDER_TYPES.PROBLEMS:
        return folderPath

      case Downloader.FOLDER_TYPES.INPUTS:
        return inputsPath
    }

  }




  async #isSessionValid() {
    return await this.#get("/settings").then(({ response }) => response.statusCode == 200)
  }

  async #get(path) {

    return new Promise((resolve, reject) => {
      https.get({
        ...this.#options,
        path: path
      }, response => {
        let content = ''
        response.setEncoding('utf-8')
          .on('data', e => content += e.toString())
          .on('end', e => resolve({
            content: content,
            response: response
          }))
          .on('error', reject)
      })
    })

  }

  async #hasStarted() {

    if (this.#year.match(/^\d{4}$/) == null) {
      throw new Error(`'${YEAR}' is not a valid year. | Must be a four digit year like: 2023`)
    }
    if (parseInt(this.#year) < 2015) {
      throw new Error(`'${YEAR}' is not a valid year. | Advent Of Code dates back to 2015`)
    }

    const StartEST = (new Date(new Date("2023-12-01").toUTCString()))


    let CurrentEST = (new Date(new Date().toUTCString()))
    CurrentEST.setUTCHours(CurrentEST.getUTCHours() - 5)

    if (this.#year < CurrentEST.getFullYear()) {
      return true
    }
    if (this.#year > CurrentEST.getFullYear()) {
      return false
    }

    let timespan = StartEST.getTime() - CurrentEST.getTime()
    if (Math.floor(timespan / (1000 * 60 * 60 * 24)) > 0) {
      return false
    }


    while (StartEST.getTime() - CurrentEST.getTime()) {

      CurrentEST = (new Date(new Date().toUTCString()))
      CurrentEST.setUTCHours(CurrentEST.getUTCHours() - 5)
      timespan = StartEST.getTime() - CurrentEST.getTime()

      const hours = Math.floor(timespan / (1000 * 60 * 60))
      timespan -= hours * 1000 * 60 * 60

      const mins = Math.floor(timespan / (1000 * 60))
      timespan -= mins * 1000 * 60

      const seconds = Math.floor(timespan / 1000)
      timespan -= seconds * 1000

      process.stdout.write(` Timer until AOC starts: ${hours.toString().padStart(2, 0)}:${mins.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`)

      // wait a second for each loop
      await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000))
      process.stdout.clearLine(0)
      process.stdout.cursorTo(0)
    }

    return true
  }

  async #downloadYear() {

    console.log(`\x1b[38;2;0;255;0m Download Problems for Year: ${this.#year}! \x1b[0m`)

    const hasStarted = await this.#hasStarted()
    if (!hasStarted) {
      return console.log(`\x1b[38;2;0;0;255m AOC for ${this.#year} hasn't started :( \x1b[0m`)
    }

    const calendarHtml = await this.#get(`/${this.#year}`).then(({ content }) => content)
    const matches = calendarHtml.match(/\/\d{4}\/day\/\d{1,2}/g)

    if (matches == null) {
      return console.log(`\x1b[38;2;0;0;255m No Problems were found \x1b[0m`)
    }

    matches
      .map(path => path.split('/')[3])
      .map(day => day.padStart(2, '0'))
      .filter(day =>
        (
          !fs.existsSync(this.getFileName(Downloader.FILE_TYPES.SOLUTION_FILE_PART_1_TODO, day)) &&
          !fs.existsSync(this.getFileName(Downloader.FILE_TYPES.SOLUTION_FILE_PART_2_TODO, day)) &&
          !fs.existsSync(this.getFileName(Downloader.FILE_TYPES.SOLUTION_FILE_PART_2, day))
        ) || day != 25 &&
        fs.readFileSync(this.getFileName(Downloader.FILE_TYPES.INSTRUCTIONS_FILE, day), 'utf-8')
          .match(/<p>Your puzzle answer was <code>[\dA-Za-z]+<\/code>.<\/p>/g)?.length < 2
      )
      .sort((a, b) => parseInt(a) - parseInt(b))
      .forEach(day => this.#downloadDay(day))

  }

  async #downloadDay(day) {

    day = parseInt(day)

    const problemHtml = await this.#get(`/${this.#year}/day/${day}`).then(({ content }) => content)

    const solutionPart1Todo = this.getFileName(Downloader.FILE_TYPES.SOLUTION_FILE_PART_1_TODO, day)
    const solutionPart2Todo = this.getFileName(Downloader.FILE_TYPES.SOLUTION_FILE_PART_2_TODO, day)
    const solutionPart1 = this.getFileName(Downloader.FILE_TYPES.SOLUTION_FILE_PART_1, day)
    const solutionPart2 = this.getFileName(Downloader.FILE_TYPES.SOLUTION_FILE_PART_2, day)

    const instructionPath = this.getFileName(Downloader.FILE_TYPES.INSTRUCTIONS_FILE, day)
    const inputPathNormal = this.getFileName(Downloader.FILE_TYPES.INPUT_FILE_NORMAL, day)
    const inputPathTest = this.getFileName(Downloader.FILE_TYPES.INPUT_FILE_TEST, day)

    // Solution Blueprint Files
    const blueprint = fs.readFileSync('blueprint.js', 'utf-8')
      .replaceAll('${{INPUT_NORMAL}}', this.getFileName(Downloader.FILE_TYPES.INPUT_FILE_NORMAL, day))
      .replaceAll('${{INPUT_TEST}}', this.getFileName(Downloader.FILE_TYPES.INPUT_FILE_TEST, day))
      .replaceAll('${{DAY}}', day)


    // Write main problem to file
    fs.writeFileSync(instructionPath, problemHtml.match(/<main>[\S\s]*<\/main>/g)[0], 'utf-8')


    const solutionPart1Exists = fs.existsSync(solutionPart1) || fs.existsSync(solutionPart1Todo)
    const solutionPart2Exists = fs.existsSync(solutionPart2) || fs.existsSync(solutionPart2Todo)
    const part2Unlocked = problemHtml.match(/<p>Your puzzle answer was <code>[\dA-Za-z]+<\/code>.<\/p>/g)?.length < 2

    if (!solutionPart1Exists) {
      fs.writeFileSync(solutionPart1Todo, blueprint.replaceAll('${{PART}}', 1), 'utf-8')
      console.log('Downloaded Part 1 - Day ', day, instructionPath, inputPathNormal)

    }

    if (!solutionPart2Exists && part2Unlocked) {
      fs.writeFileSync(solutionPart2Todo, blueprint.replaceAll('${{PART}}', 2), 'utf-8')
      console.log('Downloaded Part 2 - Day ', day, instructionPath, inputPathNormal)
    }

    if (!fs.existsSync(inputPathNormal)) {
      const problemInput = await this.#get(`/${this.#year}/day/${day}/input`).then(({ content }) => content.split('\n'))
      let length = problemInput.length - 1
      for (; length >= 0 && problemInput[length] == ''; length--) { }
      const problemInputContent = problemInput.slice(0, length + 1).join('\r\n') // Encode CRLF files
      fs.writeFileSync(inputPathNormal, problemInputContent, 'utf-8')
    }

    if (!fs.existsSync(inputPathTest)) {
      fs.writeFileSync(inputPathTest, ' <<< PUT TEST DATA HERE >>> ', 'utf-8')
    }

  }

}





/*

  node .\downloader.js [OPTIONAL YEAR]

  If no year is provided all available puzzles for the current year are downloaded.

*/

const YEAR = process.argv[2] ?? (new Date()).getFullYear().toString()

const downloader = new Downloader(YEAR)
downloader.download()
