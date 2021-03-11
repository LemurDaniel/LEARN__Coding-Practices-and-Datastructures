using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Coding_Practices_and_Datastructures.Coding_Train.Challenges.TicTacToe.Konsolenbedinung;

namespace Coding_Practices_and_Datastructures.Coding_Train.Challenges.TicTacToe
{
    class TicTacToe
    {
        private int size = 4;
        public int Size { get => size;  }
        private char[,] grid;
        private int maxTurns;
        private int turn = 0;
        public ISet<int> Free;
        public int lastMove;

        private bool gameEnd = false;
        public bool GameEnd { get => gameEnd; }

        private char winner = ' ';
        public char Winner { get => winner; }

        public readonly char player1 = 'X', player2 = 'O';
        private char activeplayer = 'X'; 
        public char ActivePlayer { get => activeplayer;  }



        public TicTacToe() : this(3) { }
        private TicTacToe(char[,] grid)
        {
            this.size = grid.GetLength(0);
            maxTurns = size * size; 
            this.grid = new char[size, size];
            Free = new HashSet<int>();
            for (int i = 0; i < grid.GetLength(0); i++)
            {
                for (int j = 0; j < grid.GetLength(1); j++)
                {
                    this.grid[i, j] = grid[i, j];
                    if(grid[i, j] == ' ') Free.Add(i * size + j);
                }
            }
            gameEnd = size == 0 || size == 1 || size == 2;
        }
        public TicTacToe(int size)
        {
            this.size = size;
            maxTurns = size * size;
            grid = new char[size, size];
            Free = new HashSet<int>();
            for (int i = 0; i < grid.GetLength(0); i++)
            {
                for (int j = 0; j < grid.GetLength(1); j++)
                {
                    grid[i, j] = ' ';
                    Free.Add(i*size + j);
                }
            }
            gameEnd = size == 0 || size == 1 || size == 2;
        }
        public TicTacToe GetCopy()
        {
            TicTacToe t = new TicTacToe(grid);
            t.activeplayer = activeplayer;
            t.turn = turn;
            return t;
        }


        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            for (int i=0; i<grid.GetLength(0); i++)
            {
                sb.Append("|");
                for (int j = 0; j < grid.GetLength(1); j++)
                {
                    sb.Append(grid[i,j]+"|");
                }
                sb.Append("\n");
            }
            return sb.ToString();
        }
        public void GibAus() => Console.WriteLine(ToString());

        private void SelectRandom()
        {
            while (true)
            {
                int pos = Helfer.random.Next(0, maxTurns);
                int row = pos / size;
                int col = pos % size;
                try
                {
                    Setze(row, col);
                    break;
                }
                catch { }
            }
        }
        public void Setze(string pos) {

            string pos1 = "";
            string pos2 = "";
            bool sw = true;
            for (int i=0; i<pos.Length; i++)
            {
                if (Char.IsDigit(pos[i]))
                {
                    if (sw) pos1 += pos[i];
                    else pos2 += pos[i];
                }
                else if (pos[i] == ',') sw = false;
            }
            if(pos1 == "" || pos2 == "") throw new InvalidOperationException("Ungültige Eingabe");
            Setze(int.Parse(pos1)-1, int.Parse(pos2)-1);
        }
        public void Setze(int row, int col)
        {
            if(row >= grid.GetLength(0)) throw new InvalidOperationException("Not a Valid Position");
            if (col >= grid.GetLength(1)) throw new InvalidOperationException("Not a Valid Position");
            if (grid[row,col] != ' ') throw new InvalidOperationException("Feld ist bereits besetzt");  
            grid[row, col] = activeplayer;
            turn++;
            lastMove = row * size + col;
            Free.Remove(row*size + col);
            if (CheckForWin()) return;

            activeplayer = activeplayer == player1 ? player2 : player1;
        }

        public void Reset()
        {
            winner = ' ';
            gameEnd = false;
            for (int i = 0; i < grid.GetLength(0); i++)
            {
                for (int j = 0; j < grid.GetLength(1); j++)
                {
                    grid[i, j] = ' ';
                    Free.Add(i * size + j);
                }
            }
            activeplayer = player1;
            turn = 0;
        }

