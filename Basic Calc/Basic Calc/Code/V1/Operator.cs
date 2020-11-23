using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basic_Calc.Code.V1
{
    /* Notes for Version 2.0
     * 
     * Important:
     * shunting yard Algo
     *         -    Associativity
     *         -    Precedence
     *         -    Operator or Function 
     *         -    Takes Arguments? or not => Negation takes on Argument, PIE takes None 
     * 
     * 
     *  () => Change Precedence 
     *  [] => Stuff InBetween gets Treated as Operator
     *  {} => Gets Treated as Expression
     * 
     */

        // Version 1.0
    class Operator
    {
        public readonly string ID;
        public readonly int EXPCOUNT;
        public readonly bool INFIX;
        public readonly string DESCRIPTION;

        public delegate void Operation(Calc calc, Stack stack);
        public readonly Operation calc;

        public Operator(string id, int expCount, Operation calc) : this(id, expCount, null, calc) { }
        public Operator(string id, int expCount, bool infix, Operation calc) : this(id, expCount, true, null, calc) { }
        public Operator(string id, int expCount, string description, Operation calc) : this(id, expCount, false, description, calc) { }
        public Operator(string id, int expCount, bool infix, string description, Operation calc)
        {
            this.ID = id;
            this.EXPCOUNT = expCount;
            this.INFIX = infix;
            this.calc = calc;
            this.DESCRIPTION = description;

            if (operatorsList == null) InitializeOperators();
            operatorsList.Add(this);
        }

        public override string ToString() => ID;
        public override bool Equals(object obj) => ID.Equals(obj);
        public override int GetHashCode() => ID.GetHashCode();


        private static IList<Operator> operatorsList;
        private static IDictionary<string, Operator> operators;
        public static IDictionary<string, Operator> Operators { get => operators ?? InitializeOperators(); }

        //KONSTRUKTOR
        private static IDictionary<string, Operator> InitializeOperators()
        {
            operatorsList = new List<Operator>();

            new Operator("+", 2, true, (c, st) => st.Push(st.Pop<sbyte>() + st.Pop<sbyte>())); // Operator PRECEDENCE !!!!!!!
            new Operator("#", 1, true, (c, st) => st.Push(st.Pop<int>() * -1));
            new Operator("=", 1, true, (c, st) => c.Eval(st.Pop().ToString()));


            new Operator("clear", 0, (c, st) => st.Clear());
            new Operator("size", 0, (c, st) => st.Push(st.Count));
            new Operator("list", 0, (c, st) => { foreach (Operator op in operatorsList) st.Push(op); });
            new Operator("map", 2, (c, st) => {
                string s = st.Pop().ToString();
                string s2 = st.Pop().ToString();
                new Operator(s, 0, (c2, st2) => c2.Eval(s2));
            });


            operators = new Dictionary<string, Operator>();
            foreach (Operator op in operatorsList) operators.Add(op.ID, op);
            return operators;
        }
    }
}
