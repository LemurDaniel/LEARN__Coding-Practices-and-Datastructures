using Coding_Practices_and_Datastructures.Design_Twitter.Tw;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Design_Twitter
{
    public class TwitterTest
    {
        private const string V = "\n Hallo ich bins: ";

        public TwitterTest()
        {
            Twitter twitter = Twitter.Instance;
            List<User> user = new List<User>();
            user.Add(twitter.AddUser("Tom"));
            user.Add(twitter.AddUser("Peter"));
            user.Add(twitter.AddUser("Hans"));
            user.Add(twitter.AddUser("Herbert"));

            Random rand = new Random();

            for (int i = 0; i < 50; i++)
            {
                User u1 = user[rand.Next(0, user.Count)];
                User u2 = user[rand.Next(0, user.Count)];

                if (rand.Next(0, 2) == 0) twitter.Follow(u1.UserId, u2.UserId);
                else twitter.UnFollow(u1.UserId, u2.UserId);
            }

                for (int i=0; i<100; i++)
            {
                User u1 = user[rand.Next(0, user.Count)];
                twitter.PostTweet(u1.UserId, "Test Tweet " +i+ V + u1.Username);
            }

            twitter.Test();
            for (int i = 0; i < user.Count; i++)
            {
                twitter.GetNewsFeed(user[i].UserId, 10);
            }

        }
    }
}
