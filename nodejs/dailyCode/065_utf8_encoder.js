const Inout = new (require('../Inout'))('DailyCode --- Find non duplicate number')
const { BinaryTree } = require('../datastructures/bTree');
const { CustomError } = require('../Helper');
const Helper = require('../Helper');


/*

   Hi, here's your problem today. This problem was recently asked by Microsoft:

    A UTF-8 character encoding is a variable width character encoding that can vary from 1 to 4 bytes depending on the character. The structure of the encoding is as follows:
    1 byte:  0xxxxxxx
    2 bytes: 110xxxxx 10xxxxxx
    3 bytes: 1110xxxx 10xxxxxx 10xxxxxx
    4 bytes: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
    For more information, you can read up on the Wikipedia Page.

    Given a list of integers where each integer represents 1 byte, return whether or not the list of integers is a valid UTF-8 encoding.

    BYTE_MASKS = [
        None,
        0b10000000,
        0b11100000,
        0b11110000,
        0b11111000,
    ]
    BYTE_EQUAL = [
        None,
        0b00000000,
        0b11000000,
        0b11100000,
        0b11110000,
    ]

    def utf8_validator(bytes):
    # Fill this in.

    print utf8_validator([0b00000000])
    # True
    print utf8_validator([0b00000000, 10000000])
    # False
    print utf8_validator([0b11000000, 10000000])
    # True

*/

BYTE_MASKS = [
    undefined,
    0b10000000,
    0b11100000,
    0b11110000,
    0b11111000,
]
BYTE_EQUAL = [
    undefined,
    0b00000000,
    0b11000000,
    0b11100000,
    0b11110000,
]

Inout.input_stringConverter = arg => Helper.default_StringConverter(
    arg.map(v => '0b' + (v | 0b100000000).toString(2).substr(1))
);

Inout.push('&AR 0b00000011', true)
Inout.push('&AR 0b00000000 0b10000000', false)
Inout.push('&AR 0b11000000 0b10000000', true)
Inout.push('&AR 0b11000000 0b00000000', false)
Inout.push('&AR 0b11110000 0b10110000 0b10000010 0b10010001', true)
Inout.push('&AR 0b11110000 0b10110000 0b10000010 0b10010001 0b10010001', new CustomError('Too Many Bytes'))

Inout.solvers = [utf8_validator];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function utf8_validator(list) {

    if (list.length > 4)
        throw new CustomError('Too Many Bytes')

    const utf8Mask = BYTE_MASKS[list.length];
    const utf8Byte = BYTE_EQUAL[list.length];

    // Check if mask of first byte fits.
    if (utf8Byte !== (list[0] & utf8Mask)) return false;

    // Check of remaining bytes fit the 10xxxxxxx pattern.
    for (let i = 1; i < list.length; i++) {

        const byte = list[i] & 0b11000000;
        if (byte !== 0b10000000) return false;
    }

    return true;
}