using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     *  Hi, here's your problem today. This problem was recently asked by Amazon:

        Given a binary tree and a given node value, return all of the node's cousins. 
        Two nodes are considered cousins if they are on the same level of the tree with different parents. 

        You can assume that all nodes will have their own unique value.
     * 
     * */
    class Number_of_Cousins : Testable
    {
        public class Input
        {
            public readonly IBTree<int> tree;
            public readonly IBTreeNode<int> node;

            public Input(string tree, int node)
            {
                this.tree = Helfer.AssembleBTreePreOrder(tree);
                this.node = this.tree.GetNodeByValue(node);
            }
            public override string ToString() => "Tree: " + tree + "\n" + "Target Node: " + node.Val;
        }
        public class InOut : InOutBase<Input, int[]>
        {
            public InOut(string tree, int node, string cousins) : base (new Input(tree, node), Helfer.Assemble(cousins))
            {
                ergStringConverter = arg  => Helfer.Arrayausgabe("Ergebnis: ", arg);
                outputStringConverter = arg => Helfer.Arrayausgabe("Erwartet: ", arg);
                CompareOutErg = Helfer.ArrayVergleichAnyOrder;

                HasMaxDur = false;
                AddSolver(Solver1);
            }
        }

        public Number_of_Cousins()
        {
            testcases.Add(new InOut("1,2,4,/,/,6,/,/,3,/,5",5, "4,6"));
        }

        public static void Solver1(Input inp, InOut.Ergebnis erg) => erg.Setze(inp.tree.GetCousins(inp.node).ToArray());
    }
}
