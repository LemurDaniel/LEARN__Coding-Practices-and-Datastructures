const fs = require('fs');
const Helper = require('../../nodejs/Helper')

let input;
input = fs.readFileSync('./input/day20-input-test.txt', 'utf-8').split('\r\n\r').map(v => v.trim());
input = fs.readFileSync('./input/day20-input.txt', 'utf-8').split('\r\n\r').map(v => v.trim());

input[1] = input[1].trim().split('\r\n')

const ENHANCING_ALGORITHM = {};
const IMAGE = {};
const PIXEL = {
  DARK: '.',
  LIGHT: '#'
}
const BOUNDS = {
  minY: 0, maxY: input[1].length - 1,
  minX: 0, maxX: input[1][0].length - 1,
  INFINITE_GRID: PIXEL.DARK,
};


// Process enhancing algorithm.
for (let i = 0; i < input[0].length; i++) {

  const pixel = input[0][i];
  const byte = (i | 0b1000000000)
    .toString(2).substring(1)
    .split('')
    .map(v => v === '1' ? PIXEL.LIGHT : PIXEL.DARK)
    .join('');

  if (pixel === PIXEL.LIGHT)
    ENHANCING_ALGORITHM[byte] = pixel;
}

// Process original image.
// Each pixel is encoded as a integer where the first bit is the current state and the second the previous state.
for (let i = 0; i < input[1].length; i++) {
  for (let j = 0; j < input[1][i].length; j++) {
    const pos = [i, j];
    const pixel = input[1][i][j];
    if (pixel === PIXEL.LIGHT)
      IMAGE[pos] = 0b01;
  }
}


// Determine wether pixel at position is light or dark.
function enhancePixelAtPos(x, y) {

  let pixels = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {

      const pos = [x + i, y + j];

      if (pos[0] < BOUNDS.minX || pos[0] > BOUNDS.maxX)
        pixels.push(BOUNDS.INFINITE_GRID)
      else if (pos[1] < BOUNDS.minY || pos[1] > BOUNDS.maxY)
        pixels.push(BOUNDS.INFINITE_GRID)
      else if (!(pos in IMAGE))
        pixels.push(PIXEL.DARK)
      else if (IMAGE[pos] >> 1) // Consider only second bit. (which is the previous state)
        pixels.push(PIXEL.LIGHT)
      else
        pixels.push(PIXEL.DARK)
    }
  }

  // console.log(pixels.join(''),  pixels.join('') in ENHANCING_ALGORITHM)
  return pixels.join('') in ENHANCING_ALGORITHM ? PIXEL.LIGHT : PIXEL.DARK;
}


// Enhance image by one zoom level.
function enhanceImage() {

  // Move first bit of each pixel to second bit.
  for (const pos of Object.keys(IMAGE)) {
    if (IMAGE[pos] & 1)
      IMAGE[pos] = IMAGE[pos] << 1 & 0b11;
    else
      delete IMAGE[pos];
  }

  // Expand bounds out by one.
  BOUNDS.maxX += 1;
  BOUNDS.maxY += 1;
  BOUNDS.minX -= 1;
  BOUNDS.minY -= 1;

  // Cover special case where the complete outer infinite image is lit.
  if (BOUNDS.INFINITE_GRID === PIXEL.LIGHT) {
    for (let x = BOUNDS.minX; x <= BOUNDS.maxX; x++) {
      const posUp = [x, BOUNDS.minY];
      const posDown = [x, BOUNDS.maxY];
      IMAGE[posUp] = 0b10;
      IMAGE[posDown] = 0b10;
    }

    for (let y = BOUNDS.minY; y <= BOUNDS.maxY; y++) {
      const posLeft = [BOUNDS.minX, y];
      const posRight = [BOUNDS.maxX, y];
      IMAGE[posLeft] = 0b10;
      IMAGE[posRight] = 0b10;
    }
  }


  for (let x = BOUNDS.minX; x <= BOUNDS.maxX; x++) {
    for (let y = BOUNDS.minY; y <= BOUNDS.maxY; y++) {

      const pixel = enhancePixelAtPos(x, y);
      const pos = [x, y];

      if (pos in IMAGE) {
        if (pixel === PIXEL.LIGHT)
          IMAGE[pos] = (IMAGE[pos] & 0b10) + 1 // Set first bit to 1.
        else
          IMAGE[pos] = IMAGE[pos] & 0b10 // Set first bit to 0.
      }
      else {
        if (pixel === PIXEL.LIGHT)
          IMAGE[pos] = 0b01 // Set first bit to 1.
        else
          IMAGE[pos] = 0b00 // Set first bit to 0.
      }
    }
  }

  // Since the first line of the enhancing algorithm can be '#' and the last can be '.' the special cases for the infinite grid must be covered.
  if (BOUNDS.INFINITE_GRID === PIXEL.DARK && '.........' in ENHANCING_ALGORITHM) // 9 dark pixels become a light one.
    BOUNDS.INFINITE_GRID = PIXEL.LIGHT;
  else if (BOUNDS.INFINITE_GRID === PIXEL.LIGHT && !('#########' in ENHANCING_ALGORITHM)) // 9 lit pixels become a dark one.
    BOUNDS.INFINITE_GRID = PIXEL.DARK;
}




function printImage(text = '') {

  console.log();
  console.group();
  if (text !== '') console.log(text);
  for (let x = BOUNDS.minX, line = '  '; x <= BOUNDS.maxX; x++, line = '  ') {

    for (let y = BOUNDS.minY; y <= BOUNDS.maxY; y++) {
      const pos = [x, y]
      line += IMAGE[pos] & 0b01 ? PIXEL.LIGHT : PIXEL.DARK;
    }

    console.log(line);
  }
  console.groupEnd();
}


printImage('Original: ');
console.log();
for (let i = 0; i < 50; i++) {
  if (i % 5 === 0)
    console.log('   Enhanced by ' + i + ' times.');
  enhanceImage();
}
printImage('50 times enhanced: ');
console.log()

const numberOfLightPixels = Object.values(IMAGE).map(pixel => pixel & 0b01).reduce((acc, val) => acc + val);
console.log(' Number of lit pixels: ' + numberOfLightPixels)
console.log()