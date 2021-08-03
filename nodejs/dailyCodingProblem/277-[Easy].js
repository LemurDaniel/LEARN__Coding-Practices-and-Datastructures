const Inout = new (require("../Inout"))("Daily Coding Problem --- Validate UTF-8 encoding");
const { StringDecoder } = require("string_decoder");
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Google.

    UTF-8 is a character encoding that maps each symbol to one, two, three, or four bytes.

    For example, the Euro sign, €, corresponds to the three bytes 11100010 10000010 10101100. The rules for mapping characters are as follows:

    For a single-byte character, the first bit must be zero.
    For an n-byte character, the first byte starts with n ones and a zero. The other n - 1 bytes all start with 10.
    Visually, this can be represented as follows.

    Bytes   |           Byte format
    -----------------------------------------------
    1     | 0xxxxxxx
    2     | 110xxxxx 10xxxxxx
    3     | 1110xxxx 10xxxxxx 10xxxxxx
    4     | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
    Write a program that takes in an array of integers representing byte values, and returns whether it is a valid UTF-8 encoding.

*/

const UTF_8_MASK = [
    0b10000000,
    0b11100000,
    0b11110000,
    0b11111000
]

const UTF_8_BYTE = [
    0b00000000,
    0b11000000,
    0b11100000,
    0b11110000
]


Inout.input_stringConverter = arg => Helper.default_StringConverter(
    {
        UTF_8_Sequence: arg.map(b => '0b' + (b | 0b100000000).toString(2).substr(1)),
        UFT_8_Decoded: (new StringDecoder('utf-8')).write(Buffer.from(arg))
    }
)

Inout.push('&AR 0b00000000', true);
Inout.push('&AR 0b00000011', true)
Inout.push('&AR 0b00000000 0b10000000', false)
Inout.push('&AR 0b11000000 0b10000000', true)
Inout.push('&AR 0b11000000 0b00000000', false)
Inout.push('&AR 0b11100010 0b10000010 0b10101100', true)
Inout.push('&AR 0b11110000 0b10110000 0b10000010 0b10010001', true)
Inout.push('&AR 0b11110000 0b10110000 0b10000010 0b10010001 0b10010001', false)

Inout.solvers = [validateUTF_8, validateUTF_8_2]
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function validateUTF_8(list) {

    if (list.length > 4) return false;
    if (list.length === 0) return false;

    // Check first byte in sequence
    const FirstByteMask = UTF_8_MASK[list.length - 1];
    const FirstByteValid = UTF_8_BYTE[list.length - 1];

    const FirstByte = list[0] & FirstByteMask;
    if (FirstByte !== FirstByteValid) return false;


    // Check remaining n-1 bytes.
    const MASK = 0b11000000;
    const VALID = 0b10000000;

    for (let i = 1; i < list.length; i++) {
        const byte = list[i] & MASK;
        if (byte !== VALID) return false;
    }

    return true;
}


function validateUTF_8_2(list) {

    const len = list.length;
    if (len === 0) return false;

    const FirstByteMask =
        0b11111111 << (7 - (len === 1 ? 0 : len));
    const FirstByteValid =
        (FirstByteMask << 1) & 0b11111111; // Only use first 8 bytes of mask.

    const FirstByte = list[0] & FirstByteMask;
    if (FirstByte !== FirstByteValid) return false;


    // Check remaining n-1 bytes.
    const MASK = 0b11000000;
    const VALID = 0b10000000;

    for (let i = 1; i < list.length; i++) {
        const byte = list[i] & MASK;
        if (byte !== VALID) return false;
    }

    return true;
}