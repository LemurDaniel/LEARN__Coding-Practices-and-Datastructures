using System;
using System.Collections.Generic;

namespace Coding_Practices_and_Datastructures.Design_Twitter.Tw
{
    public class User
    {
        private static int id = 0;
        private static HashSet<string> Namen = new HashSet<string>();

        public int UserId { get; } = id++;
        public string Username { get; }
        public List<Tweet> Feed { get; } = new List<Tweet>();
        public HashSet<User> Follows { get; } = new HashSet<User>();
        public HashSet<User> Follower { get; } = new HashSet<User>();

        private User(string Username) => this.Username = Username;

        internal static User CreateUser(string Username)
        {
            if (Namen.Contains(Username)) throw new NameTakenException();
            Namen.Add(Username);
            return new User(Username);
        }

        public void printFol()
        {
            Console.WriteLine("Follows von " + Username);
            foreach (User user in Follows) Console.WriteLine(user.Username);
        }
    }

    class NameTakenException : Exception { }
}
