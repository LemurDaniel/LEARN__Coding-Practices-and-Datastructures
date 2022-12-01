const fs = require('fs');

const file = fs.readFileSync('./input/day20-input-test.txt', 'utf-8').split('\r\n\r\n');


const Tile = function (id, data) {
  // data is an array of strings
  // each array is a line of pixels top to bottom
  this.id = id;
  this.image = [];

  // create image without borders
  for (let i = 1; i < data.length - 1; i++) {
    this.image.push(data[i].substring(1, data[i].length - 1));
  }

  this.borders = ['', '', '', '']; // up, down, left, right 
  this.borders[0] = data[0];
  this.borders[1] = data[data.length - 1];

  data.forEach(line => {
    this.borders[2] = this.borders[2] + line[0];
    this.borders[3] = this.borders[3] + line[line.length - 1];
  });

  this.rotate = 0;
  this.is_corner = false;
  this.is_flipped = false;
  this.is_corner_up_left = false;
  this.is_corner_down_left = false;
  this.is_corner_up_right = false;
  this.is_corner_down_right = false;

  this.s_tiles = {}; // surrounding_tiles: up, down, left, right
  this.clip_tile = (id, typ, typ2, fp) => {
    this.s_tiles[typ] = { id: id, typ: typ2, flipped: fp };
    if (fp) this.is_flipped = true;
    const st = this.s_tiles;
    // left, up not set ==> up, left corner
    this.is_corner_up_left = (!(2 in st) && !(0 in st));
    // left, down not set ==> up, left corner
    this.is_corner_down_left = (!(2 in st) && !(1 in st));
    // right, up not set ==> up, left corner
    this.is_corner_up_right = (!(3 in st) && !(0 in st));
    // right, down not set ==> up, left corner
    this.is_corner_down_right = (!(3 in st) && !(1 in st));

    this.is_corner = Object.keys(st).length == 2;
  }
}

// dictionary for all files
const tile_dict = {};
// maps matching borders
const dict = {};


// generate tile objects
file.forEach(data => {
  const arr = data.split(':\r\n');
  const id = arr[0].match('[0-9]{4}')[0];
  const tile_data = arr[1].split('\r\n');

  tile_dict[id] = (new Tile(id, tile_data));
})


// map borders of tiles
Object.values(tile_dict).forEach(tile => {

  for (let i = 0; i < 4; i++) {
    const border = tile.borders[i]; // 0:up, 1:down, 2:left, 3:right
    const flipped = border.split("").reverse().join("");

    const bd_dict = dict[border];
    const fp_dict = dict[flipped];

    // if no match in dict AND border of tile not already matched, put in dict
    if (!(i in tile.s_tiles) && !bd_dict && !fp_dict) {
      dict[border] = { id: tile.id, bordertyp: i, flipped: false };
      continue;
    }


    // if match, set it in tile object
    const fp = (fp_dict ? true : false);
    const border2 = (fp ? fp_dict : bd_dict);
    const border1 = { id: tile.id, bordertyp: i, flipped: fp };

    tile_dict[border1.id].clip_tile(border2.id, border1.bordertyp, border2.bordertyp, fp);
    tile_dict[border2.id].clip_tile(border1.id, border2.bordertyp, border1.bordertyp, fp);

    // remove matched from dict
    delete dict[border];
    delete dict[flipped];
  }
});


//All remaining in dict are corners or edges
//dict
let product = 1;
Object.values(tile_dict).forEach(tile => {
  if (tile.is_corner) product *= tile.id;
})



console.log('The product of all corner ids is: ' + product);

exps = {};
exps.tile_dict = tile_dict;
exps.border_dict = dict;
exps.Tile = Tile;
module.exports = exps;
