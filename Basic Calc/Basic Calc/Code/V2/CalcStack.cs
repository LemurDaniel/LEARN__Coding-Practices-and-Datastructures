using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Basic_Calc.Code.V2.OperatorSet;

namespace Basic_Calc.Code.V2
{
    class CalcStack : Stack<Object>
    {
        private static string CONCAT = " ---> ";

        private delegate string StringProvider(object obj);
        private static IDictionary<Type, StringProvider> typeMap;
        private static void Initialize()
        {
            typeMap = new Dictionary<Type, StringProvider>();
            typeMap.Add(typeof(String), arg => "Expression");
            typeMap.Add(typeof(Operator), arg => (arg as Operator).IsVar ? "Variable":"Konstante");
        }

        public readonly string Name;
        private ICalc calc;
        public CalcStack(string Name, ICalc calc)
        {
            this.Name = Name;
            this.calc = calc;
        }


        public V Pop<V>()
        {
            if (!typeof(V).Equals(typeof(Operator)) && Peek().GetType().Equals(typeof(Operator))) (Pop() as Operator).doOp(this, calc);
            return (V) Pop();
        }
        public V Peek<V>() => (V)Peek();
        public bool PeekType<V>() => Peek().GetType().Equals(typeof(V));

        public override string ToString()
        {
            if (typeMap == null) Initialize();
            StringBuilder sb = new StringBuilder();
            sb.Append(String.Format("{0} --- Size: {1}\n", Name, Count));
            foreach (Object obj in this)
            {
                if (obj == null)
                {
                    sb.Append(String.Format("{0, -50}{1}{2}\n", "NULL", CONCAT, "<NULL>"));
                    continue;
                }
                bool type = typeMap.Keys.Contains(obj.GetType());
                sb.Append(String.Format("{0, -50}{1}{2}\n", obj, CONCAT, type ? typeMap[obj.GetType()](obj) : obj.GetType().Name));
            }
            return sb.ToString();
        }

    }
}
