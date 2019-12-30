using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Primes : Testable
    {
        public class InOut : St_InOuts.TwoIntArr
        {
            public InOut(int n, string o) : base( n+",1", o, true, false, false)
            {
                AddSolver(SearchAllPrimes);
               inputStringConverter = arg => "Eingabe: " + arg[0];
                HasMaxDur = false;
            }
        }

        public Primes()
        {
            testcases.Add(new InOut(14, "2,3,5,7,11,13"));
        }

        public static void SearchAllPrimes(int[] arr, InOut.Ergebnis erg) => SearchAllPrimes(arr[0], erg);

        public static void SearchAllPrimes(int n, InOut.Ergebnis erg)
        {
            List<int> primes = new List<int>();
            int cycles = 0;
            for (; n > 0; n--) if (Primes.CheckIfPrime(n, ref cycles)) primes.Add(n);

            erg.Setze( primes.ToArray(), cycles, Complexity.QUADRATIC , Complexity.LINEAR );
        }

        private static bool CheckIfPrime(int num, ref int cycles)
        {
            cycles++;
            if (num <= 1) return false;
            //The only even prime number is 2. All other even numbers can be divided by 2.
            if (num == 2 || num == 3 || num == 5 || num == 7) return true;
            if (num % 2 == 0) return false;

            //No prime number greater than 5 ends in a 5. Any number greater than 5 that ends in a 5 can be divided by 5.
            if (num % 5 == 0) return false;

            // Double the last digit and subtract it from the rest of the number. If the answer is divisible by 7, the original number will be divisible by 7
            int lastDigitDoubled = num % 10 * 2;
            if ((num/10 - lastDigitDoubled) % 7 == 0) return false;

            // If the sum of the digits is divisible by 3, the number will be divisible by 3
            int sum = num % 10, tmp = num;
            while (true)
            {
                cycles++;
                if (tmp < 10) break;
                tmp /= tmp;
                sum += tmp % 10;
            }
            if (sum % 3 == 0) return false;

            // Check all number division from 0 to n / 2
            for (int i = 2; i < num / 2; i++) if (num % i == 0) return false;
            return true;
        }
    }
}
