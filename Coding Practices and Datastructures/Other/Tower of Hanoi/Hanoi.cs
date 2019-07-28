using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Tower_of_Hanoi
{
    class Hanoi
    {
        static int count = 0;

        public static  void TowerAsync(int size)
        {
            count = 0;
            TowerAsync(size, 'A', 'B', 'C');
            Console.WriteLine("MOVES: " + count);
        }

        public static void TowerAsync(int size, char beg, char aux, char end)
        {
            if (size == 1)
            {
                Console.WriteLine("Move Disk 1 from " + beg + " to " + end);
                count++;
                return;
            }
            else
            {
                TowerAsync(size - 1, beg, end, aux);
                Console.WriteLine("Move Disk " +size+" from " + beg + " to " + end);
                count++;
                TowerAsync(size - 1, aux, beg, end);
            }
        }
    }
}
