using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures
{
    class BinaryCompleteTree<V> : BinaryTree<V, BinaryCompleteTree<V>.Node>
    {
        private Queue<Node> nodes = new Queue<Node>();

        public class Node : BTreeNode<V>
        {
            public new Node Right { get => right as Node; set => right = value as Node; }
            public new Node Left { get => left as Node; set => left = value as Node; }
            public Node(V val) : base(val) { }

        }
        //NODE END
        public new Node Root { get => root as Node; }

        public override void Append(V val) => Append(new Node(val));
        public override IBTreeNode<V> CreateNode(V val) => new Node(val);
        public override void Append(Node insert)
        {
            nodes.Enqueue(insert);
            nodes.Enqueue(insert);
            if (root == null) root = insert;
            else nodes.Dequeue().Insert(insert);
        }

    }
}
