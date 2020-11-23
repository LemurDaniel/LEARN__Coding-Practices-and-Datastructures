using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Basic_Calc.Code.V2.OperatorSet;

namespace Basic_Calc.Code.V2
{
    class Calc : ICalc
    {
       public class OPStack : Stack<Operator>
        {
            private Calc calc;
            public OPStack(Calc calc) => this.calc = calc;

            public new void Push(Operator op)
            {
                if (op.IsProcedure)
                {
                    op.doOp(calc.output, calc);
                    return;
                }

                if (op.IsConstant || op.IsVar)
                {
                    calc.output.Push(op);
                    return;
                }

                if (op.IsOP_BRACKET || op.IsFunction)
                {
                    base.Push(op);
                    return;
                }

                if (op.IsCL_BRACKET)
                {
                    while(Peek() != Operator.OP_BRACKET) Pop().doOp(calc.output, calc);
                    Pop();
                    if (Count > 0 && Peek().IsFunction) Pop().doOp(calc.output, calc);
                    return;
                }

                if(op.NumberOfArguments == 0)
                {
                   op.doOp(calc.output, calc);
                    return;
                }

                if(calc.mode != INFIX)
                {
                    op.doOp(calc.output, calc);
                    return;
                }

                if(Count > 0 && !Peek().IsOP_BRACKET && Peek().IsOperator && Peek().Precedence >= op.Precedence && Peek().LeftAssociativity)
                    Pop().doOp(calc.output, calc);
               
                base.Push(op);
            }
        }

        public static readonly int PREFIX = 0;
        public static readonly int INFIX = 1;
        public static readonly int POSTFIX = 2;
        public static readonly int POLISH_NOTATION = 0;
        public static readonly int REVERSE_POLISH_NOTATION = 2;

        private IDictionary<string, Operator> operators;

        private CalcStack output;
        private OPStack opStack;
        private int mode;

        public int GetMode() => mode;
        public void SetMode(int mode) => this.mode = mode;
        public OPStack OpStack { get => opStack;  }

        public Calc()
        {
            operators = OperatorSet.GetOperators();
            output = new CalcStack("Output", this);
            opStack = new OPStack(this);
        }

        private void EvalToken(StringBuilder token)
        {
            EvalToken(token.ToString());
            token.Clear();
        }
        private void EvalToken(string token)
        {
            if (token.Length == 0) return;
            else if (token[0] == '{') output.Push(token.Substring(1));
            else if (token[0] == '[')
            {
                token = token.Substring(1);
                Operator oper = null;
                if (operators.Keys.Contains(token.ToLower())) oper= operators[token.ToLower()];
                else oper = Operator.DefineVar(token, null);
                OpStack.Push(oper);
            }
            else if (operators.Keys.Contains(token.ToLower())) opStack.Push(operators[token.ToLower()]);
            else
            {
                //handle Numbers ???
                try { output.Push(int.Parse(token)); return; } catch { }
                try { output.Push(long.Parse(token)); return; } catch { }
                //try { output.Push(float.Parse(token)); return; } catch { }
                try { output.Push(double.Parse(token)); return; } catch { }
                try { output.Push(decimal.Parse(token)); return; } catch { }
            }
        }



        // ICALC
        public string PrintStack() => output.ToString();

        private static string splitter = " ;,";

        public void Eval(string exp) 
        {
            if (mode == PREFIX)
            {
                StringBuilder sb2 = new StringBuilder();
                foreach (char c in exp.Reverse<char>())
                {
                    if (c == '[') sb2.Append(']');
                    else if (c == ']') sb2.Append('[');
                    else if (c == ')') sb2.Append('(');
                    else if (c == '(') sb2.Append(')');
                    else if (c == '{') sb2.Append('}');
                    else if (c == '}') sb2.Append('{');
                }
                exp = sb2.ToString();
            }
            // split by whitespaces;
            // if opBracket split;
            // if clBracket split;
            // if one char Operator split;
            // if Curley Bracket split;

            // Put Tokens in Eval Token
            StringBuilder sb = new StringBuilder();
            for(int i=0, lastToken = 0; i<exp.Length; i++)
            {
                char c = exp[i];
                if(c == '-')
                {
                    if (opStack.Count > 0 && opStack.Peek().IsOP_BRACKET) c = '#';
                    else
                    {
                        int i2 = i + 1;
                        while (i2 < exp.Length && exp[i2] == ' ') i2++;
                        if (exp[i2] == '(') c = '#';
                    }
                }

                if (c == '"')
                {
                    EvalToken(sb);
                    lastToken = i;
                    while (++i < exp.Length && exp[i] != '"') i++;
                    if (exp[i] != '"') throw new Exception("No matching Bracket found");
                    EvalToken(exp.Substring(lastToken +1, i - lastToken - 1));
                    continue;
                }
                else if (c == '{')
                {
                    EvalToken(sb);
                    lastToken = i;
                    while (i < exp.Length && exp[i] != '}') i++;
                    if (exp[i] != '}') throw new Exception("No matching Bracket found");
                    EvalToken(exp.Substring(lastToken, i - lastToken));
                    continue;
                }
                else if (c == '[')
                {
                    EvalToken(sb);
                    lastToken = i;
                    while (i < exp.Length && exp[i] != ']') i++;
                    if (exp[i] != ']') throw new Exception("No matching Bracket found");
                    EvalToken(exp.Substring(lastToken, i - lastToken));
                    continue;
                }
                else if (c == Operator.OP_BRACKET.ID[0])
                {
                    EvalToken(sb);
                    if (opStack.Count > 0 && opStack.Peek().IsBoolEval)
                    {
                        lastToken = i;
                        while (i < exp.Length && exp[i] != ')') i++;
                        if (exp[i] != ')') throw new Exception("No matching Bracket found");
                        EvalToken("{"+exp.Substring(lastToken+1, i - lastToken-1));
                        continue;
                    }
                    opStack.Push(Operator.OP_BRACKET);
                    continue;
                }
                else if (c == Operator.CL_BRACKET.ID[0])
                {
                    EvalToken(sb);
                    opStack.Push(Operator.CL_BRACKET);
                    continue;
                }else if ( c== '!' || c=='=' )
                {
                    EvalToken(sb);
                    if (i + 1 < exp.Length && exp[i + 1] == '=') EvalToken(c+ ""+ exp[++i] + "");
                    else EvalToken(c+"");
                    continue;
                }
                else if (c == '<' || c == '>')
                {
                    EvalToken(sb);
                    if (i + 1 < exp.Length && exp[i + 1] == '=') EvalToken(c + "" + exp[++i] + "");
                    else EvalToken(c + "");
                    continue;
                }
                else if (OperatorSet.IsSingleCharOperator(c))
                {
                    EvalToken(sb);
                    EvalToken(c+"");
                    continue;
                }
                else if (splitter.Contains(c)) EvalToken(sb);
                else sb.Append(c);
            }
            EvalToken(sb);
            while (opStack.Count > 0 && !opStack.Peek().IsOP_BRACKET ) opStack.Pop().doOp(output, this);
        }

    }
}
