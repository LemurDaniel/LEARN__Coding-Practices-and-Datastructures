const Inout = new (require("../Inout"))("Daily Coding Problem --- Fid all stepwords");
const { CustomError } = require("../Helper");
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Pivotal.

    A step word is formed by taking a given word, adding a letter, and anagramming the result. 
    For example, starting with the word "APPLE", you can add an "A" and anagram to get "APPEAL".

    Given a dictionary of words and an input word, create a function that returns all valid step words.

*/


Inout.push({ word: 'Apple', dict: '&FS ./dailyCode/038_words.txt &AR' }, () => true);
Inout.push({ word: 'Apple', dict: '&FS ./dailyCode/038_41.284_words.txt &AR' }, () => true);
Inout.push({ word: 'pot', dict: '&FS ./dailyCode/038_41.284_words.txt &AR' }, () => true);

Inout.solvers = [getAllStepWords]
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function getAllStepWords(word, dict) {

    const characters = {};

    for (const char of word.toLowerCase()) {
        if (!(char in characters))
            characters[char] = 1;
        else
            characters[char] += 1;
    }


    return dict
        .filter(w => w.length === word.length + 1)
        .filter(word => {

            let oneFreeCharIsSet = false;
            const localChars = { ...characters };

            for (const char of word) {

                if (!(char in localChars)) {
                    if (oneFreeCharIsSet) return false;
                    else oneFreeCharIsSet = true;
                }

                else if (--localChars[char] === 0)
                    delete localChars[char];

            }

            return true;

        });

}