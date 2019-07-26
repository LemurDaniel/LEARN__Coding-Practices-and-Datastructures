using System;
using System.Collections.Generic;
using System.Linq;
using static GoF_Coding_Interview_Algos.Design_Twitter.Tw.Tweet;

namespace GoF_Coding_Interview_Algos.Design_Twitter.Tw
{
    public class Twitter
    {
        private static Twitter instance;
        private Twitter() => instance = this;
        public static Twitter Instance { get => instance ?? new Twitter(); }

        private Dictionary<int, User> Users =  new Dictionary<int, User>();
        private bool Exists(int UserId) => Users.Keys.Contains<int>(UserId);

        public User AddUser(string name)
        {
            try
            {
                User user = User.CreateUser(name);
                Users[user.UserId] = user;
                return user;
            }
            catch (NameTakenException)
            {
                Console.WriteLine("Name bereits vergeben");
                return null;
            }
        }



        public void PostTweet(int userId, string text)
        {
            if (!Exists(userId) ) return;
            Tweet tweet = new Tweet(Users[userId], text);
            Users[userId].Feed.Add(tweet);
            foreach (User user in Users[userId].Follower) user.Feed.Add(tweet);
        }

        public void Test()
        {
            foreach (User user in Users.Values) user.printFol();
        }
        public void GetNewsFeed(int userId, int l)
        {
            if (!Exists(userId)) return;
            Console.WriteLine("------------- TwitterFeed von User: " + Users[userId].Username + " --------------------------");
            var feed = Users[userId].Feed;
            for (int i = feed.Count - 1; i > feed.Count - 1 - l && i > 0; i--)
                Console.WriteLine(feed[i]);
            Console.WriteLine("---------------------------------------");
        }

        public void Follow(int followerId, int followeeId)
        {
            if (!Exists(followerId)) return;
            try
            {
                Users[followerId].Follows.Add(Users[followeeId]);
                Users[followeeId].Follower.Add(Users[followerId]);
            }
            catch { }
        }

        public void UnFollow(int followerId, int followeeId)
        {
            if (Exists(followerId) || Exists(followeeId)) return;
            try
            {
                Users[followerId].Follows.Remove(Users[followeeId]);
                Users[followeeId].Follower.Remove(Users[followerId]);
            }
            catch { }
        }
    }

}
