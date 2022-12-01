const fs = require('fs');

const file = fs.readFileSync('./input/day04-input.txt', 'utf-8').split('\n\r');
let batches = [];

file.forEach(el => batches.push(el.split('\n').join(' ')));

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


function check_if_valid(passport) {

  for (let i = 0; i < FIELDS.length; i++) {
    // check if optional and if exists
    if (!OPTIONAL[FIELDS[i]] && !passport[FIELDS[i]]) {
      return false;
    }
  }
  return true;
}





let count = 0;
batches.forEach(batch => count += (check_if_valid(batch_to_passport(batch))));
console.log("Valid Passports: " + count);
