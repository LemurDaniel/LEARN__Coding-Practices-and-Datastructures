const fs = require('./day20-part1');

const tile_dict = fs.tile_dict;
const border_dict = fs.border_dict;

//Image is quadratic
// determine dimensions for 2D array
const len = Object.keys(tile_dict).length;
const dimension = Math.sqrt(len);

// initialize array
const arrangement = [];
for(let i=0; i<dimension; i++){
  const row = [];
  for(let i2=0; i2<dimension; i2++){
    row.push('');
  }
  arrangement.push(row);
}



Object.values(tile_dict).forEach(tile => {
  if(tile.is_flipped) console.log(tile);
})

// assume this is the rightmost corner
const up_left = tile_dict[1951];
//console.log(up_left)

// go left
for(let i=0; i<1; i++){

  //go right
  for(let i2=0; i2<dimension; i2++){
    
  }
}