const fs = require('fs');

class BITS_Reader {

  get isEnded() {
    return this._index >= this.data.length;
  }

  get index() {
    return this._index;
  }

  constructor(path) {
    this.data = fs.readFileSync(path, 'utf-8').split('')
      .map(
        char => (parseInt(char, 16) ^ 0b10000).toString(2).substring(1)
      ).join('');

    console.log(this.data)
    this._index = 0;
    this.bitCounter = 0;
  }

  next() {
    if (this._index < this.data.length)
      return { value: this.data[this._index++] };
    else
      return { done: true };
  }
  read(bits) {
    let data = ''

    this.bitCounter = (this.bitCounter + bits) % 4;
    for (let i = 0; i < bits; i++)
      data += this.next().value;

    return data;
  }
  clearExtraBits() {
    this.read(4 - this.bitCounter);
    this.bitCounter = 0;
  }
}

const reader = new BITS_Reader('input/day16-input.txt');


function evaluateTransmission(reader) {

  let version = parseInt(reader.read(3), 2)

  console.log('\n ---- Process new Packet --- Version: ' + version + ' ---- \n')

  if (reader.read(3) === '100')
    interpretAsLiteral(reader);
  else
    return version + interpretAsOperator(reader, reader.read(1))

  return version;
}



function interpretAsLiteral(reader) {
  let subPacket;
  let number = '';
  do {
    subPacket = reader.read(5);
    number += subPacket.slice(1);
  } while (subPacket[0] === '1');
  console.log(number + ' ==> ' + parseInt(number, 2))
}

function interpretAsOperator(reader, LengthBit) {

  if (LengthBit === null) return;
  let packetLengthBitsCount = LengthBit === '1' ? 11 : 15;
  let packetsLength = reader.read(packetLengthBitsCount);

  console.log(packetsLength)
  if (packetsLength === null || packetsLength.length !== packetLengthBitsCount)
    throw new Error('Error while parsing sub packet length of operator.')

  packetsLength = parseInt(packetsLength, 2)

  let versionSum = 0;
  if (LengthBit === '1') {
    while (packetsLength-- > 0) {
      versionSum += evaluateTransmission(reader)
    }
  }
  else {
    const startIndex = reader.index;
    while (reader.index - startIndex < packetsLength) {
      versionSum += evaluateTransmission(reader)
    }
  }

  return versionSum;
}


console.log('\n\n Sum of version numbers: ' + evaluateTransmission(reader) + '\n')