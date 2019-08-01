using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Minimum_Size_Subarray_Sum : Testable
    {
        /*
         * Hi, here's your problem today. This problem was recently asked by Amazon:

            Given an array of n positive integers and a positive integer s, find the minimal length of a contiguous subarray of which the sum ≥ s. 
            If there isn't one, return 0 instead.

        */
        private class Input
        {
            public readonly int s;
            public readonly int[] arr;
            public Input(int s, string arr)
            {
                this.s = s;
                this.arr = Helfer.Assemble(arr);
            }
            public override string ToString() => s + "\n" + Helfer.Arrayausgabe<int>("Nums: ",arr);
        }

        private class InOut : InOutBase<Input, int>
        {
            public InOut(Input inp, int outp) : base(inp, outp, true)
            {
                AddSolver(TreeSolverV1);
                AddSolver(TreeSolverV2);
            }
        }

        public Minimum_Size_Subarray_Sum()
        {
            testcases.Add(new InOut(new Input(7, "231243"), 2));
            testcases.Add(new InOut(new Input(7, "231243125120527012570132852135205823057203925230523000087087"), 1));
            testcases.Add(new InOut(new Input(56, "231243125120527012570175173507135713571073513001570137513723562562325678653382752823057203925230523000087087"), 7));
            testcases.Add(new InOut(new Input(5, "5631243125120527012570175173507135713571073513001436666666666666666666666666666666666666666666666666570137513723562562325678653382752823057203925230523000087087"), 1));
        }



        // SOL
        private static void TreeSolverV1(Input inp, InOut.Ergebnis erg)
        {
            int[] nums = inp.arr;
            int tar = inp.s;

            NumTreeNodeV1 root = new NumTreeNodeV1(tar);
            foreach (int num in nums) root.Append(num);
            int small = root.GetSmallestHeight();
            erg.Setze(small == int.MaxValue ? 0 : small);
        }

        private static void TreeSolverV2(Input inp, InOut.Ergebnis erg)
        {
            int[] nums = inp.arr;
            int tar = inp.s;

            NumTreeV2.NumTreeNodeV2 root = new NumTreeV2.NumTreeNodeV2(tar, 0, new NumTreeV2());
            foreach (int num in nums) root.Append(num);
            int small = root.tree.smallest;
            erg.Setze(small == int.MaxValue ? 0 : small);
        }
    }

    public class NumTreeNodeV1
    {
        int val;
        ISet<NumTreeNodeV1> subnodes = new HashSet<NumTreeNodeV1>();

        public NumTreeNodeV1(int val) => this.val = val;

        public override bool Equals(object obj) => (obj as NumTreeNodeV1).val == val;
        public override int GetHashCode() => val.GetHashCode();

        public void Append(int val)
        {
            if (val == 0 || val > this.val) return;
            foreach (NumTreeNodeV1 subNode in subnodes) subNode.Append(val);

            NumTreeNodeV1 newNode = new NumTreeNodeV1(this.val - val);
            if (!subnodes.Contains(newNode)) subnodes.Add(newNode);
        }

        public int GetSmallestHeight()
        {
            if (val == 0) return 0; // return 0 when Target Found , Not 1 because Root Increments by finally returning to caller
            else
            {
                int small = int.MaxValue;
                foreach (NumTreeNodeV1 subNode in subnodes)
                {
                    int temp = subNode.GetSmallestHeight();
                    if (temp < small) small = temp;     // If Smaller Path found replace current small
                }
                return small == int.MaxValue ? small : ++small; // Add this one
            }
        }
    }

    public class NumTreeV2 {

        public int smallest = int.MaxValue;
        public class NumTreeNodeV2
        {
            int val;
            int height;
            public NumTreeV2 tree;
            ISet<NumTreeNodeV2> subnodes = new HashSet<NumTreeNodeV2>();

            public NumTreeNodeV2(int val, int height, NumTreeV2 tree)
            {
                this.val = val;
                this.tree = tree;
                this.height = height;
                if (val == 0 && height < tree.smallest) tree.smallest = height;
            }

            public override bool Equals(object obj) => (obj as NumTreeNodeV2).val == val;
            public override int GetHashCode() => val.GetHashCode();

            public void Append(int val)
            {
                if (val == 0 || val > this.val || height+1 >= tree.smallest) return;
                foreach (NumTreeNodeV2 subNode in subnodes) subNode.Append(val);

                NumTreeNodeV2 newNode = new NumTreeNodeV2(this.val - val, height+1, tree);
                if (!subnodes.Contains(newNode)) subnodes.Add(newNode);
            }

        }
    }
}
