
const process = require('process')
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

const instructionFile = day => `day${day?.toString().padStart(2, '0')}-instructions.html`
const inputFileNormal = day => `day${day?.toString().padStart(2, '0')}-input.txt`
const inputFileTest = day => `day${day?.toString().padStart(2, '0')}-input-test.txt`
const folderPathProblems = year => `./${year}-nodejs`
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
            res.setEncoding('utf-8')
            res.on('data', e => resolve(e.toString())).on('error', reject)
        })
    })
}


async function isSessionValid() {
    try {
        await new Promise((resolve, reject) => {
            https.get({
                ...options,
                path: '/'
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
        const mainHubHtml = await getWebContent('/events')

        // Using convoluted regex match instead of some html-parser for simple need.
        const regex = /<div class="eventlist-event"><a href="\/">\[\d{4}\]<\/a>\s*<\/div>/g
        year = mainHubHtml.match(regex)[0].match(/\d{4}/)[0]

        console.log(`Current Year: ${year}`)
    }

    const currentFolderPath = folderPathProblems(year)
    if (!fs.existsSync(currentFolderPath)) {
        fs.mkdirSync(currentFolderPath)
        fs.mkdirSync(folderPathInput(year))
    }

    const calendarHtml = await getWebContent(`/${year}`)
    const regex = /\/\d{4}\/day\/\d{1,2}/g


    allDays_unlocked = fs.readdirSync(currentFolderPath, {})
        .filter(v => v.includes(instructionFile()))
        .filter(v => !fs.readFileSync(`${currentFolderPath}/${instructionFile(v)}`, 'utf-8').includes('id="part2"'))

    allUnlockedDays_toDownload = calendarHtml.match(regex)
        .map(path => path.split('/')[3])
        .map(day => day.padStart(2, '0'))
        .filter(v => !allDays_unlocked.includes(instructionFile(v)))
        .sort((a, b) => parseInt(a) - parseInt(b))

    console.log(allDays_unlocked)
    console.log(allUnlockedDays_toDownload)
}

async function downloadProblem(year, day) {

    const problemHtml = await getWebContent(`/${year}/day/${day}`)
    const problemInput = (await getWebContent(`/${year}/day/${day}/input`)).split('\n')

    const instructionPath = `${folderPathProblems(year)}/${instructionFile(day)}`
    const inputPathNormal = `${folderPathInput(year)}/${inputFileNormal(day)}`
    const inputPathTest = `${folderPathInput(year)}/${inputFileTest(day)}`

    let length = problemInput.length - 1
    for (; length >= 0 && problemInput[length].length == 0; length--) { }
    const problemInputContent = problemInput.slice(0, length + 1).join('\r\n') // Encode CRLF files

    fs.writeFileSync(instructionPath, problemHtml.match(/<main>[\S\s]*<\/main>/g)[0])
    fs.writeFileSync(inputPathNormal, problemInputContent, 'utf-8')

}

async function main() {
    if (fs.existsSync('.sessionCookie')) {
        options.headers.Cookie = `session=${fs.readFileSync('.sessionCookie', 'utf-8')}`
    }

    if (!options.headers.Cookie || !(await isSessionValid())) {

        await new Promise((resolve, reject) => {
            const userInterface = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            })

            userInterface.question('///Please Enter Session Cookie:', async userInput => {
                userInterface.close()
                fs.writeFileSync('.sessionCookie', userInput, 'utf-8')
                options.headers.Cookie = `session=${userInput}`
                resolve()
            })
        })
        return main()
    }

    console.log('Valid Session Token Found!')

    downloadProblemsYear(2020)
}

main()

