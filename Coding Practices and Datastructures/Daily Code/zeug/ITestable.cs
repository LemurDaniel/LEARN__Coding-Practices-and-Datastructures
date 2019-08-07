﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    public interface ITestable
    {
        void Test();
    }
    public interface ISolvable
    {
        void SolveIt();
    }

    public abstract class Testable : ITestable
    {
        private readonly string aufgabe;
        protected List<ISolvable> testcases = new List<ISolvable>();

        public Testable() => aufgabe = "--- "+this.GetType().Name+" ---";
        public Testable(string aufgabe) => this.aufgabe = aufgabe;

        void ITestable.Test()
        {
            Console.Clear();
            Console.WriteLine(aufgabe);
            foreach(ISolvable testcase in testcases)
            {
                testcase.SolveIt();
                Console.ReadKey(true);
            }
        }

    }

    public abstract class InOutBase<I, O> : ISolvable
    {
        public class Ergebnis
        {
            private readonly InOutBase<I, O> baseClass;
            private readonly string description;
            private O erg;
            private Exception exception;
            private int iterations;
            private TimeSpan timeSpan;
            private bool success;

            public O Erg { get => erg; }
            public int Iterations { get => iterations; }
            public string Success { get => success ? "Success" : "Failure"; }

            public Ergebnis(InOutBase<I, O> baseClass, string description) {
                this.baseClass = baseClass;
                this.description = description;
                this.success = false;
            }

            public void Reset()
            {
                exception = null;
                iterations = -1;
                success = false;
                erg = default(O);
            }
            public void Setze(O erg) => Setze(erg, -1);
            public void Setze(Exception exception) => this.exception = exception;
            public void Setze(O erg, int it)
            {
                timeSpan = DateTime.Now.Subtract(baseClass.solverStarted);
                iterations = it;
                this.erg = erg;
                success = baseClass.CompareOutErg(baseClass.output, erg);
            }

            public override string ToString()
            {
                string s = "Solver ----> " + description + ": " + Success + "\n"; ;
                if (exception != null) return s += "   --> " + exception.GetType().Name + ": " + exception.Message + "\n   --> METHODE: " + exception.TargetSite + "\n\n";

                if (erg != null) s += (baseClass.ergStringConverter?.Invoke(erg) ?? erg.ToString()) + "\n";
                else s += "Ergebnis: <NULL>\n";
                if (Iterations > 0) s += "Iterations: " + Iterations + "\n";
                if (timeSpan.TotalMilliseconds > 0) s += "Milliseconds: " + timeSpan.TotalMilliseconds + "  ||   ";
                if (timeSpan.Ticks > 0) s += "Ticks: " + timeSpan.Ticks + "\n";
                s += "\n";
                return s;
            }
        }

        protected static int MAX_PRINT_LEN = 500;
        protected TimeSpan MaxDur = new TimeSpan(0, 0, 15); // 15 Sekunden

        private static int ids = 0;

        private readonly int id;
        public int Id { get => id; }

        private I input;
        private O output;
        public I Input { get => copiedInputProvider == null ? input : copiedInputProvider(input); }
        public O Output { get => output; }

        protected string inputToString = null;

        public delegate string Converter<V>(V Input);
        public delegate bool Comparator(O output, O erg);
        public delegate void Solver(I input, Ergebnis erg);
        public delegate I CopyInput(I input);

        protected Converter<I> inputStringConverter;
        protected Converter<O> outputStringConverter;
        protected Converter<O> ergStringConverter;
        protected Comparator CompareOutErg = (arg, arg2) => arg.Equals(arg2);
        protected CopyInput copiedInputProvider;
        protected Action setup;
        private IDictionary<Solver, Ergebnis> solvers = new Dictionary<Solver, Ergebnis>();


        private static Converter<I> standartInputStringConverter = arg => Convert<I>("Eingabe: ", arg);
        private static Converter<O> standartOutputStringConverter = arg => Convert<O>("Erwartet: ", arg);
        private static Converter<O> standartErgStringConverter = arg => Convert<O>("Ausgabe: ", arg);
        public static Converter<I> StandartInputStringConverter { get => standartInputStringConverter; }
        public static Converter<O> StandartOutputStringConverter { get => standartOutputStringConverter; }
        public static Converter<O> StandartErgStringConverter { get => standartErgStringConverter; }

        private DateTime solverStarted;
        public static string Convert<T>(string s, T arg) => s + (arg == null ? " NULL " : ((arg.ToString().Length > 500) ? arg.ToString().Substring(0, MAX_PRINT_LEN) + " ...) --> Too Long" : arg.ToString()));

        public InOutBase(I input, O output) : this(input, output, false) { }
        public InOutBase(I input, O output, bool standartConverter)
        {
            id = ++ids;
            this.input = input;
            this.output = output;
            if (standartConverter)
            {
                inputStringConverter = standartInputStringConverter;
                outputStringConverter = standartOutputStringConverter;
                ergStringConverter = standartErgStringConverter;
            }
        }
        public void SolveIt()
        {
            Console.WriteLine(ToString());
            foreach (Solver key in solvers.Keys)
            {
                try
                {
                    SolveOne(key);
                }
                catch (Exception excep)
                {
                    solvers[key].Setze(excep);
                }
                Console.Write(solvers[key].ToString());               
            }
            Console.WriteLine("\n\n");

        }

        public void SolveOne(Solver key){
            AbortableBackgroundWorker wk = new AbortableBackgroundWorker();
            wk.DoWork += (ob, e) => DoWork(wk, key);
            wk.RunWorkerAsync();

            DateTime start = DateTime.Now;
            while (true)
            {
                Task.Delay(100);
                if (!wk.IsBusy) break;
                if (DateTime.Now.Subtract(start).CompareTo(MaxDur) > -1)
                {
                    wk.Abort();
                    wk.Dispose();
                    wk = null;
                    throw new Exception("Solver Exceeded Timelimit, Solver has been aborted");
                }
            }
        }

        private void DoWork(AbortableBackgroundWorker wk , Solver key)
        {
            I inp = Input;
            setup?.Invoke();
            solverStarted = DateTime.Now;
            try
            {
                key(inp, solvers[key]);
            }
            catch (Exception excep)
            {
                solvers[key].Setze(excep);
            }
        }

        public void AddSolver(Solver solver) => AddSolver(solver, solver.Method.Name);
        public void AddSolver(Solver solver, string description) => solvers.Add(solver, new Ergebnis(this, description));

        public override string ToString()
        {
            string s = "Testcase: " + id + "\n";
             s += (inputToString ?? (inputStringConverter?.Invoke(input) ?? input.ToString()))  +"\n";
            s += (outputStringConverter?.Invoke(output) ?? output.ToString()) + "\n";
            //s += "\n";
            //foreach (Ergebnis erg in solvers.Values) s += erg.ToString();
            //s += "\n";
            return s;
        }

    }


    public class AbortableBackgroundWorker : BackgroundWorker
    {

        private Thread workerThread;
        protected override void OnDoWork(DoWorkEventArgs e)
        {
            workerThread = Thread.CurrentThread;
            try
            {
                base.OnDoWork(e);
            }
            catch (ThreadAbortException)
            {
                e.Cancel = true; //We must set Cancel property to true!
                Thread.ResetAbort(); //Prevents ThreadAbortException propagation
            }
        }

        public void Abort()
        {
            if (workerThread != null)
            {
                workerThread.Abort();
                workerThread = null;
            }
        }
    }
}
