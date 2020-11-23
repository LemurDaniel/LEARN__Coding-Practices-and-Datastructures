using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basic_Calc.Code.V1 
{
    class Stack : Stack<Object>
    {
        private static string CONCAT = " ---> ";

        private delegate string StringProvider(object obj);
        private static IDictionary<Type, StringProvider> typeMap;
        private static void Initialize()
        {
            typeMap = new Dictionary<Type, StringProvider>();
            typeMap.Add(typeof(String), arg => "Expression");
            typeMap.Add(typeof(Calc.QueuedObject), arg => "Operator");
            typeMap.Add(typeof(Operator), arg => (arg as Operator).DESCRIPTION);
        }

        public readonly string Name;
        public Stack(string Name) => this.Name = Name;


        public V Pop<V>() => (V)Pop();
        public V Peek<V>() => (V)Peek();
        public bool PeekType<V>() => Peek().GetType().Equals(typeof(V));

        public override string ToString()
        {
            if (typeMap == null) Initialize();
            StringBuilder sb = new StringBuilder();
            sb.Append(String.Format("{0} --- Size: {1}\n", Name, Count));
            foreach (Object obj in this)
            {
                if(obj == null)
                {
                    sb.Append(String.Format("{0, -50}{1}{2}\n", obj, CONCAT, "<NULL>"));
                    continue;
                }
                bool type = typeMap.Keys.Contains(obj.GetType());
                sb.Append(String.Format("{0, -50}{1}{2}\n", obj, CONCAT, type ? typeMap[obj.GetType()](obj) : obj.GetType().Name));
            }
            return sb.ToString();
        }
    }

    class Calc : ICalc
    {
        public class QueuedObject
        {
            public readonly Operator op;
            public int expLeft;
            public QueuedObject(int expLeft, Operator op)
            {
                this.op = op;
                this.expLeft = expLeft;
            }

            public override string ToString() => op.ID;
        }


        private Stack stack;
        private bool INFIX = true;

        public int GetMode() => 0;
        public void SetMode(int mode) { }

        private IDictionary<string, Operator> operators;

        //KONSTRUKTOR
        public Calc()
        {
            stack = new Stack("Main Stack");
            operators = Operator.Operators;
        }

        public string PrintStack() => stack.ToString();


        public void Eval(string input)
        {
            StringBuilder sb = new StringBuilder();
            char c;
            bool num;
            for (int i = 0; i < input.Length; i++)
            {
                c = input[i];
                num = (c == '+' || c == '-') && i + 1 < input.Length && Char.IsDigit(input[i + 1]);

                if (c == '(' || c == '{')
                {
                    if (c == '(') i = ParseParentheses(input, i, '(', ')', sb);
                    else i = ParseParentheses(input, i, '{', '}', sb);
                    stack.Push(sb.ToString());
                    sb.Clear();
                }
                else if (c == '[') i = ParseParentheses(input, i, '[', ']', sb);
                else if (c != ' ') sb.Append(c);

                if (!num && operators.Keys.Contains(sb.ToString()))
                {
                    Operator op = operators[sb.ToString()];
                    if (INFIX && op.INFIX)  stack.Push(new QueuedObject(op.EXPCOUNT - 1, op));
                    else if (INFIX) stack.Push(new QueuedObject(op.EXPCOUNT, op));
                    else op.calc(this, stack);
                    if (stack.Peek<QueuedObject>().expLeft == 0) stack.Pop<QueuedObject>().op.calc(this, stack);
                    sb.Clear();
                }
                else if (num || Char.IsDigit(input[i]))
                {
                    i = ParseNumber(input, num ? i+1:i, c == '-');
                    sb.Clear();
                }

            }
        }


        private int ParseParentheses(string s, int start, char openingBracket, char closingBracket, StringBuilder sb)
        {
            sb.Clear();
            start++;
            for (int count = 1; start < s.Length; start++)
            {
                if (s[start] == openingBracket) count++;
                else if (s[start] == closingBracket)
                {
                    count--;
                    if (count == 0) return start;
                }
                sb.Append(s[start]);
            }
            return start;
        }

        private int ParseNumber(string s, int start, bool positive)
        {
            // Ganzzahl
            string zahl = "";
            int i;
            for (i = start; i < s.Length; i++)
            {
                if (!Char.IsDigit(s[i]) || i == s.Length - 1)
                {
                    zahl = s.Substring(start, i - start + (i == s.Length - 1 ? 1:0));
                    break;
                }
            }

            ValueType number = null;
            if (number == null) try { number = sbyte.Parse(zahl); } catch { }
            if (number == null) try { number = short.Parse(zahl); } catch { }
            if (number == null) try { number = int.Parse(zahl); } catch { }
            if (number == null) try { number = Int64.Parse(zahl); } catch { }
            if (number == null) try { number = long.Parse(zahl); } catch { }
            if (number == null) try { number = ulong.Parse(zahl); } catch { }

            if (stack.Count > 0 && stack.PeekType<QueuedObject>())
            {
                QueuedObject obj = stack.Pop<QueuedObject>();
                stack.Push(number);
                if (--obj.expLeft == 0) obj.op.calc(this, stack);
            }
            else stack.Push(number);
            return i;
        }
    }
}
