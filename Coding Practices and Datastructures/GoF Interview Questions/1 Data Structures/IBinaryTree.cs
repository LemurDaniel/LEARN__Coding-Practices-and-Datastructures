using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures
{
    public abstract class IBTreeNode<V>
    {
        protected IBTreeNode<V> left, right;
        protected V val;

        public IBTreeNode<V> Left { get => left; set => left = value; }
        public IBTreeNode<V> Right { get => right; set => right = value; }
        public V Val { get => val; set => val = value; }

        public abstract IBTreeNode<V> Insert(BTreeNode<V> n, object arg = null);
        public abstract void SwapRecursive();

        public abstract void GetLeafsRecursive(IList<IBTreeNode<V>> list);
        public abstract void GetLeafsRecursive(IList<V> list);
        public abstract int GetNumberOfUnvialSubtreesRecursiveStart();
        public abstract int[] GetNumberOfUnvialSubtreesRecursive();
        public abstract int GetNumberOfUnvialSubtreesRecursiveMethod2();
        public abstract void RemoveNodeValsRecursive(V val);
        public abstract int GetHeightRecursive();

        public abstract IBTreeNode<V> GetLargestBst(Func<V, V, int> compare);

        public abstract IBTreeNode<V> GetDeepestNodeRecursive();
        public abstract StringBuilder GenerateStringRecursive(StringBuilder sb);
        public abstract StringBuilder GenerateStringIt(int lenEl = 4, int spacing = 4);
        public abstract StringBuilder PrintRecursive(StringBuilder sb, TraverseType traverseType, string split = "; ");

        public abstract void MakeCompleteRecursive();

        public abstract bool CheckForSubtree(IBTree<V> tree);
        protected bool ContainsSubtree(IBTreeNode<V> tree)
        {
            if (!this.Val.Equals(tree.Val)) return false;
            if (tree.Right != null && this.Right != null && !this.Right.ContainsSubtree(tree.Right)) return false;
            if (tree.Left != null && this.Left != null && !this.Left.ContainsSubtree(tree.Left)) return false;
            return true;
        }

        public abstract string SerializeRecursive(Func<V, string> serializer);
        public abstract void DeSerializeRecursive(string[] arr, Func<string, V> deserializer, Func<V, IBTreeNode<V>> CreateNode);
        public static IBTreeNode<V> DeSerializeRecursive(string s, Func<string, V> deserializer, Func<V, IBTreeNode<V>> CreateNode)
        {
            if (s == null || s.Length == 0) return null;
            string[] arr = s.Split('|');
            if (arr[0] == "<NULL>") return null;
            IBTreeNode<V> root = CreateNode(deserializer(arr[0]));
            root.DeSerializeRecursive(arr, deserializer, CreateNode);
            return root;
        }
        public abstract int LowestCommonAncestorRecursive(IBTreeNode<V> n, IBTreeNode<V> n1, ref IBTreeNode<V> ancestor);
        public abstract IBTreeNode<V> GetNodeByValue(V val);
    }

    public interface IBTree<V> : IEnumerable<V>{

        void Clear();
        IBTreeNode<V> GetRoot();
        void Append(V val);
        void Append(IBTreeNode<V> val);
        IBTreeNode<V> CreateNode(V val);
        IBTree<V> InvertRecursive();

        bool IsMirrorRecurse();
        bool IsMirrorIt();
        bool IsCompleteIt();
        bool IsBalancedIt();

        IList<IBTreeNode<V>> GetLeafsRecursive();
        IList<V> GetLeafsRecursiveVals();
        IBTreeNode<V> GetDeepestNodeRecursive();
        IBTreeNode<V> GetDeepestNodeIt();
        V[] GetValuesAtHeight(int h);
        int GetNumberOfUnivalSubtreesRecursive();
        int GetNumberOfUnivalSubtreesRecursiveMethod2();


        void RemoveNodeVals(V val);

        IBTreeNode<V> GetLargestBst(Func<V, V, int> compare);

        IBTree<V> MakeCompleteIterative();
        IBTree<V> MakeCompleteRecursive();

        string RightSide_View_Queue();
        string RightSide_View_Stack();

        string SerializeIt(Func<V, string> serializeEl = null);
        string SerializeRecursive(Func<V, string> serializeEl = null);
        IBTree<V> DeSerializeIt(string s, Func<string, V> DeSerializeEl);
        IBTree<V> DeSerializeRecursive(string s, Func<string, V> DeSerializeEl);

        // TRAVERSAL
        // Depth First
        string PrintRecursive(TraverseType traverseType, IBTreeNode<V> baseNode = null, string split = "; ");
        string PrintIterative(TraverseType traverseType, IBTreeNode<V> baseNode = null, string split = "; ");

        IBTreeNode<V> GetNodeByValue(V val);
        List<V> GetCousins(IBTreeNode<V> node);

        //TEST ENUMERABLES
        IEnumerable<V> GetIEnumerable(TraverseType traverseType, IBTreeNode<V> node = null);

        IBTree<V> CopyIt();
    }
}
