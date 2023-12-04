<!DOCTYPE html>
<html lang="en-us">
<head>
<meta charset="utf-8"/>
<title>Day 23 - Advent of Code 2022</title>
<link rel="stylesheet" type="text/css" href=".static/style.css"/>
<link rel="stylesheet alternate" type="text/css" href=".static/highcontrast.css" title="High Contrast"/>
<link rel="shortcut icon" href="https://adventofcode.com/favicon.png"/>
<script>window.addEventListener('click', function(e,s,r){if(e.target.nodeName==='CODE'&&e.detail===3){s=window.getSelection();s.removeAllRanges();r=document.createRange();r.selectNodeContents(e.target);s.addRange(r);}});</script>
</head><!--




Oh, hello!  Funny seeing you here.

I appreciate your enthusiasm, but you aren't going to find much down here.
There certainly aren't clues to any of the puzzles.  The best surprises don't
even appear in the source until you unlock them for real.

Please be careful with automated requests; I'm not a massive company, and I can
only take so much traffic.  Please be considerate so that everyone gets to play.

If you're curious about how Advent of Code works, it's running on some custom
Perl code. Other than a few integrations (auth, analytics, social media), I
built the whole thing myself, including the design, animations, prose, and all
of the puzzles.

The puzzles are most of the work; preparing a new calendar and a new set of
puzzles each year takes all of my free time for 4-5 months. A lot of effort
went into building this thing - I hope you're enjoying playing it as much as I
enjoyed making it for you!

If you'd like to hang out, I'm @ericwastl@hachyderm.io on Mastodon and
@ericwastl on Twitter.

- Eric Wastl


















































-->
<body>
<header><div><h1 class="title-global"><a href="https://adventofcode.com/">Advent of Code</a></h1><nav><ul><li><a href="https://adventofcode.com/2022/about">[About]</a></li><li><a href="https://adventofcode.com/2022/events">[Events]</a></li><li><a href="https://teespring.com/stores/advent-of-code" target="_blank">[Shop]</a></li><li><a href="https://adventofcode.com/2022/settings">[Settings]</a></li><li><a href="https://adventofcode.com/2022/auth/logout">[Log Out]</a></li></ul></nav><div class="user">LemurDaniel <a href="https://adventofcode.com/2022/support" class="supporter-badge" title="Advent of Code Supporter">(AoC++)</a> <span class="star-count">50*</span></div></div><div><h1 class="title-event">&nbsp;&nbsp;&nbsp;<span class="title-event-wrap">sub y{</span><a href="https://adventofcode.com/2022">2022</a><span class="title-event-wrap">}</span></h1><nav><ul><li><a href="https://adventofcode.com/2022">[Calendar]</a></li><li><a href="https://adventofcode.com/2022/support">[AoC++]</a></li><li><a href="https://adventofcode.com/2022/sponsors">[Sponsors]</a></li><li><a href="https://adventofcode.com/2022/leaderboard">[Leaderboard]</a></li><li><a href="https://adventofcode.com/2022/stats">[Stats]</a></li></ul></nav></div></header>

<div id="sidebar">
<div id="sponsor"><div class="quiet">Our <a href="https://adventofcode.com/2022/sponsors">sponsors</a> help make Advent of Code possible:</div><div class="sponsor"><a href="https://kittycad.io/careers" target="_blank" onclick="if(ga)ga('send','event','sponsor','sidebar',this.href);" rel="noopener">KittyCAD</a> - Graphics, Rust, C++ hackers email adventofcode [at] kittycad.io</div></div>
</div><!--/sidebar-->

