<!DOCTYPE html>
<html lang="en-us">
<head>
<meta charset="utf-8"/>
<title>Day 13 - Advent of Code 2022</title>
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
<header><div><h1 class="title-global"><a href="https://adventofcode.com/">Advent of Code</a></h1><nav><ul><li><a href="https://adventofcode.com/2022/about">[About]</a></li><li><a href="https://adventofcode.com/2022/events">[Events]</a></li><li><a href="https://teespring.com/stores/advent-of-code" target="_blank">[Shop]</a></li><li><a href="https://adventofcode.com/2022/settings">[Settings]</a></li><li><a href="https://adventofcode.com/2022/auth/logout">[Log Out]</a></li></ul></nav><div class="user">LemurDaniel <a href="https://adventofcode.com/2022/support" class="supporter-badge" title="Advent of Code Supporter">(AoC++)</a> <span class="star-count">50*</span></div></div><div><h1 class="title-event">&nbsp;&nbsp;&nbsp;<span class="title-event-wrap">var y=</span><a href="https://adventofcode.com/2022">2022</a><span class="title-event-wrap">;</span></h1><nav><ul><li><a href="https://adventofcode.com/2022">[Calendar]</a></li><li><a href="https://adventofcode.com/2022/support">[AoC++]</a></li><li><a href="https://adventofcode.com/2022/sponsors">[Sponsors]</a></li><li><a href="https://adventofcode.com/2022/leaderboard">[Leaderboard]</a></li><li><a href="https://adventofcode.com/2022/stats">[Stats]</a></li></ul></nav></div></header>

<div id="sidebar">
<div id="sponsor"><div class="quiet">Our <a href="https://adventofcode.com/2022/sponsors">sponsors</a> help make Advent of Code possible:</div><div class="sponsor"><a href="https://www.assured.se/careers" target="_blank" onclick="if(ga)ga('send','event','sponsor','sidebar',this.href);" rel="noopener">Assured</a> - Från chip till skepp, bitar till bilar. Vi testar din säkerhet, vi säkrar din kod. Your career Assured.</div></div>
</div><!--/sidebar-->

