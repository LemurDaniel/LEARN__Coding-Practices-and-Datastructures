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

function evaluateTransmission(reader) {

  const version = parseInt(reader.read(3), 2)

  console.log('\n ---- Process new Packet --- Version: ' + version + ' ---- \n')

  const typeId = parseInt(reader.read(3), 2)
  if (typeId === 4)
    return interpretAsLiteral(reader);


  switch (typeId) {
    case 0: // Sum
      return interpretAsOperator(reader)
        .reduce((acc, val) => acc + val);
    case 1: // Product
      return interpretAsOperator(reader)
        .reduce((acc, val) => acc * val);
    case 2: // Minimum
      return interpretAsOperator(reader)
        .reduce((a, b) => a < b ? a : b);
    case 3: // Maxmimum
      return interpretAsOperator(reader)
        .reduce((a, b) => a > b ? a : b);
    case 4:
      return interpretAsLiteral(reader);
    case 5: // Greater than
      return interpretAsOperator(reader)
        .reduce((a, b) => a > b ? 1 : 0);
    case 6: // Less than
      return interpretAsOperator(reader)
        .reduce((a, b) => a < b ? 1 : 0);
    case 7: // Equal to
      return interpretAsOperator(reader)
        .reduce((a, b) => a == b ? 1 : 0);
  }

  return version;
}



function interpretAsLiteral(reader) {
  let subPacket;
  let number = '';
  do {
    subPacket = reader.read(5);
    number += subPacket.slice(1);
  } while (subPacket[0] === '1');
  return parseInt(number, 2);
}

function interpretAsOperator(reader) {

  LengthBit = reader.read(1);
  let packetLengthBitsCount = LengthBit === '1' ? 11 : 15;
  let packetsLength = reader.read(packetLengthBitsCount);

  if (packetsLength === null || packetsLength.length !== packetLengthBitsCount)
    throw new Error('Error while parsing sub packet length of operator.')

  packetsLength = parseInt(packetsLength, 2)

  const packets = [];
  if (LengthBit === '1') {
    while (packetsLength-- > 0) {
      packets.push(evaluateTransmission(reader));
    }
  }
  else {
    const startIndex = reader.index;
    while (reader.index - startIndex < packetsLength) {
      packets.push(evaluateTransmission(reader));
    }
  }

  return packets;
}


// const reader = new BITS_Reader('input/day16-input-test.txt');
const reader = new BITS_Reader('input/day16-input.txt');

console.log('\n\n Evaluation of Transmission: ' + evaluateTransmission(reader) + '\n')