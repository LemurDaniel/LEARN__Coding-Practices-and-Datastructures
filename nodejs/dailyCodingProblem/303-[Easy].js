const Inout = new (require("../Inout"))("Daily Coding Problem --- Determine angle between minute and hour hand");
const fs = require("fs");
const readline = require('readline');
const Helper = require("../Helper");

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Microsoft.

    Given a clock time in hh:mm format, determine, to the nearest degree, the angle between the hour and the minute hands.

    Bonus: When, during the course of a day, will the angle be zero?

    Only on 0:00 is the angle zero.
    On all other occasions like 1:15, the hourhand is moved a little bit due to the minute hand angle.

    Mathematical approach:

    minuteAngle = m * 6°;
    hourAngle = h * 30° + m * 0.5°;

    6m          = 30h + 0.5m;
    6m - 0.5m   = 30h;
    m(6 - 0.5)  = 30h;
    5.5m        = 30h; [5.5 ==> 11/2]
    m           = 30h / (11/2)
    m           = h* 30*2/11M
    m           = h* (60/11)

    m is valid for all whole numbers in the interval [0,59];
    h is valid for all whole numbers in the interval [0,11];

    The expression only evaluates as true with both variables being assigned to values of their respective intervals, when h = 0 and therefore m = 0;

    If h = 11 then m evaluates to 60, which translates in terms of a clock to: 11:60 ==> 12:00 or 0:00
*/

Inout.result_Equals = (out, res) => (typeof res === 'object' && res.degrees === out) || res === out;

Inout.push('3:30', 75);
Inout.push('12:30', 165);
Inout.push('1:00', 30);
Inout.push('6:00', 180);
Inout.push('10:44', Inout.static.None);


Inout.solvers = [getAngleOfClock]

Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function getAngleOfClock(time) {

    const TAU = Math.PI * 2;
    const [hours, minutes] = time.split(':').map(v => parseInt(v));


    const minuteAngle = TAU / 60 * minutes;
    const hourAngle =
        TAU / 12 * hours +
        TAU / (12 * 60) * minutes;

    // Modulo TAU in case of 12 hours when timeformat is 24 hours instead of 12am/pm.
    const difference = Math.abs(hourAngle % TAU - minuteAngle);
    // If the value is greate than the difference, the opposite angle is found by module PI.
    // Doing modulo PI on all times will get the right result for every times except 6:00,
    // because its angle is exactly 180° and will be divided into 0°.
    const angle = difference > Math.PI ? difference % Math.PI : difference;

    return {
        radians: angle,
        degrees: angle / TAU * 360,
    }
}