<main>
<style>article *[title]{border-bottom:1px dotted #ffff66;}</style><article class="day-desc"><h2>--- Day 13: Distress Signal ---</h2><p>You climb the hill and again try contacting the Elves. However, you instead receive a signal you weren't expecting: a <em>distress signal</em>.</p>
<p>Your handheld device must still not be working properly; the packets from the distress signal got decoded <em>out of order</em>. You'll need to re-order the list of received packets (your puzzle input) to decode the message.</p>
<p>Your list consists of pairs of packets; pairs are separated by a blank line. You need to identify <em>how many pairs of packets are in the right order</em>.</p>
<p>For example:</p>
<pre><code>[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
</code></pre>
<p><span title="The snailfish called. They want their distress signal back.">Packet data consists of lists and integers.</span> Each list starts with <code>[</code>, ends with <code>]</code>, and contains zero or more comma-separated values (either integers or other lists). Each packet is always a list and appears on its own line.</p>
<p>When comparing two values, the first value is called <em>left</em> and the second value is called <em>right</em>. Then:</p>
<ul>
<li>If <em>both values are integers</em>, the <em>lower integer</em> should come first. If the left integer is lower than the right integer, the inputs are in the right order. If the left integer is higher than the right integer, the inputs are not in the right order. Otherwise, the inputs are the same integer; continue checking the next part of the input.</li>
<li>If <em>both values are lists</em>, compare the first value of each list, then the second value, and so on. If the left list runs out of items first, the inputs are in the right order. If the right list runs out of items first, the inputs are not in the right order. If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.</li>
<li>If <em>exactly one value is an integer</em>, convert the integer to a list which contains that integer as its only value, then retry the comparison. For example, if comparing <code>[0,0,0]</code> and <code>2</code>, convert the right value to <code>[2]</code> (a list containing <code>2</code>); the result is then found by instead comparing <code>[0,0,0]</code> and <code>[2]</code>.</li>
</ul>
<p>Using these rules, you can determine which of the pairs in the example are in the right order:</p>
<pre><code>== Pair 1 ==
- Compare [1,1,3,1,1] vs [1,1,5,1,1]
  - Compare 1 vs 1
  - Compare 1 vs 1
  - Compare 3 vs 5
    - Left side is smaller, so inputs are <em>in the right order</em>

== Pair 2 ==
- Compare [[1],[2,3,4]] vs [[1],4]
  - Compare [1] vs [1]
    - Compare 1 vs 1
  - Compare [2,3,4] vs 4
    - Mixed types; convert right to [4] and retry comparison
    - Compare [2,3,4] vs [4]
      - Compare 2 vs 4
        - Left side is smaller, so inputs are <em>in the right order</em>

== Pair 3 ==
- Compare [9] vs [[8,7,6]]
  - Compare 9 vs [8,7,6]
    - Mixed types; convert left to [9] and retry comparison
    - Compare [9] vs [8,7,6]
      - Compare 9 vs 8
        - Right side is smaller, so inputs are <em>not</em> in the right order

== Pair 4 ==
- Compare [[4,4],4,4] vs [[4,4],4,4,4]
  - Compare [4,4] vs [4,4]
    - Compare 4 vs 4
    - Compare 4 vs 4
  - Compare 4 vs 4
  - Compare 4 vs 4
  - Left side ran out of items, so inputs are <em>in the right order</em>

== Pair 5 ==
- Compare [7,7,7,7] vs [7,7,7]
  - Compare 7 vs 7
  - Compare 7 vs 7
  - Compare 7 vs 7
  - Right side ran out of items, so inputs are <em>not</em> in the right order

== Pair 6 ==
- Compare [] vs [3]
  - Left side ran out of items, so inputs are <em>in the right order</em>

== Pair 7 ==
- Compare [[[]]] vs [[]]
  - Compare [[]] vs []
    - Right side ran out of items, so inputs are <em>not</em> in the right order

== Pair 8 ==
- Compare [1,[2,[3,[4,[5,6,7]]]],8,9] vs [1,[2,[3,[4,[5,6,0]]]],8,9]
  - Compare 1 vs 1
  - Compare [2,[3,[4,[5,6,7]]]] vs [2,[3,[4,[5,6,0]]]]
    - Compare 2 vs 2
    - Compare [3,[4,[5,6,7]]] vs [3,[4,[5,6,0]]]
      - Compare 3 vs 3
      - Compare [4,[5,6,7]] vs [4,[5,6,0]]
        - Compare 4 vs 4
        - Compare [5,6,7] vs [5,6,0]
          - Compare 5 vs 5
          - Compare 6 vs 6
          - Compare 7 vs 0
            - Right side is smaller, so inputs are <em>not</em> in the right order
</code></pre>
<p>What are the indices of the pairs that are already <em>in the right order</em>? (The first pair has index 1, the second pair has index 2, and so on.) In the above example, the pairs in the right order are 1, 2, 4, and 6; the sum of these indices is <code><em>13</em></code>.</p>
<p>Determine which pairs of packets are already in the right order. <em>What is the sum of the indices of those pairs?</em></p>
</article>
<p>Your puzzle answer was <code>6478</code>.</p><article class="day-desc"><h2 id="part2">--- Part Two ---</h2><p>Now, you just need to put <em>all</em> of the packets in the right order. Disregard the blank lines in your list of received packets.</p>
<p>The distress signal protocol also requires that you include two additional <em>divider packets</em>:</p>
<pre><code>[[2]]
[[6]]
</code></pre>
<p>Using the same rules as before, organize all packets - the ones in your list of received packets as well as the two divider packets - into the correct order.</p>
<p>For the example above, the result of putting the packets in the correct order is:</p>
<pre><code>[]
[[]]
[[[]]]
[1,1,3,1,1]
[1,1,5,1,1]
[[1],[2,3,4]]
[1,[2,[3,[4,[5,6,0]]]],8,9]
[1,[2,[3,[4,[5,6,7]]]],8,9]
[[1],4]
<em>[[2]]</em>
[3]
[[4,4],4,4]
[[4,4],4,4,4]
<em>[[6]]</em>
[7,7,7]
[7,7,7,7]
[[8,7,6]]
[9]
</code></pre>
<p>Afterward, locate the divider packets. To find the <em>decoder key</em> for this distress signal, you need to determine the indices of the two divider packets and multiply them together. (The first packet is at index 1, the second packet is at index 2, and so on.) In this example, the divider packets are <em>10th</em> and <em>14th</em>, and so the decoder key is <code><em>140</em></code>.</p>
<p>Organize all of the packets into the correct order. <em>What is the decoder key for the distress signal?</em></p>
</article>
<p>Your puzzle answer was <code>21922</code>.</p><p class="day-success">Both parts of this puzzle are complete! They provide two gold stars: **</p>
<p>At this point, all that is left is for you to <a href="https://adventofcode.com/2022">admire your Advent calendar</a>.</p>
<p>If you still want to see it, you can <a href="https://adventofcode.com/2022/day/13/input" target="_blank">get your puzzle input</a>.</p>
<p>You can also <span class="share">[Share<span class="share-content">on
  <a href="https://twitter.com/intent/tweet?text=I%27ve+completed+%22Distress+Signal%22+%2D+Day+13+%2D+Advent+of+Code+2022&amp;url=https%3A%2F%2Fadventofcode%2Ecom%2F2022%2Fday%2F13&amp;related=ericwastl&amp;hashtags=AdventOfCode" target="_blank">Twitter</a>
  <a href="https://adventofcode.com/2022/day/javascript:void(0);" onclick="var ms; try{ms=localStorage.getItem('mastodon.server')}finally{} if(typeof ms!=='string')ms=''; ms=prompt('Mastodon Server?',ms); if(typeof ms==='string' && ms.length){this.href='https://'+ms+'/share?text=I%27ve+completed+%22Distress+Signal%22+%2D+Day+13+%2D+Advent+of+Code+2022+%23AdventOfCode+https%3A%2F%2Fadventofcode%2Ecom%2F2022%2Fday%2F13';try{localStorage.setItem('mastodon.server',ms);}finally{}}else{return false;}" target="_blank">Mastodon</a
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