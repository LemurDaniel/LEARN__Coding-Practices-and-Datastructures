using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Coding_Train.Challenges.TicTacToe
{
    class Konsolenbedinung
    {
        public class Option
        {
            public static readonly Option HELP = new Option("HELP", 'H', null, null);
            public static readonly Option LIST = new Option("LIST", 'L', null, null);
            public static readonly Option EXIT = new Option("EXIT", 'E', null, null);
            public static readonly Option CLEAR = new Option("CLEAR", 'C', null, null);
            public static readonly Option DATA = new Option("DATA", 'D', null, null);

            public readonly string name;
            public readonly string description;
            public readonly char kurz;

            public string DataContainer;

            //  Operation
            public readonly Action op;
            public readonly Func<bool> contin;

            // Bools
            public bool IsExit { get => this.Equals(EXIT);  }
            public bool IsData { get => this.Equals(DATA); }
            public bool IsLIST { get => this.Equals(LIST); }
            public bool IsHelp { get => this.Equals(HELP); }
            public bool IsClear { get => this.Equals(CLEAR); }

            public bool Is(Option opt) => this.Equals(opt);
            public bool Is(string s) => name.ToLower() == s.ToLower() || (s.Length == 1) && Char.ToUpper(s[0]) == kurz;

            // Konstruktor
            private Option(string name, char kurz, Action op, Func<bool> contin)
            {
                this.name = char.ToUpper(name[0])+name.Substring(1);
                this.kurz = Char.ToUpper(kurz);
                this.op = op;
                this.contin = contin;
            }

            //Factory
            public static Option GetOption(string name, char kurz, Action op) => GetOption(name, kurz, op, null);
            public static Option GetOption(string name, char kurz, Action op, Func<bool> contin)
            {
                if (name.ToLower() == "data") throw new InvalidOperationException("The name must not be DATA");
                return new Option(name, kurz, op, contin);
            }

            public static Option GetDatacontainer(string data) {
                Option DataOpt = new Option("DATA", 'D', null, () => false);
                DataOpt.DataContainer = data;
                return DataOpt;
            }

            public override bool Equals(object obj)
            {
                if (obj == null) return false;
                if (!obj.GetType().Equals(typeof(Option))) return false;
                return name.ToLower().Equals((obj as Option).name.ToLower());
            }
            public override int GetHashCode() => name.ToLower().GetHashCode();
            public override string ToString() => string.Format("({1}) {0, -5}", name, kurz);
        }

        private ISet<Option> opts = new HashSet<Option>();

        public Konsolenbedinung()
        {
            opts.Add(Option.GetOption("TicTacToe", '1', () => TicTacToe.RunGame()));
            MainLoop("\nWählen sie ein Spiel aus: \n", null, true, false, true, opts);
        }



        public static void Wait()
        {
            Console.Write("\n// ...");
            Console.ReadKey(true);
            Console.Clear();
        }

        public static Option MainLoop(string eingabe, string help, bool displayOptions = false, bool GetData = false, bool ExceOpt =false, ISet<Option> options = null) => MainLoop(() => eingabe, help, displayOptions, GetData, ExceOpt, options);
        public static Option MainLoop(Func<string> eingabe, string help, bool displayOptions = false, bool GetData = false, bool ExceOpt = false, ISet<Option> options = null)
        {
            OUTER:  while (true)
            {
                Console.Write(eingabe?.Invoke());
                if (displayOptions && options != null) foreach (Option opt in options) Console.WriteLine(opt);
                Console.Write(">> ");
                string input = Console.ReadLine();
                Console.WriteLine();

                if (Option.HELP.Is(input))
                {
                    Console.WriteLine(help == null || help.Length == 0 ? "Wählen sie ein Option \n => (LIST) für alle Optionen" : help);
                    Wait();
                }
                else if (Option.LIST.Is(input))
                {
                    Console.WriteLine("Options: ");
                    Console.WriteLine(Option.HELP);
                    Console.WriteLine(Option.EXIT);
                    Console.WriteLine(Option.CLEAR);
                    Console.WriteLine(Option.LIST);
                    Console.WriteLine();
                    if (options != null) foreach (Option opt in options) Console.WriteLine(opt);
                    Wait();
                    continue;
                }
                else if (Option.EXIT.Is(input)) return Option.EXIT;
                else if (Option.CLEAR.Is(input)) Console.Clear();
                else if (options != null)
                {
                    foreach (Option opt in options)
                        if (opt.Is(input))
                        {
                            if (ExceOpt)
                            {
                                opt.op?.Invoke();
                                Console.Clear();
                                if (opt.contin != null && !opt.contin()) return opt;
                                goto OUTER;
                            }
                            else return opt;
                        }
                }
                if(GetData) return Option.GetDatacontainer(input);
                else Console.Clear();
            }
        }
    }
}
