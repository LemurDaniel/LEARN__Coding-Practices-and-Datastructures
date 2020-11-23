using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basic_Calc.Code.V2
{
    class OperatorSet
    {
        private static bool init = false;
        private static ISet<Operator> OperatorsSet = new HashSet<Operator>();
        private static ISet<Operator> SingleCharOps = new HashSet<Operator>();
        private static IDictionary<string, Operator> Operators = new Dictionary<string, Operator>();

        public static bool IsSingleCharOperator(char s) => Operators.Keys.Contains(s+"") ? SingleCharOps.Contains(Operators[s+""]) : false;

        public static IDictionary<string, Operator> GetOperators()
        {
            if (!init)
            {
                OperatorsSet.Clear();
                SingleCharOps.Clear();
                Operators.Clear();
                Operator.InitialzieOperators();
                init = true;
            }
            return Operators;
        }


        // Start
        public class OPtype
        {
            public readonly int typ;
            private OPtype(int typ) => this.typ = typ;

            public static readonly OPtype OPERATOR = new OPtype(1);
            public static readonly OPtype FUNCTION = new OPtype(2);
            public static readonly OPtype CONSTANT = new OPtype(3);
            public static readonly OPtype EVAL = new OPtype(4);
            public static readonly OPtype VAR = new OPtype(5);
            public static readonly OPtype PROCEDURE = new OPtype(6);
            public static readonly OPtype BOOLEVAL = new OPtype(7);
        }
        public class Operator
        {

            public static readonly Operator OP_BRACKET = new Operator("(", OPtype.OPERATOR);
            public static readonly Operator CL_BRACKET = new Operator(")", OPtype.OPERATOR);

            public bool IsOP_BRACKET { get => this.Equals(OP_BRACKET); }
            public bool IsCL_BRACKET { get => this.Equals(CL_BRACKET); }
            public bool IsOperator { get => this.Typ.Equals(OPtype.OPERATOR); }
            public bool IsFunction { get => this.Typ.Equals(OPtype.FUNCTION); }
            public bool IsBoolEval { get => this.Typ.Equals(OPtype.BOOLEVAL); }
            public bool IsProcedure { get => this.Typ.Equals(OPtype.PROCEDURE); }
            public bool IsConstant { get => this.Typ.Equals(OPtype.CONSTANT); }
            public bool IsVar { get => this.Typ.Equals(OPtype.VAR); }
            public bool IsEval { get => this.Typ.Equals(OPtype.EVAL); }

            public static readonly int MAX_PRE = 50;

            private List<string> Alias = new List<string>();

            public readonly string ID;
            public readonly bool LeftAssociativity = true;
            public readonly int Precedence = 1;
            public readonly OPtype Typ = OPtype.OPERATOR;
            public readonly int NumberOfArguments = 2;

            public delegate void OperationVoid(CalcStack stack, ICalc calc);
            public delegate object Operation<V>(V[] args);
            private OperationVoid Operate;
            public void doOp(CalcStack stack, ICalc calc) => Operate(stack, calc);

            //public static Operator GetEval(string ID, Operation<ICalc> operate, int Precedence = 1, int NumberOfArguments = 2, bool LeftAssociativity = true) => GetOperator<ICalc>(ID, OPtype.EVAL, operate, Precedence, NumberOfArguments, LeftAssociativity);

            public static Operator GetOperator(string ID, OPtype Typ, OperationVoid operate, int Precedence = 1, int NumberOfArguments = 2, bool LeftAssociativity = true)
            {
                Operator op = new Operator(ID, Typ, Precedence, NumberOfArguments, LeftAssociativity);
                op.Operate = operate;
                return op;
            }
            public static Operator GetOperator<X>(string ID, OPtype Typ, Operation<X> operate, int Precedence = 1, int NumberOfArguments = 2, bool LeftAssociativity = true)
            {
                Operator op = new Operator(ID, Typ, Precedence, NumberOfArguments, LeftAssociativity);
                op.Operate = (st, c) =>
                {
                    //if (op.IsEval) operate?.Invoke(new X[] { (X)calc });
                    if (op.IsConstant) st.Push(operate?.Invoke(null));
                    else
                    {
                        X[] args = new X[NumberOfArguments];
                        for (int i = 0; i < args.Length; i++)
                        {
                            if (st.Peek().GetType() == typeof(Operator) && (st.Peek<Operator>().IsVar || st.Peek<Operator>().IsConstant)) st.Pop<Operator>().doOp(st, c);
                            args[i] = (X)st.Pop();
                        }
                        st.Push(operate?.Invoke(args));
                    }
                };
                return op;
            }

            private Operator(string ID, OPtype Typ, int Precedence = 1, int NumberOfArguments = 2, bool LeftAssociativity = true)
            {
                this.ID = ID;
                this.Typ = Typ;
                this.Precedence = Precedence;
                this.NumberOfArguments = IsConstant || IsProcedure ? 0:NumberOfArguments;
                this.LeftAssociativity = LeftAssociativity;
                if (OperatorsSet.Contains(this))
                {
                    OperatorsSet.Remove(this);
                    if(ID.Length == 1) SingleCharOps.Remove(this);
                }
                OperatorsSet.Add(this);
                if (ID.Length == 1 && !IsConstant && !IsVar) SingleCharOps.Add(this);

                if (Operators.Keys.Contains(ID))
                {
                    Operator last = Operators[ID];
                    Operators[ID] = this;
                    foreach (string al in last.Alias) Operators[al] = this;
                }
                else Operators.Add(ID.ToLower(), this);
            }
            public static Operator DefineConstant<X>(string ID, X val) => Operator.GetOperator<X>(ID, OPtype.CONSTANT, ar => val, MAX_PRE, 0);
            public static Operator DefineVar(string ID, object val) => Operator.GetOperator<object>(ID, OPtype.VAR, ar => val ?? null, MAX_PRE, 0);
            public static Operator SetAlias(string ID, string Al) => Operators[ID].SetAlias(Al);
            public Operator SetAlias(string Al)
            {
                this.Alias.Add(Al);
                Operators.Add(Al.ToLower(), this);
                return this;
            }

            public override bool Equals(object obj) => obj == null ? false : (obj as Operator).ID.ToLower().Equals(ID.ToLower());
            public override int GetHashCode() => ID.ToLower().GetHashCode();
            public override string ToString() => ID;




            // Operators
            public static void InitialzieOperators()
            {
                Operator.GetOperator<int>("+", OPtype.OPERATOR, ag => ag[0] + ag[1]);
                Operator.GetOperator<int>("-", OPtype.OPERATOR, ag => ag[1] - ag[0]);
                Operator.GetOperator<int>("/", OPtype.OPERATOR, ag => ag[1] / ag[0], 2);
                Operator.GetOperator<int>("*", OPtype.OPERATOR, ag => ag[0] * ag[1], 2);
                Operator.GetOperator<int>("%", OPtype.OPERATOR, ag => ag[1] % ag[0], 2);
                Operator.GetOperator<int>("#", OPtype.OPERATOR, ag => -ag[0], MAX_PRE, 1);


                //FUNC
                Operator.GetOperator<int>("Max", OPtype.FUNCTION, ag => Math.Max(ag[0], ag[1]));
                Operator.GetOperator<int>("Min", OPtype.FUNCTION, ag => Math.Min(ag[0], ag[1]));

                //
                Operator.GetOperator("=", OPtype.OPERATOR, (st, c) => { object ob = st.Pop(); st.Pop<Operator>().Operate = (st2, c2) => st2.Push(ob); }, MAX_PRE);

                Operator.GetOperator("TEST", OPtype.OPERATOR, (st, c) => c.Eval("while(size < 100) {size.}"));

                //Special
                Operator.GetOperator(".", OPtype.PROCEDURE, (st, c) => st.Pop<Operator>().doOp(st, c), MAX_PRE, 1);      
                Operator.GetOperator("Size", OPtype.VAR, (st, c) => st.Push(st.Count));
                Operator.GetOperator("Peek", OPtype.PROCEDURE, (st, c) => st.Push(st.Peek()));
                Operator.GetOperator("Pop", OPtype.PROCEDURE, (st, c) => { if (st.Count > 0) st.Pop(); });
                Operator.GetOperator("PopN", OPtype.OPERATOR, (st, c) => { int anz = st.Pop<int>(); c.Eval("[LOOPS]="+anz+"; while{LOOPS > 0} { Pop; [LOOPS] = (LOOPS-1); }"); }, MAX_PRE, 1, false);
                Operator.GetOperator("While", OPtype.BOOLEVAL, (st, c) =>
                {
                    c.Eval("(");
                    string i = st.Pop()+"";
                    string eval = st.Pop()+"";
                    c.Eval(eval);
                    int count = 0;
                    while (st.Pop<bool>())
                    {
                        c.Eval(i);
                        c.Eval("MaxLoops.");
                        if (++count > st.Pop<int>()) throw new Exception("Max Loops Exceeded, Operation terminated");
                        c.Eval(eval);
                    }
                    c.Eval(")");
                }, 1, 1, false);

                Operator.GetOperator(";", OPtype.OPERATOR, (st, c) => {
                    var op = (c as Calc).OpStack;
                    if (op.Count > 0 && !op.Peek().IsOP_BRACKET) op.Pop().doOp(st, c);
                }, MAX_PRE, 0);

                // Logic
                Operator.GetOperator<bool>("!", OPtype.OPERATOR, ag => !ag[0], Operator.MAX_PRE, 1, false);
                Operator.GetOperator<object>("!=", OPtype.OPERATOR, ag => !ag[0].Equals(ag[1]), 3);
                Operator.GetOperator<object>("==", OPtype.OPERATOR, ag => ag[0].Equals(ag[1]), 3);
                Operator.GetOperator<bool>("&", OPtype.OPERATOR, ag => ag[0] & ag[1], 2);
                Operator.GetOperator<bool>("|", OPtype.OPERATOR, ag => ag[0] | ag[1]);
                Operator.GetOperator<bool>("XOR", OPtype.OPERATOR, ag => ag[0] ^ ag[1]);

                Operator.GetOperator<IComparable>(">", OPtype.OPERATOR, ag => ag[1].CompareTo(ag[0]) == 1, 3);
                Operator.GetOperator<IComparable>("<", OPtype.OPERATOR, ag => ag[1].CompareTo(ag[0]) == -1, 3);
                Operator.GetOperator<IComparable>(">=", OPtype.OPERATOR, ag => ag[1].CompareTo(ag[0]) > -1, 3);
                Operator.GetOperator<IComparable>("<=", OPtype.OPERATOR, ag => ag[1].CompareTo(ag[0]) < 1, 3);


                //Constants
                Operator.DefineConstant<bool>("TRUE", true);
                Operator.DefineConstant<bool>("FALSE", false);
                Operator.DefineConstant("PIE", Math.PI);
                Operator.DefineConstant("TAU", Math.PI*2);
                Operator.DefineConstant("E", Math.E);

                Operator.DefineConstant("MaxShort", short.MaxValue);
                Operator.DefineConstant("MinShort", short.MinValue);
                Operator.DefineConstant("MaxInt", int.MaxValue);
                Operator.DefineConstant("MinInt", int.MinValue);
                Operator.DefineConstant("MaxLong", long.MaxValue);
                Operator.DefineConstant("MinLong", long.MinValue);
                Operator.DefineConstant("MaxDouble", double.MaxValue);
                Operator.DefineConstant("MinDouble", double.MinValue);

                Operator.DefineConstant("MaxLoops", 100);


                // ALIAS
                Operator.SetAlias("&", "AND");
                Operator.SetAlias("|", "OR");


                // Weiteres
                Operator.GetOperator("FIBO", OPtype.EVAL, (st, c) => c.Eval("[tmp]; [var1] = 0; [var2]=1; while( var1 >= 0) { var1.; tmp = var2.; var2 = (var1+var2); var1 = tmp. }"));
            }
        }
    }

}