<main>
<style>article *[title]{border-bottom:1px dotted #ffff66;}</style><article class="day-desc"><h2>--- Day 23: Unstable Diffusion ---</h2><p>You enter a large crater of gray dirt where the grove is supposed to be. All around you, plants you imagine were expected to be full of fruit are instead withered and broken. A large group of Elves has formed in the middle of the grove.</p>
<p>"...but this volcano has been dormant for months. Without ash, the fruit can't grow!"</p>
<p>You look up to see a massive, snow-capped mountain towering above you.</p>
<p>"It's not like there are other active volcanoes here; we've looked everywhere."</p>
<p>"But our scanners show active magma flows; clearly it's going <em>somewhere</em>."</p>
<p>They finally notice you at the edge of the grove, your pack almost overflowing from the random <em class="star">star</em> fruit you've been collecting. Behind you, elephants and monkeys explore the grove, looking concerned. Then, the Elves recognize the ash cloud slowly spreading above your recent detour.</p>
<p>"Why do you--" "How is--" "Did you just--"</p>
<p>Before any of them can form a complete question, another Elf speaks up: "Okay, new plan. We have almost enough fruit already, and ash from the plume should spread here eventually. If we quickly plant new seedlings now, we can still make it to the extraction point. Spread out!"</p>
<p>The Elves each reach into their pack and pull out a tiny plant. The plants rely on important nutrients from the ash, so they can't be planted too close together.</p>
<p>There isn't enough time to let the Elves figure out where to plant the seedlings themselves; you quickly scan the grove (your puzzle input) and note their positions.</p>
<p>For example:</p>
<pre><code>....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..
</code></pre>
<p>The scan shows Elves <code>#</code> and empty ground <code>.</code>; outside your scan, more empty ground extends a long way in every direction. The scan is oriented so that <em>north is up</em>; orthogonal directions are written N (north), S (south), W (west), and E (east), while diagonal directions are written NE, NW, SE, SW.</p>
<p>The Elves follow a time-consuming process to figure out where they should each go; you can speed up this process considerably. The process consists of some number of <em>rounds</em> during which Elves alternate between considering where to move and actually moving.</p>
<p>During the <em>first half</em> of each round, each Elf considers the eight positions adjacent to themself. If no other Elves are in one of those eight positions, the Elf <em>does not do anything</em> during this round. Otherwise, the Elf looks in each of four directions in the following order and <em>proposes</em> moving one step in the <em>first valid direction</em>:</p>
<ul>
<li>If there is no Elf in the N, NE, or NW adjacent positions, the Elf proposes moving <em>north</em> one step.</li>
<li>If there is no Elf in the S, SE, or SW adjacent positions, the Elf proposes moving <em>south</em> one step.</li>
<li>If there is no Elf in the W, NW, or SW adjacent positions, the Elf proposes moving <em>west</em> one step.</li>
<li>If there is no Elf in the E, NE, or SE adjacent positions, the Elf proposes moving <em>east</em> one step.</li>
</ul>
<p>After each Elf has had a chance to propose a move, the <em>second half</em> of the round can begin. Simultaneously, each Elf moves to their proposed destination tile if they were the <em>only</em> Elf to propose moving to that position. If two or more Elves propose moving to the same position, <em>none</em> of those Elves move.</p>
<p>Finally, at the end of the round, the <em>first direction</em> the Elves considered is moved to the end of the list of directions. For example, during the second round, the Elves would try proposing a move to the south first, then west, then east, then north. On the third round, the Elves would first consider west, then east, then north, then south.</p>
<p>As a smaller example, consider just these five Elves:</p>
<pre><code>.....
..##.
..#..
.....
..##.
.....
</code></pre>
<p>The northernmost two Elves and southernmost two Elves all propose moving north, while the middle Elf cannot move north and proposes moving south. The middle Elf proposes the same destination as the southwest Elf, so neither of them move, but the other three do:</p>
<pre><code>..##.
.....
..#..
...#.
..#..
.....
</code></pre>
<p>Next, the northernmost two Elves and the southernmost Elf all propose moving south. Of the remaining middle two Elves, the west one cannot move south and proposes moving west, while the east one cannot move south <em>or</em> west and proposes moving east. All five Elves succeed in moving to their proposed positions:</p>
<pre><code>.....
..##.
.#...
....#
.....
..#..
</code></pre>
<p>Finally, the southernmost two Elves choose not to move at all. Of the remaining three Elves, the west one proposes moving west, the east one proposes moving east, and the middle one proposes moving north; all three succeed in moving:</p>
<pre><code>..#..
....#
#....
....#
.....
..#..
</code></pre>
<p>At this point, no Elves need to move, and so the process ends.</p>
<p>The larger example above proceeds as follows:</p>
<pre><code>== Initial State ==
..............
..............
.......#......
.....###.#....
...#...#.#....
....#...##....
...#.###......
...##.#.##....
....#..#......
..............
..............
..............

== End of Round 1 ==
..............
.......#......
.....#...#....
...#..#.#.....
.......#..#...
....#.#.##....
..#..#.#......
..#.#.#.##....
..............
....#..#......
..............
..............

== End of Round 2 ==
..............
.......#......
....#.....#...
...#..#.#.....
.......#...#..
...#..#.#.....
.#...#.#.#....
..............
..#.#.#.##....
....#..#......
..............
..............

== End of Round 3 ==
..............
.......#......
.....#....#...
..#..#...#....
.......#...#..
...#..#.#.....
.#..#.....#...
.......##.....
..##.#....#...
...#..........
.......#......
..............

== End of Round 4 ==
..............
.......#......
......#....#..
..#...##......
...#.....#.#..
.........#....
.#...###..#...
..#......#....
....##....#...
....#.........
.......#......
..............

== End of Round 5 ==
.......#......
..............
..#..#.....#..
.........#....
......##...#..
.#.#.####.....
...........#..
....##..#.....
..#...........
..........#...
....#..#......
..............
</code></pre>
<p>After a few more rounds...</p>
<pre><code>== End of Round 10 ==
.......#......
...........#..
..#.#..#......
......#.......
...#.....#..#.
.#......##....
.....##.......
..#........#..
....#.#..#....
..............
....#..#..#...
..............
</code></pre>
<p>To make sure they're on the right track, the Elves like to check after round 10 that they're making good progress toward covering enough ground. To do this, count the number of empty ground tiles contained by the smallest rectangle that contains every Elf. (The edges of the rectangle should be aligned to the N/S/E/W directions; the Elves do not have the patience to calculate <span title="Arbitrary Rectangles is my Piet Mondrian cover band.">arbitrary rectangles</span>.) In the above example, that rectangle is:</p>
<pre><code>......#.....
..........#.
.#.#..#.....
.....#......
..#.....#..#
#......##...
....##......
.#........#.
...#.#..#...
............
...#..#..#..
</code></pre>
<p>In this region, the number of empty ground tiles is <code><em>110</em></code>.</p>
<p>Simulate the Elves' process and find the smallest rectangle that contains the Elves after 10 rounds. <em>How many empty ground tiles does that rectangle contain?</em></p>
</article>
<p>Your puzzle answer was <code>4218</code>.</p><article class="day-desc"><h2 id="part2">--- Part Two ---</h2><p>It seems you're on the right track. Finish simulating the process and figure out where the Elves need to go. How many rounds did you save them?</p>
<p>In the example above, the <em>first round where no Elf moved</em> was round <code><em>20</em></code>:</p>
<pre><code>.......#......
....#......#..
..#.....#.....
......#.......
...#....#.#..#
#.............
....#.....#...
..#.....#.....
....#.#....#..
.........#....
....#......#..
.......#......
</code></pre>
<p>Figure out where the Elves need to go. <em>What is the number of the first round where no Elf moves?</em></p>
</article>
<p>Your puzzle answer was <code>976</code>.</p><p class="day-success">Both parts of this puzzle are complete! They provide two gold stars: **</p>
<p>At this point, all that is left is for you to <a href="https://adventofcode.com/2022">admire your Advent calendar</a>.</p>
<p>If you still want to see it, you can <a href="https://adventofcode.com/2022/day/23/input" target="_blank">get your puzzle input</a>.</p>
<p>You can also <span class="share">[Share<span class="share-content">on
  <a href="https://twitter.com/intent/tweet?text=I%27ve+completed+%22Unstable+Diffusion%22+%2D+Day+23+%2D+Advent+of+Code+2022&amp;url=https%3A%2F%2Fadventofcode%2Ecom%2F2022%2Fday%2F23&amp;related=ericwastl&amp;hashtags=AdventOfCode" target="_blank">Twitter</a>
  <a href="https://adventofcode.com/2022/day/javascript:void(0);" onclick="var ms; try{ms=localStorage.getItem('mastodon.server')}finally{} if(typeof ms!=='string')ms=''; ms=prompt('Mastodon Server?',ms); if(typeof ms==='string' && ms.length){this.href='https://'+ms+'/share?text=I%27ve+completed+%22Unstable+Diffusion%22+%2D+Day+23+%2D+Advent+of+Code+2022+%23AdventOfCode+https%3A%2F%2Fadventofcode%2Ecom%2F2022%2Fday%2F23';try{localStorage.setItem('mastodon.server',ms);}finally{}}else{return false;}" target="_blank">Mastodon</a
></span>]</span> this puzzle.</p>
</main>

<!-- ga -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-69522494-1', 'auto');
ga('set', 'anonymizeIp', true);
ga('send', 'pageview');
</script>
<!-- /ga -->
</body>
</html>