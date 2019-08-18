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

        public abstract StringBuilder GenerateStringRecursive(StringBuilder sb);
        public abstract StringBuilder PrintRecursive(StringBuilder sb, TraverseType traverseType);
    }
    public interface IBTree<V> : IEnumerable<V>{
        void Append(V val);
        IBTree<V> InvertRecursive();

        bool IsMirrorRecurse();
        bool IsMirrorIt();
        bool IsBalancedIt();

        // TRAVERSAL
        // Depth First
        string PrintRecursive(TraverseType traverseType);

        string PrintIterative(TraverseType traverseType);


        //TEST ENUMERABLES
        IEnumerable<V> GetIEnumerable(TraverseType traverseType, IBTreeNode<V> node = null);
    }
}
