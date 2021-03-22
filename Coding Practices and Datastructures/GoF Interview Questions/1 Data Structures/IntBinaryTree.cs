using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures
{
    public class BTreeNode : BTreeNode<int>
    {
        public BTreeNode Left { get => left as BTreeNode; }
        public BTreeNode Right { get => right as BTreeNode; }
        public BTreeNode(int val) : base(val) { }

        public int LargestPathSumfromRootToLeafRecursive(List<int> list)
        {
            list.Add(val);

            int sum_left = 0;
            int sum_right = 0;
            List<int> list_left = new List<int>();
            List<int> list_right = new List<int>();

            if (left != null) sum_left = Left.LargestPathSumfromRootToLeafRecursive(list_left);
            if (right != null) sum_right = Right.LargestPathSumfromRootToLeafRecursive(list_right);

            if (sum_left > sum_right) list.AddRange(list_left);
            else list.AddRange(list_right);

            return Math.Max(sum_left, sum_right) + val;
        }

    }
    public class IntBinaryTree : BinaryTree<int, BTreeNode>
    {

        public int[] LargestPathSumfromRootToLeafRecursive()
        {
            if (root == null) return new int[] { };

            List<int> list = new List<int>();
            root.LargestPathSumfromRootToLeafRecursive(list);

            return list.ToArray();
        }



        public override void Append(int val) => Append(new BTreeNode(val));
        public override void Append(BTreeNode insert) => root = insert;
        public override IBTreeNode<int> CreateNode(int val) => new BTreeNode(val);
        protected override IBTree<int> TreeGetNewInstance() => new IntBinaryTree();
    }
}
