using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Angles_of_a_Clock : Testable
    {
        public class InOut : InOutBase<int[], int>
        {
            public InOut(int hour, int min, int erg) : base(new int[] { hour, min }, erg, true)
            {
                inputStringConverter = arg => "Hour: " + hour + "\nMinute: " + min;

            }
        }

        public Angles_of_a_Clock()
        {
            testcases.Add(new InOut(3, 30, 75));
            testcases.Add(new InOut(12, 30, 165));
        }


        //SOL
        public static void calcAngle(int[] arr, InOut.Ergebnis erg) => erg.Setze(calcAngle(arr[0], arr[1]), Complexity.CONSTANT, Complexity.CONSTANT);
        /*
         * 1. Calculate Angle of Hour Hand
         * 360° / 12hours => Hour Hand Moves 30° per hour
         * 30° / 60Minutes => Hour Hand Moves 0.5° per Minute
         * 
         * 2. Calculate Angle of Minute Hand
         * 360° / 60Minutes => Minute Hand Moves 6° per Minute
         * 
         * 3. Calculate Difference
         * Angle = Math.Abs(<MinuteHand - <HourHand)
         * 
         * 4. Get Smallest Angel
         * if (Angle > 180) Angle = 360 - Angle
         * 
         */
         public static int calcAngle(int hour, int min)
        {
            //1. / 2. Calc Angles
            int hourAngle = 30 * hour + (int) (min * 0.5); // 30° per hour + 0.5° per minute; Half degrees are rounded Down
            int minAngle = min * 6; // 6° per min;

            //3. Difference
            int angle = Math.Abs(hourAngle - minAngle);
            //4. Get Smallest Angle
            return angle <= 180 ? angle : 360 - angle;  
        }
    }
}
