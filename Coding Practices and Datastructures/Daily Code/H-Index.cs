using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Amazon:

        The h-index is a metric that attempts to measure the productivity and citation impact of the publication of a scholar. The definition of the h-index is if a scholar has at least h of their papers cited h times.

        Given a list of publications of the number of citations a scholar has, find their h-index.

        Example:
        Input: [3, 5, 0, 1, 3]
        Output: 3
        Explanation:
        There are 3 publications with 3 or more citations, hence the h-index is 3.

        */
    class H_Index : Testable
    {
        public class InOut : St_InOuts.IntArr_Primary<int>
        {
            public InOut(string s, int i) : base (s, i, true)
            {

                AddSolver(Array_Solver);
                AddSolver(Array_Solver_ConstantSpace);
                HasMaxDur = false;
            }
        }

        public H_Index()
        {
            testcases.Add(new InOut("3,5,0,1,3",3));
        }



        //SOL
        /*
         * H-Index can't be bigger than the arraylength:
         * Ergebnismenge E => h ∈ [0, arraylenght[ & h ∈ N
         * Ergebnismenge E = {h | 0 <= x < arrLen} & {h | N} 
         * 
         * Schritte:
         * 1. Ergebnisarray derselben Länge erstellen. [0, 1, 2, 3, 4] (Jede Zahl steht für einen möglichen H-Index, Anzal an jeder Stelle, steht für die Anzahl an Publikationen mit entsprechender Anzahl an Zitierungen)
         * 2. Alle Publikationen mit x <= 4 Zitierungen werden in Stelle 4 aggregiert
         *    Alle anderen an der entsprechenden Stelle im Array
         *    Erster Durchgang benötigt n Durchläufe für n = arraylänge
         * 
         * 3. Ergebnissarray wird vom letzen bis zum ersten index durchlaufen, dabei wird die vorherige Anzahl auf die nächste aufaddiert
         *    Gilt an einer Stelle: Anzahl Publikationen mit Zitierungen(x) e >= H-Index => Durchlauf wird abgebrochen, da der H-Index nun feststeht.
         */
    public static void Array_Solver(int[] arr, InOut.Ergebnis erg) => erg.Setze(Array_Solver(arr), Complexity.LINEAR, Complexity.LINEAR);
        public static int Array_Solver(int[] arr)
        {
            int[] hIndex = new int[arr.Length]; //Ergebnisarray

            foreach (int x in arr) hIndex[Math.Min(x, hIndex.Length - 1)]++;    //Schritt 2

            for (int i = hIndex.Length - 1, hDex = hIndex[i]; i >= 0; i--, hDex += hIndex[i]) if (hDex >= i || i == 0) return i; // Schritt 3 //One Liner ;)

            return -5; // Will never happen but compiler needs it
        }


        /*
         * Gleiche wie oben nur wird die Werte des H-Index-Arrays nicht in einem separaten, sondern im Inputarray gespeichert.
         * 
         * Herausforderung: Wie speichert man die Werte ohne die noch benötigten zu überschreiben ?
         * Lösung: Kodierung als Division mit Rest => x ist Ganz dividierbare Zahl und e ist Restwert
         * 
         * e => Ergebniswert (Anzahl der Publikationen mit entsprechender Zitierungsanzahl)
         * x => Ursprungswert (Anzahl der Zitierungen einer Publikation)
         * k => kodierter Wert
         * 
         * Lösung:
         * Zu speichernder Ergebniswert 'x' an einer Stelle liegt im Intervall [0, arrLen[
         * Ergebniswerte werden kodiert mit Ursprungswerten abgespeichert
           Kodierte Werte werden als Negative Zahlen gekennzeichnet
         * 
         * Kodierung: k = (x * arrLen + e) *-1
         * E herausberechnen: e = Math.abs(k) % arrLen
         * U herausberechnen: u = Math.abs(k) / arrLen
         */
        public static void Array_Solver_ConstantSpace(int[] arr, InOut.Ergebnis erg) => erg.Setze(Array_Solver_ConstantSpace(arr), Complexity.LINEAR, Complexity.CONSTANT);
        public static int Array_Solver_ConstantSpace(int[] arr)
        {
            foreach (int z in arr)
            {
                int x = z >= 0 ? z : Math.Abs(z) / arr.Length; // Herausfiltern der Werte bei Kodierung

                //Anzahl der Publikationen mit entsprechender Zitierungen an korrekter Stelle im Array inkrementieren
                int pos = Math.Min(x, arr.Length - 1); // Position die Inkrementiert werden soll

                // if kleiner 0 bereits kodiert, andernfall kodiert speichern
                if (arr[pos] < 0) arr[pos]--;   //1 Subtrahieren, da alle Kodierten Werte negativ sind => Subtrahieren entspricht daher addieren
                else arr[pos] = -1 * (arr[pos] * arr.Length + 1);   //+1 da eine Publikation an entsprechender Stelle gefunden
            }

            for (int i = arr.Length - 1, hDex = 0; i >= 0; i--)
            {
                hDex += arr[i] > 0 ? 0 : Math.Abs(arr[i]) % arr.Length; // Wenn größer Null => Stelle wurde niemals besetzt, da keinee entsprechenden Publikationen gefunden wurden ergo 0
                if (hDex >= i || i == 0) return i; // Schritt 3 //One Liner ;)
            }

            return -5; // Will never happen but compiler needs it
        }
    }
}
