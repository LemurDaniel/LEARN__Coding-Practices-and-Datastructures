using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * 
     * 
     Hi, here's your problem today. This problem was recently asked by Apple:

        Given a list of words in a string, reverse the words in-place (ie don't create a new string and reverse the words). Since python strings are not mutable, you can assume the input will be a mutable sequence (like list).

        Here's an example and some starting code:

        def reverse_words(words):
          # Fill this in.

        s = list("can you read this")
        reverse_words(s)
        print(''.join(s))
        # this read you can

    */
    class Reverse_Words : Testable
    {
        public class InOut : St_InOuts.SameArr<string>
        {
            public InOut(string words) : base( Reverse(words)[0], Reverse(words)[1], true )
            {
                AddSolver(ReverseWords_InPlace);
            }
            public static string[][] Reverse(string words)
            {
                string[] wordsArr = words.Split(' ');
                string[] arrReverse = new string[wordsArr.Length];
                for (int i = 0; i < wordsArr.Length; i++)
                {
                    arrReverse[i] = wordsArr[wordsArr.Length - i - 1].Trim();
                    wordsArr[i] = wordsArr[i].Trim();
                }
                return new string[][] { wordsArr, arrReverse};
            }
        }

        public Reverse_Words()
        {
            testcases.Add(new InOut("Can You read this"));
        }

        public static void ReverseWords_InPlace(string[] words, InOut.Ergebnis erg)
        {
            for(int i=0; i<words.Length/2; i++)
            {
                string tmp = words[i];
                words[i] = words[words.Length - 1 - i];
                words[words.Length - 1 - i] = tmp;
            }
            erg.Setze(words, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
