using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Two_Pointers
{
    class Find_the_Duplicate_Number : Testable
    {
        /*
         * Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive),
         * Assume that there is only one duplicate number, find the duplicate one.
         * 
         * NOTE
         *      -   You must not modify the array (assume array is readonly)
         *      -   You must only use constant, O(1) extra space
         *      -   Your runtime complexity should be less than O(n2)
         * 
         * 
         */
        public class InOut : InOutBase<int[], int>
        {
            public InOut(int n, int duplicate) : base(Convert(n, duplicate), duplicate, true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe("Eingabe: ", arg, true);
                outputStringConverter = arg => "Duplikat: " + arg;

                AddSolver(Array_Solver_ConstantSpace);
            }
            public InOut(string n, int duplicate) : base(Helfer.Assemble(n), duplicate, true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe("Eingabe: ", arg, true);
                outputStringConverter = arg => "Duplikat: " + arg;

                AddSolver(Array_Solver_ConstantSpace);
            }
            public static int[] Convert(int n, int duplicate)
            {
                duplicate = Math.Max(1,Math.Min(n, duplicate));
                int[] arr = new int[n + 1];
                for (int i = 0; i < arr.Length - 1; i++) arr[i] = i + 1;
                arr[n] = duplicate;
                return Helfer.ArrayShuffle(arr);
            }
        }

        public Find_the_Duplicate_Number()
        {
            testcases.Add(new InOut(5, 2));
            testcases.Add(new InOut(25, 8));
            testcases.Add(new InOut(15, 3));
            testcases.Add(new InOut(6, 4));
            testcases.Add(new InOut(11, 9));
            testcases.Add(new InOut(10, 1));
            testcases.Add(new InOut(14, 5));
        }
        //SOL

        /* n => Obergrenze (Arraylänge - 1, Da Array alle Zahlen von 1 - n  und eine zusätzliche 1 entählt)
         * ew => erwartete Zahl
         * eg => ergebins Zahl
         * x => gesuchte Zahl
         * 
         * 
         * Das Array enthält alle Zahlen im Intervall [1, n] einmal plus eine doppelt
         * Addiert und subtrahiert man alle Zahlen in einem Sortierten Array abwechselnd, so kann man die erwartete Zahl für n berechnen
         * Geht man durch das Array und wendet diese Regel an, so ist das Ergebnis: |eg| = ew + x;
         * Subtrahiert man nun die erwartete Zahl so erhält man die Gesuchte: |eg - ew| = x;
         * 0
            +1 ==> 1
            -2 ==> -1
            +3 ==> 2
            -4 ==> -2
            +5 ==> 3
            -6 ==> -3
            +7 ==> 4
            -8 ==> -4
            +9 ==> 5
            -10 ==> -5
            +11 ==> 6
            -12 ==> -6
            +13 ==> 7
            -14 ==> -7
            +15 ==> 8
            -16 ==> -8
            -16(doppelte Zahl) ==> -24

            ew = -8
            eg = -24
            x = |-24 - -8| = |-24 + 8| = |-16| = 16


             Da das Array nicht sortiert ist muss der Algorithmus leicht abgeändert werden:
             -  Alle Ungeraden Zahlen werden addiert
             -  Alle Geraden Zahlen subtrahiert

            Zur Berechnung von ew sind folgende Regeln zu beachten
            Regel 1:
                - Ist n gerade so ist ew negativ
                - Ist n ungerade so ist ew positiv
            Regel 2:
                - |ew| = ceil( n / 2 ) 
                - oder auch möglich (ungerade Zahlen auf die nächste Gerade aufrunden):
                - |ew| = (n % 2 == 0 ? n : n+1) / 2;
                |ew| => Betrag von ew => ist dasselbe wie Math.abs(ew)

            Mögliche Berechnung ew nach beiden Regeln:
            ew = ( n % 2 == 0 ? n * -1 : n + 1 ) / 2;

            Der Algoritmus läuft in:
                Timecomplexity O(n) => ein Durchlauf des Arrays
                Spacecomplexity O(1) => Konstant
         */
        public static void Array_Solver_ConstantSpace(int[] arr, InOut.Ergebnis erg)
        {
            int n = arr.Length - 1;
            int ew = (n % 2 == 0 ? n * -1 : n + 1) / 2; //Absoluter Erwarteter Betrag

            int eg = 0; // Ergebnisbetrag;
            foreach (int z in arr) eg += (z % 2 == 0 ? -z : z);

            erg.Setze(Math.Abs(eg - ew), Complexity.LINEAR, Complexity.CONSTANT);
        }

    }
}