        private bool CheckForWin()
        {
            if (turn == maxTurns)gameEnd = true;

            //  Horizontal
            if (winner == ' ')
            {
                for (int i = 0; i < grid.GetLength(0); i++)
                {
                    winner = grid[i, 0];
                    for (int j = 0; j < grid.GetLength(1); j++)
                        if (winner != grid[i, j]) winner = ' ';

                    if (winner != ' ') break;
                }
            }


            //  Vertical
            if (winner == ' ')
            {
                for (int i = 0; i < grid.GetLength(0); i++)
                {
                    winner = grid[0, i];
                    for (int j = 0; j < grid.GetLength(1); j++)
                        if (winner != grid[j, i])   winner = ' ';

                    if (winner != ' ') break;
                }
            }

            //  Diagonal 
            if (winner == ' ')
            {
                winner = grid[0, 0];
                char winner2 = grid[grid.GetLength(0) - 1, 0];
                for (int i = 0; i < grid.GetLength(0); i++)
                {
                    if (winner != grid[i, i]) winner = ' ';
                    if (winner2 != grid[grid.GetLength(0) - 1 - i, i]) winner2 = ' ';
                }
                if (winner2 != ' ') winner = winner2;
            }



            gameEnd = gameEnd || winner != ' ';
            return gameEnd;
        }


        // KONSOLENBEDINUNG
        public static void RunGame()
        {
            TicTacToe game;
            TicTacToeSolver solver;
            Option data;

            ISet<Option> opts = new HashSet<Option>();
            opts.Add(Option.GetOption("Ja", 'J', () => { }, () => false));
            opts.Add(Option.GetOption("Nein", 'N', () => { }, () => false));
            data = Konsolenbedinung.MainLoop("Zwei Spieler?[J/N]: ", "", false, false, false, opts);

            if (data.kurz == 'J')
            {
                while (true)
                {
                    data = Konsolenbedinung.MainLoop("Wähle eine Größe: ", "", false, true);
                    if (data.IsExit) return;
                    else
                    {
                        try { game = new TicTacToe(int.Parse(data.DataContainer)); break; }
                        catch
                        {
                            Console.WriteLine("Bitte geben sie eine gültige Zahl ein");
                            Konsolenbedinung.Wait();
                        }
                    }
                }
            }
            else
                game = new TicTacToe(3);

            if (data.IsExit) return;
            if (data.kurz == 'N') solver = new TicTacToeSolver(game);
            else solver = null;
            Run(game, solver);
        }

        private static void Run(TicTacToe game, TicTacToeSolver solver)
        {
            ISet<Option> opts = new HashSet<Option>();
            opts.Add(Option.GetOption("Random", 'R', () => { if (solver != null) solver.NextBadMove(); else game.SelectRandom(); }, () => false));

            Console.Clear();
            Option opt;
            while (true)
            {
                if (game.GameEnd) break;
                else if (game.ActivePlayer == game.player2 && solver != null)
                {
                    solver.NextMove();
                    continue;
                }

                Func<string> eingabe = () => "\nGameBoard: \n" + game.ToString() + "\n\nSpieler " + game.ActivePlayer + " wählen sie ein Position (x, y): ";

                opt = Konsolenbedinung.MainLoop(eingabe, "Geben sie die Position in zwei Zahlen, die per Komma Getrennt sind, an: \n(row, col)", false, true, true, opts);

                Console.Clear();
                if (opt.IsExit)
                {
                    Console.WriteLine("The Game has been exited");
                    Wait();
                    return;
                }
                else if (opt.IsData)
                {
                    try { game.Setze(opt.DataContainer); }
                    catch (Exception e) { Console.WriteLine("\nEin Fehler ist aufgetreten:\n  -" + e.Message + "\n"); }
                }
            }
            Console.WriteLine("\n\nThe Game Ended: \n" + game.ToString() + "\n" + (game.Winner != ' ' ? "The Winner is Player: " + game.Winner : "It's a Tie"));
            Konsolenbedinung.Wait();
            opts = new HashSet<Option>();
            opts.Add(Option.GetOption("YES", 'Y', () => { }));
            opts.Add(Option.GetOption("NO", 'N', () => { }));
            opt = Konsolenbedinung.MainLoop("Nochmal Spielen", null, false, false, false, opts);
            if(opt.kurz == 'Y')
            {
                game.Reset();
                solver.Reset();
                Run(game, solver);
            }
        }
    }
}
