class BitArray {

    // 128 ==> 0 -> 127
    constructor(bitCount = 128) {
        const byteCount = Math.ceil(bitCount / 8);

        this._bitArray = new Uint8Array(byteCount);
    }


    _getBucketIndex(bit) {
        if (Number.isNaN(bit)) throw new CustomError('Not a number');

        const bitBucket = Math.floor((bit / 8));

        if (bitBucket > this._bitArray.length)
            throw new CustomError('Index out of Range');

        return bitBucket;
    }

    isSet(bit) {
        const bitBucket = this._getBucketIndex(bit);

        const bitOffset = bit % 8;
        const bitMask = 0b1 << bitOffset;

        return (this._bitArray[bitBucket] & bitMask) !== 0b0;
    }

    updateBit(bit, value) {
        const bitBucket = this._getBucketIndex(bit);

        const bitOffset = bit % 8;
        const bitMask = 0b1 << bitOffset;

        if (value !== 0)
            this._bitArray[bitBucket] |= bitMask; // Set one bit at specific offset.
        else
            this._bitArray[bitBucket] &= (bitMask ^ 0b111111111); // Unset bit at spefific offset.
   
    }

    setBit(bit) {
        return this.updateBit(bit, 1);
    }

    unsetBit(bit) {
        return this.updateBit(bit, 0);
    }

}


module.exports = {
    BitArray
}