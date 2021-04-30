const Inout = new (require ('../Inout'))('DailyCode --- Angles of a Clock');

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

Inout.map_input = (input, solver) => solver(input[0], input[1]); 
Inout.input_string_converter = arg => arg[0] + 'h ' + arg[1] + 'min';
Inout.output_string_converter = Inout.result_string_converter = arg => arg+'°';

Inout.testcases.push({  input: [3, 30], output: 75 });
Inout.testcases.push({  input: [12, 30], output: 165 });

Inout.solvers = [calc_angle_between_hour_and_minute_hand];
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function calc_angle_between_hour_and_minute_hand(h, m){

    // hour_hand_per_hour: 360° / 12h = 30° per hour
    // hour_hand_per_minute: 30° / 60min = 0.5° per minute
    // minute_hand_angle_per_minute: 6°

    const angle_hour_hand = 30 * h + Math.round(m * 0.5);
    const angle_minute_hand =  6 * m;

    const difference = Math.abs(angle_hour_hand - angle_minute_hand);

    return difference > 180 ? 360 - difference : difference;
}