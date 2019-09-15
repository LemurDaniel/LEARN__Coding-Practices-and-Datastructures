using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Apple:

        You are given the root of a binary tree. You need to implement 2 functions:

        1. serialize(root) which serializes the tree into a string representation
        2. deserialize(s) which deserializes the string back to the original tree that it represents

        For this problem, often you will be asked to design your own serialization format. However, for simplicity, let's use the pre-order traversal of the tree. 

    */
    class Tree_Serialization : Testable
    {
        public class Output<V>
        {
            public readonly IBTree<V> tree;
            public readonly string serialized;
            public Output(IBTree<V> tree, string serialized = null)
            {
                this.tree = tree;
                this.serialized = serialized;
            }
            public override string ToString() => "\n" + tree.ToString() + (serialized != null ? "\nSealized: " + serialized : "");
            public override bool Equals(object obj) => (obj as Output<V>).tree.Equals(tree);
            public override int GetHashCode() => base.GetHashCode();
        }

        public class Input<V>
        {
            public readonly IBTree<V> tree;
            public readonly Func<V, string> serializer;
            public readonly Func<string, V> deserializer;
            public Input(IBTree<V> tree, Func<V, string> serializer, Func<string, V> deserializer)
            {
                this.tree = tree;
                this.serializer = serializer;
                this.deserializer = deserializer;
            }
            public override string ToString() => "\n"+tree.ToString();
        }
        public class InOut<V> : InOutBase<Input<V>, Output<V>>
        {
            public InOut(IBTree<V> tree, Func<V, string> serializer, Func<string, V> deserialzer) : base (new Input<V>(tree, serializer, deserialzer), new Output<V>(tree), true)
            {
                AddSolver(Ser_DeSer_Iterative);
                AddSolver(Ser_DeSer_Recursive);
                AddSolver(Ser_Iterative_DeSer_Recursive);
                AddSolver(Ser_Recursive_DeSer_Iterative);
                HasMaxDur = false;
            }
        }

        public Tree_Serialization()
        {
            testcases.Add(new InOut<char>(Helfer.AssembleBTreeCharPreOrder("abcf//ksz//kql//kqk/elstw/gh/legpwgw/"), c => c + "", s => s[0]));
            testcases.Add(new InOut<int>(Helfer.AssembleBTreePreOrder("/"), i => i + "", int.Parse));
            testcases.Add(new InOut<char>(Helfer.AssembleBTreeCharPreOrder("a,b,c,/,/,/,f,g,/"), c => c+"", s => s[0]));
            testcases.Add(new InOut<int>(Helfer.AssembleBTreePreOrder("5,6,8,/,/,/,5,4,/"), i => i+"", int.Parse));           
        }

        //SOL
        public static void Ser_DeSer_Iterative<V>(Input<V> inp, InOut<V>.Ergebnis erg)
        {
            string serialized = inp.tree.SerializeIt(inp.serializer);
            IBTree<V> Deserialized = BinaryTree<V, IBTreeNode<V>>.DeSerializeIt(serialized, inp.deserializer);
            erg.Setze(new Output<V>(Deserialized, serialized));
        }

        public static void Ser_DeSer_Recursive<V>(Input<V> inp, InOut<V>.Ergebnis erg)
        {
            string serialized = inp.tree.SerializeRecursive(inp.serializer);
            IBTree<V> Deserialized = BinaryTree<V, IBTreeNode<V>>.DeSerializeRecursive(serialized, inp.deserializer);
            erg.Setze(new Output<V>(Deserialized, serialized));
        }

        public static void Ser_Recursive_DeSer_Iterative<V>(Input<V> inp, InOut<V>.Ergebnis erg)
        {
            string serialized = inp.tree.SerializeRecursive(inp.serializer);
            IBTree<V> Deserialized = BinaryTree<V, IBTreeNode<V>>.DeSerializeIt(serialized, inp.deserializer);
            erg.Setze(new Output<V>(Deserialized, serialized));
        }

        public static void Ser_Iterative_DeSer_Recursive<V>(Input<V> inp, InOut<V>.Ergebnis erg)
        {
            string serialized = inp.tree.SerializeIt(inp.serializer);
            IBTree<V> Deserialized = BinaryTree<V, IBTreeNode<V>>.DeSerializeRecursive(serialized, inp.deserializer);
            erg.Setze(new Output<V>(Deserialized, serialized));
        }
    }
}
