const Inout = new (require('../Inout'))('DailyCode --- Angles of a Clock');

/*
    Hi, here's your problem today. This problem was recently asked by Microsoft:

    Given a time in the format of hour and minute, calculate the angle of the hour and minute hand on a clock.

    def calcAngle(h, m):
    # Fill this in.

    print calcAngle(3, 30)
    # 75
    print calcAngle(12, 30)
    # 165

*/

Inout.input_stringConverter = arg => arg.h + 'h ' + arg.m + 'min';
Inout.output_stringConverter = Inout.result_stringConverter = arg => arg + '°';

Inout.push({ h: 3, m: 30 }, 75);
Inout.push({ h: 12, m: 30 }, 165);

Inout.solvers = [calcAngle_hourMinuteHand];
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function calcAngle_hourMinuteHand(h, m) {

    // hour_hand_per_hour: 360° / 12h = 30° per hour
    // hour_hand_per_minute: 30° / 60min = 0.5° per minute
    // minute_hand_angle_per_minute: 6°

    const angle_hourHand = 30 * h + Math.round(m * 0.5);
    const angle_minuteHand = 6 * m;

    const difference = Math.abs(angle_hourHand - angle_minuteHand);

    return difference > 180 ? 360 - difference : difference;
}

//const one_line = (h, m) => Math.min( Math.abs( (30 * h + Math.round(m * 0.5)) - 6*m ), 360 - Math.abs( (30 * h + Math.round(m * 0.5)) - 6*m ) );