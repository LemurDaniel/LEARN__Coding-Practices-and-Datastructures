const fs = require('fs');

const file = fs.readFileSync('./input/day04-input.txt', 'utf-8').split('\n\r');
let batches = [];

file.forEach(el => batches.push(el.split('\n').join(' ').split('\r ').join(' ').replace('\r', '')));


// Start Solving

// KEY => field | VALUE => optional
const OPTIONAL = { cid: true }
const FIELDS = "byr,iyr,eyr,hgt,hcl,ecl,pid,cid".split(',');

function batch_to_passport(batch) {

  let passport = {};
  batch.split(' ').forEach(field => {
    const tmp = field.split(':');
    passport[tmp[0]] = tmp[1];
  })

  return passport;
}


/*
byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
*/
console.log(batches)

const VALID = {
  byr: y => parseInt(y) >= 1920 && parseInt(y) <= 2002,
  iyr: y => parseInt(y) >= 2010 && parseInt(y) <= 2020,
  eyr: y => parseInt(y) >= 2020 && parseInt(y) <= 2030,
  hcl: c => c.match('^#[0-9a-f]{6}$') !== null,
  ecl: c => 'amb blu brn gry grn hzl oth'.includes(c),
  pid: id => id.match('^[0-9]{9}$') !== null,
  cid: id => true,
  hgt: n => {
    if (n.match('^[1-9][0-9]{2}cm$')) {
      let num = parseInt(n.substring(0, 3));
      return num >= 150 && num <= 193;
    }
    if (n.match('^[1-9][0-9]in$')) {
      let num = parseInt(n.substring(0, 2));
      return num >= 59 && num <= 76;
    }
    return false;
  }
}

function check_if_valid(passport) {

  for (let i = 0; i < FIELDS.length; i++) {

    const f = FIELDS[i];
    if (!OPTIONAL[f] && !passport[f]) return false;
    else if (!OPTIONAL[f] && !VALID[f](passport[f])) return false;
  }
  return true;
}



let count = 0;
batches.forEach(batch => count += (check_if_valid(batch_to_passport(batch))));
console.log("Valid Passports: " + count);
