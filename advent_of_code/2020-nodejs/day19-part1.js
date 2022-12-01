const fs = require('fs');

const file = fs.readFileSync('./input/day19-input.txt', 'utf-8').split('\r\n\r\n');
const rule_data = file[0].split('\r\n');
const mess_data = file[1].split('\r\n');

console.log(mess_data);

//const file = '0: 4 1 5,1: 2 3 | 3 2,2: 4 4 | 5 5,3: 4 5 | 5 4,4: "a",5: "b",ababbb,bababa,abbbab,aaabbb,aaaabbb'.split(',');s
const rule_set = {}

for (let i = 0; i < rule_data.length; i++) {

  const s1 = rule_data[i].split(':');
  const key = s1[0]; // rulekey
  const is_char = s1[1].match('a|b');

  if (is_char) rule_set[key] = is_char[0];
  else {
    rule_set[key] = [];
    sub_rules = s1[1].split('|');
    sub_rules.forEach(sr => {
      rule_set[key].push(sr.trim().split(' '));
    });
  }
}
console.log(rule_set)

/////

function check_rule(mess, indx, rule, depth) {
  //if(!Array.isArray(rule)) console.log(mess+ '  ' + indx + '   ' + rule);
  //if(!Array.isArray(rule)) console.log(mess[indx] === rule)
  if (!Array.isArray(rule)) return [mess[indx] == rule, indx + 1];

  if (!depth) depth = 0;
  let res = [false, indx];
  for (let i = 0; i < rule.length; i++) {
    //console.log(rule[i])
    const indx_sav = indx;
    for (let i2 = 0; i2 < rule[i].length && indx < mess.length; i2++) {
      res = check_rule(mess, indx, rule_set[rule[i][i2]], depth + 1);
      if (res[0]) indx = res[1];
      else {
        indx = indx_sav;
        break;
      }
    }
    //console.log(depth+ ': '+(depth == 0 && indx == mess.length) + ' ' +indx)
    if (res[0]) {
      if (depth != 0 || (depth == 0 && indx == mess.length)) return [true, indx];
      //else if(depth == 0) return check_rule(mess, indx, rule_set[0], 0);
    }
  }
  return false;
}


let matches_count = 0;
for (let i = 0; i < mess_data.length; i++) {
  const m = mess_data[i].trim();
  const matches = check_rule(m, 0, rule_set[0]);
  if (matches[0]) matches_count++;
  console.log(m + ': ' + matches);
}

console.log(matches_count + ' messages match rule 0 completley');