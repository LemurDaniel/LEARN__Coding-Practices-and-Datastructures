
namespace Coding_Practices_and_Datastructures.Design_Twitter.Tw
{
    public class Tweet
    {
        private static int id = 0;

        public int TweetId { get; } = id++;
        public User User { get; }
        public string Text { get; }

        internal Tweet (User User, string Text)
        {
            this.User = User;
            this.Text = Text;
        }

        public override string ToString()
        {
            int t = Terrst.T;
            string Sout = "-------------------------------------------------------\n";
            Sout += "Von: " + User.Username + "\n";
            Sout += Text + "\n";
            Sout += "-------------------------------------------------------\n";
            return Sout;
        }

        private class Terrst
        {
            public static int T = 0;
        }
    }
}
