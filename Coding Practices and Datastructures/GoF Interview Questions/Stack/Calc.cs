using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoF_Coding_Interview_Algos.GoF_Interview_Questions.Stack
{

    class Calc
    {
        private class Stack : Stack<Object>
        {
            public V Pop<V>() => (V)Pop();
            public bool PeekType<V>() => Peek().GetType().Equals(typeof(V));
        }

        private class Operator
        {
            public readonly string ID;
            public readonly int EXPCOUNT;
            public readonly bool INFIX;
            public readonly string DESCRIPTION;

            public delegate void Operation(Stack stack);
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
            }

            public override string ToString() => ID;
            public override bool Equals(object obj) => ID.Equals(obj);
            public override int GetHashCode() => ID.GetHashCode();
        }

        private class QueuedObject
        {
            public readonly Operator op;
            public int expLeft;
            public QueuedObject(int expLeft, Operator op)
            {
                this.op = op;
                this.expLeft = expLeft;
            }
        }


        private Stack stack;
        private bool INFIX = true;

        private IList<Operator> operatorsList = new List<Operator>();
        private IDictionary<string, Operator> operators = new Dictionary<string, Operator>();
        private Queue<QueuedObject> queue = new Queue<QueuedObject>();

        //KONSTRUKTOR
        public Calc()
        { 
            operatorsList.Add(new Operator("+", 2, true, st => st.Push(st.Pop<int>() + st.Pop<int>()))); // Operator PRECEDENCE !!!!!!!
            operatorsList.Add(new Operator("#", 1, st => st.Push(st.Pop<int>()*-1)));
        }


        private void Eval(string input)
        {            
            StringBuilder sb = new StringBuilder();
            char c;
            bool num;
            for(int i=0; i<input.Length; i++)
            {
                c = input[i];
                num = (c == '+' || c == '-') && i + 1 < input.Length && Char.IsDigit(input[i + 1]);

                if (c == '(' || c == '{')
                {
                    if(c == '(') i = ParseParentheses(input, i, '(', ')', sb);
                    else i = ParseParentheses(input, i, '{', '}', sb);
                    stack.Push(sb.ToString());
                    sb.Clear();
                }
                else if (c == '[')  i = ParseParentheses(input, i, '[', ']', sb);
                else if (c != ' ') sb.Append(c);

                if ( !num && operators.Keys.Contains(sb.ToString())){
                    Operator op = operators[sb.ToString()];
                    if (INFIX && op.INFIX) stack.Push(new QueuedObject(op.EXPCOUNT - 1, op));
                    else if (INFIX) stack.Push(new QueuedObject(op.EXPCOUNT, op));
                    else op.calc(stack);
                    sb.Clear();
                }
                else if (Char.IsDigit(input[i]))
                {
                    i = ParseNumber(input, i + 1, c == '-');
                    sb.Clear();
                }

            }
        }


        private int ParseParentheses(string s, int start, char openingBracket, char closingBracket, StringBuilder sb)
        {
            sb.Clear();
            start++;
            for (int count = 1; start<s.Length; start++)
            {
                if (s[start] == openingBracket) count++;
                else if (s[start] == closingBracket)
                {
                    count--;
                    if(count == 0) return start;
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
            for(i=start; i<s.Length; i++)
            {
                if (!Char.IsDigit(s[i]) || i == s.Length-1) zahl = s.Substring(start, i - 1);
            }

            ValueType number = null;
            if(number == null) try { number = sbyte.Parse(zahl); } catch { }
            if (number == null) try { number = short.Parse(zahl); } catch { }
            if (number == null) try { number = int.Parse(zahl); } catch { }
            if (number == null) try { number = Int64.Parse(zahl); } catch { }
            if (number == null) try { number = long.Parse(zahl); } catch { }
            if (number == null) try { number = ulong.Parse(zahl); } catch { }

            if(stack.PeekType<QueuedObject>())
            {
                QueuedObject obj = stack.Pop<QueuedObject>();
                stack.Push(number);
                if (--obj.expLeft == 0) obj.op.calc(stack);
            }
            return i;
        }
    }
}
