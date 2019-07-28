using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.DS_HANDBOOK.Stack
{
    // Implementierung eines Stacks mit einem Array


    class ArrayStack<V> : Interfaces.IStack<V>
    {
        private static readonly int DEFAULT_SIZE = 100; // Standartgröße des Stacks

        private V[] stack;      // Speichert Daten
        private int top = -1;   // Pointer zum Top Element
        private bool sizeLimited = true;   // Größe erhöhen wenn Stack voll ? true => Ja || false => feste Größe

        public bool SizeLimited { set => sizeLimited = value; get => sizeLimited; }


        /* KONSTRUKTOR */
        public ArrayStack() : this(DEFAULT_SIZE) { }
        public ArrayStack(int size) : this(size, true) { }
        public ArrayStack(int size, bool sizeLimited)
        {
            this.stack = new V[size];       // Eigene Größe definierbar
            this.sizeLimited = sizeLimited;
        }


        /* METHODEN */
        public V Peek() => Pop(false);
        public V Pop() => Pop(true);
        public void Push(V data)
        {
            if (top == stack.Length - 1)
            {
                if(sizeLimited) throw new InvalidOperationException("Der Stack ist Voll");
                else
                {
                    //Neues Array mit doppelter Größe erstellen
                    V[] arr = new V[stack.Length*2];
                    for (int i = 0; i < stack.Length; i++) arr[i] = stack[i];
                    stack = arr;
                }
            }
            stack[++top] = data;
        }

        private V Pop(bool pop)
        {
            if (top == -1) throw new InvalidOperationException("Der Stack ist Leer");
            else return stack[ pop ? top--:top];
        }
    }
}
