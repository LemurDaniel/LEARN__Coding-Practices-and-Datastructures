const fs = require('fs');
const { Readable } = require('stream');

class BITS_Reader extends Readable {
  constructor(path) {
    super({ encoding: 'utf-8' });
    this.path = path;
    this.file = null;
    this.bitCounter = 0;
  }
  _construct(callback) {
    fs.open(this.path, (err, file) => {
      if (err) {
        callback(err);
      } else {
        this.file = file;
        callback();
      }
    });
  }
  _read() {
    let bytes = 16;
    const buffer = Buffer.alloc(bytes);
    fs.read(this.file, buffer, 0, bytes, null, (err, bytesRead) => {
      if (err)
        this.destroy(err);
      else if (bytesRead <= 0)
        this.push(null);
      else {
        const data = buffer.slice(0, bytesRead).toString('binary');
        console.log('   #### Fetched data: ' + data.toString('binary'), ' (' + bytesRead + ' chars) ######')
        const bits = data.split('')
          .map(char => (parseInt(char, 16) ^ 0b10000)
            .toString(2).substring(1).split('')
          );
        this.push(bits.flat().join(''));
      }
    });
  }
  _destroy(err, callback) {
    if (this.file) {
      fs.close(this.file, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }

  read(bits) {
    this.bitCounter = (this.bitCounter + bits) % 4;
    return super.read(bits);
  }
  clearExtraBits() {
    super.read(4 - this.bitCounter);
    this.bitCounter = 0;
  }
}

const reader = new BITS_Reader('input/day16-input-test.txt');


reader.on('readable', () => {

  const version = reader.read(3);
  if (version === null) return null; // Stream ended.
  if (version === '000') return reader.clearExtraBits();

  const typeId = reader.read(3);
  if (version.length !== 3 || typeId === null | typeId.length !== 3) throw new Error('adadadsasd')

  console.log('\n ---- Process new Packet --- Version: ' + parseInt(version, 2) + ' ---- \n')
  console.log(version, typeId)
  if (typeId === '100')
    interpretAsLiteral(reader);
  else
    interpretAsOperator(reader, reader.read(1))

});

reader.on('close', e => console.log('Processed'))


function interpretAsLiteral(reader) {
  let subPacket;
  let number = '';
  do {
    subPacket = reader.read(5);
    number += subPacket.slice(1);
  } while (subPacket[0] === '1');
  reader.clearExtraBits();
  console.log(number + ' ==> ' + parseInt(number, 2))
}

function interpretAsOperator(reader, LengthBit) {

  if (LengthBit === null) return;
  let packetLengthBitsCount = LengthBit === '1' ? 11 : 15;
  let packetsLength = reader.read(packetLengthBitsCount);

  if (packetsLength === null || packetsLength.length !== packetLengthBitsCount)
    throw new Error('Error while parsing sub packet length of operator.')

  console.log(LengthBit, packetsLength)
  packetsLength = parseInt(packetsLength, 2)
  console.log(packetsLength)

  if (packetsLength > 300) return
  let subPacket = 0;
  if (LengthBit === '1') {
    while (packetsLength-- > 0) {
      subPacket = reader.read(11)
    }
  }
  // D2FE2800EE00D40C823060
  else {
    while (packetsLength > 0) {
      subPacket = reader.read(11);
      packetsLength -= 11;
      if (packetsLength < 11) {
        subPacket += reader.read(packetsLength);
        packetsLength = 0;
      }
    }
  }
}