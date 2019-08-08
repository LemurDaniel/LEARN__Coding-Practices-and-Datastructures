using Coding_Practices_and_Datastructures.DS_HANDBOOK.Interfaces;
using Coding_Practices_and_Datastructures.DS_HANDBOOK.Queue;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.DS_HANDBOOK.Tree
{
    class NormalBTree<V>
    {
        public class Node
        {
            public Node left, right;
            public V val;

            public Node(V val) => this.val = val;

        }


        //Tree
        private Node root;
        public Node Root { get => root; }

        private IQueue<Node> queue = new LLQueue<Node>();

        public void Append(V val)
        {
            Node insert = new Node(val);
            queue.Enqueue(insert);
            queue.Enqueue(insert);

            if (root == null) root = insert;
            else
            {
                Node node = queue.Dequeue();
                if (node.left != null) node.left = insert;
                else node.right = insert;
            }

        }
    }
}
