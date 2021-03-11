using System;
using System.Collections.Generic;
using System.Text;


// https://www.youtube.com/watch?v=7LKy3lrkTRA
namespace Coding_Practices_and_Datastructures.Other
{
    class Farey_Algorithmus
    {
        private class Bruch
        {
            int numeral;
            int Numeral { get => numeral; set => numeral = value; }

            int denominator;
            int Denominator { get => denominator; set => denominator = value; }

            public Bruch(int numeral, int denominator)
            {
                this.numeral = numeral;
                this.denominator = denominator;
            }

            public static Bruch Get_Mediant(Bruch lower, Bruch upper) => new Bruch(lower.numeral + upper.numeral, lower.denominator + upper.denominator);

            public int Compare(double num)
            {
                double literal = numeral * 1.0 / denominator;
                if (Math.Abs(literal - num) < 0.00000000000000000001) return 0;
                if (literal > num) return 1;
                return -1;
            }

            public override string ToString() => numeral + "/" + denominator;
            public double Get_Literal() => numeral * 1.0 / denominator;
        }



        Bruch lower, upper, approximation;
        double target;

        public Farey_Algorithmus()
        {
            lower = new Bruch(0, 1);
            upper = new Bruch(1, 1);
            approximation = new Bruch(1, 2);
            Console.Write("Anzunähernde Zahl: 0.");
            string s = Console.ReadLine();
            target = s.Length > 0 ? double.Parse("0,"+Console.ReadLine()) : 0.336944434029;

            Console.Write("Durchzulaufende Cycles: ");
            s = Console.ReadLine();
            int cylces = s.Length > 0 ? int.Parse(s) : 100_000;


            aproximate(cylces);
        }

        private void aproximate(int cycles = 1000)
        {
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine("Start Approximation");

            int cycle = 0;
            bool equal = false;
            while(cycles > cycle++ && !equal)
            {
                equal = Run_One_Cycle();
                Console.WriteLine(string.Format("Cycle {0,5}: {1,30} ==> {2,-30} /// {3}", cycle, approximation.ToString(), approximation.Get_Literal(), target) );
            }
        }

        private bool Run_One_Cycle ()
        {
            approximation = Bruch.Get_Mediant(lower, upper);

            int comp = approximation.Compare(target);
            if (comp == 1) upper = approximation;
            else if (comp == -1) lower = approximation;
            else return true;
            return false;
        }
    }
}
