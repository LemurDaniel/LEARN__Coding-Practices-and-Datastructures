using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Coding_Train.Challenges.TicTacToe
{
    class TicTacToeSolver
    {
        private class Node
        {
            public IDictionary<int, Node> nodes = new Dictionary<int, Node>();
            public int move;
            public TicTacToe ttt;
            public int val = -111;
            public int wins = 0;
            public int losses = 0;
            public int ties = 0;
            public int height;

            public Node(TicTacToe ttt)
            {
                this.ttt = ttt;
                height = 1;
            }
            public Node(TicTacToe ttt, int move, int height) {
                this.ttt = ttt;
                this.move = move;
                this.height = height;
                ttt.Setze(move/ttt.Size, move%ttt.Size);
                if (ttt.GameEnd)
                {
                    if (ttt.Winner != ' ')
                    {
                        if (ttt.Winner == ttt.player1) losses++;
                        else wins++;
                    }
                    else ties++;
                    ProcessVals();
                }
                else
                    ProccessNextMoves();
            }

            public void ProccessNextMoves()
            {
                ISet<int> set = ttt.Free;
                foreach(int move in set)
                {
                    nodes.Add(move, new Node(ttt.GetCopy(), move, height+1));
                }
            }

            public void ProcessVals()
            {
                if (val != -111) return;
                foreach(Node n in nodes.Values)
                {
                    n.ProcessVals();
                    wins += n.wins;
                    ties += n.ties;
                    losses += n.losses;
                }
                val = wins * 10 + (-5)*ties + (-100)*losses;
            }

            public override string ToString() => val + "   " + ttt.ToString();

        }



        private Node Root;
        private Node curr;
        private TicTacToe game;
        public TicTacToeSolver(TicTacToe game)
        {
            this.game = game;
            Root = new Node(game.GetCopy());
            Console.WriteLine("Buidling Tree");
            Root.ProccessNextMoves();
            Console.WriteLine("Processing Values");
            Root.ProcessVals();
            curr = Root;
        }

        public void NextMove()
        {
            curr = curr.nodes[game.lastMove];
            Node next = null;
            foreach(Node n in curr.nodes.Values)
            {
                if (next == null) next = n;
                else if (next.val < n.val) next = n;
            }
            curr = next;
            game.Setze(curr.move/game.Size, curr.move%game.Size);
        }

        public void NextBadMove()
        {
            Node next = null;
            foreach (Node n in curr.nodes.Values)
            {
                if (next == null) next = n;
                else if (next.val >= n.val) next = n;
            }
            game.Setze(next.move / game.Size, next.move % game.Size);
        }

        public void Reset() => curr = Root;

    }
}
