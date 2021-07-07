const Inout = new (require("../Inout"))("DailyCode --- Compare version numbers");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Amazon:

    Version numbers are strings that are used to identify unique states of software products. 
    A version number is in the format a.b.c.d. and so on where a, b, etc. are numeric strings separated by dots. 
    These generally represent a hierarchy from major to minor changes. Given two version numbers version1 and version2, conclude which is the latest version number. 
    
    Your code should do the following:
    If version1 > version2 return 1.
    If version1 < version2 return -1.
    Otherwise return 0.

    Note that the numeric strings such as a, b, c, d, etc. may have leading zeroes, and that the version strings do not start or end with dots. 
    Unspecified level revision numbers default to 0.

    Example:
    Input: 
    version1 = "1.0.33"
    version2 = "1.0.27"
    Output: 1 
    #version1 > version2

    Input:
    version1 = "0.1"
    version2 = "1.1"
    Output: -1
    #version1 < version2

    Input: 
    version1 = "1.01"
    version2 = "1.001"  ( <== Note: Convert 001 to a number so it will become 1 without leading zeroes )
    Output: 0
    #ignore leading zeroes, 01 and 001 represent the same number. 

    Input:
    version1 = "1.0"
    version2 = "1.0.0"
    Output: 0
    #version1 does not have a 3rd level revision number, which
    defaults to "0"
    Here's a starting point

    class Solution:
    def compareVersion(self, version1, version2):
        # Fill this in.

    version1 = "1.0.1"
    version2 = "1"
    print(Solution().compareVersion(version1, version2))
    # 1

*/


Inout.result_Converter = num => num == 0 ? 'The Versions are equal' : (num == 1 ? 'Version 1 is bigger' : 'Version 2 is bigger');
Inout.output_Converter = Inout.result_Converter;

Inout.push({
    version_1: '1.0.33',
    version_2: '1.0.27'
}, 1);

Inout.push({
    version_1: '0.1',
    version_2: '1.1'
}, -1);

Inout.push({
    version_1: '1.01',
    version_2: '1.001'
}, 0);

Inout.push({
    version_1: '1.0',
    version_2: '1.0.0'
}, 0);

Inout.push({
    version_1: '1.0.1',
    version_2: '1'
}, 1);

Inout.solvers = [compare_versions, compare_versions_2];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function compare_versions(version_1, version_2) {

    // Split the version numbers into partes and convert those to numbers.
    const v1 = version_1.split('.').map(v => v == '' ? 0 : parseInt(v));
    const v2 = version_2.split('.').map(v => v == '' ? 0 : parseInt(v));

    // Get both of them to the same length by appending zeroes to the one missing them.
    while (v1.length < v2.length) v1.push(0);
    while (v2.length < v1.length) v2.push(0);

    // Compare each number at each version level starting from the highest.
    for (let i = 0; i < v1.length; i++) {
        if (v1[i] > v2[i]) return 1;
        else if (v1[i] < v2[i]) return -1;
    }

    return 0;
}





function split_version(version) {

    const arr = [];
    let temp = 0;

    for (let c of version) {
        if (c !== '.') temp = temp * 10 + parseInt(c);
        else {
            arr.push(temp);
            temp = 0;
        }
    }

    arr.push(temp)
    return arr;
}


function compare_versions_2(version_1, version_2) {

    const v1 = split_version(version_1);
    const v2 = split_version(version_2);

    while (v1.length < v2.length) v1.push(0);
    while (v2.length < v1.length) v2.push(0);

    // Compare each number at each version level starting from the highest.
    for (let i = 0; i < v1.length; i++) {
        if (v1[i] > v2[i]) return 1;
        else if (v1[i] < v2[i]) return -1;
    }

    return 0;
}
