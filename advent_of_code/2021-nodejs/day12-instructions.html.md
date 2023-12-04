<!DOCTYPE html>
<html lang="en-us">
<head>
<meta charset="utf-8"/>
<title>Day 12 - Advent of Code 2021</title>
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
<header><div><h1 class="title-global"><a href="https://adventofcode.com/">Advent of Code</a></h1><nav><ul><li><a href="https://adventofcode.com/2021/about">[About]</a></li><li><a href="https://adventofcode.com/2021/events">[Events]</a></li><li><a href="https://teespring.com/stores/advent-of-code" target="_blank">[Shop]</a></li><li><a href="https://adventofcode.com/2021/settings">[Settings]</a></li><li><a href="https://adventofcode.com/2021/auth/logout">[Log Out]</a></li></ul></nav><div class="user">LemurDaniel <span class="star-count">41*</span></div></div><div><h1 class="title-event">&nbsp;&nbsp;&nbsp;<span class="title-event-wrap">sub y{</span><a href="https://adventofcode.com/2021">2021</a><span class="title-event-wrap">}</span></h1><nav><ul><li><a href="https://adventofcode.com/2021">[Calendar]</a></li><li><a href="https://adventofcode.com/2021/support">[AoC++]</a></li><li><a href="https://adventofcode.com/2021/sponsors">[Sponsors]</a></li><li><a href="https://adventofcode.com/2021/leaderboard">[Leaderboard]</a></li><li><a href="https://adventofcode.com/2021/stats">[Stats]</a></li></ul></nav></div></header>

<div id="sidebar">
<div id="sponsor"><div class="quiet">Our <a href="https://adventofcode.com/2021/sponsors">sponsors</a> help make Advent of Code possible:</div><div class="sponsor"><a href="https://www.pexip.com/careers" target="_blank" onclick="if(ga)ga('send','event','sponsor','sidebar',this.href);" rel="noopener">Pexip</a> - Join the team responsible for creating the video platform connecting people across borders, businesses and technologies. We&apos;re hiring!</div></div>
</div><!--/sidebar-->

<main>
<article class="day-desc"><h2>--- Day 12: Passage Pathing ---</h2><p>With your <span title="Sublime.">submarine's subterranean subsystems subsisting suboptimally</span>, the only way you're getting out of this cave anytime soon is by finding a path yourself. Not just <em>a</em> path - the only way to know if you've found the <em>best</em> path is to find <em>all</em> of them.</p>
<p>Fortunately, the sensors are still mostly working, and so you build a rough map of the remaining caves (your puzzle input). For example:</p>
<pre><code>start-A
start-b
A-c
A-b
b-d
A-end
b-end
</code></pre>
<p>This is a list of how all of the caves are connected. You start in the cave named <code>start</code>, and your destination is the cave named <code>end</code>. An entry like <code>b-d</code> means that cave <code>b</code> is connected to cave <code>d</code> - that is, you can move between them.</p>
<p>So, the above cave system looks roughly like this:</p>
<pre><code>    start
    /   \
c--A-----b--d
    \   /
     end
</code></pre>
<p>Your goal is to find the number of distinct <em>paths</em> that start at <code>start</code>, end at <code>end</code>, and don't visit small caves more than once. There are two types of caves: <em>big</em> caves (written in uppercase, like <code>A</code>) and <em>small</em> caves (written in lowercase, like <code>b</code>). It would be a waste of time to visit any small cave more than once, but big caves are large enough that it might be worth visiting them multiple times. So, all paths you find should <em>visit small caves at most once</em>, and can <em>visit big caves any number of times</em>.</p>
<p>Given these rules, there are <code><em>10</em></code> paths through this example cave system:</p>
<pre><code>start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,end
start,A,c,A,b,A,end
start,A,c,A,b,end
start,A,c,A,end
start,A,end
start,b,A,c,A,end
start,b,A,end
start,b,end
</code></pre>
<p>(Each line in the above list corresponds to a single path; the caves visited by that path are listed in the order they are visited and separated by commas.)</p>
<p>Note that in this cave system, cave <code>d</code> is never visited by any path: to do so, cave <code>b</code> would need to be visited twice (once on the way to cave <code>d</code> and a second time when returning from cave <code>d</code>), and since cave <code>b</code> is small, this is not allowed.</p>
<p>Here is a slightly larger example:</p>
<pre><code>dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
</code></pre>
<p>The <code>19</code> paths through it are as follows:</p>
<pre><code>start,HN,dc,HN,end
start,HN,dc,HN,kj,HN,end
start,HN,dc,end
start,HN,dc,kj,HN,end
start,HN,end
start,HN,kj,HN,dc,HN,end
start,HN,kj,HN,dc,end
start,HN,kj,HN,end
start,HN,kj,dc,HN,end
start,HN,kj,dc,end
start,dc,HN,end
start,dc,HN,kj,HN,end
start,dc,end
start,dc,kj,HN,end
start,kj,HN,dc,HN,end
start,kj,HN,dc,end
start,kj,HN,end
start,kj,dc,HN,end
start,kj,dc,end
</code></pre>
<p>Finally, this even larger example has <code>226</code> paths through it:</p>
<pre><code>fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
</code></pre>
<p><em>How many paths through this cave system are there that visit small caves at most once?</em></p>
</article>
<p>To begin, <a href="https://adventofcode.com/2021/day/12/input" target="_blank">get your puzzle input</a>.</p>
<form method="post" action="12/answer"><input type="hidden" name="level" value="1"/><p>Answer: <input type="text" name="answer" autocomplete="off"/> <input type="submit" value="[Submit]"/></p></form>
<p>You can also <span class="share">[Share<span class="share-content">on
  <a href="https://twitter.com/intent/tweet?text=%22Passage+Pathing%22+%2D+Day+12+%2D+Advent+of+Code+2021&amp;url=https%3A%2F%2Fadventofcode%2Ecom%2F2021%2Fday%2F12&amp;related=ericwastl&amp;hashtags=AdventOfCode" target="_blank">Twitter</a>
  <a href="https://adventofcode.com/2021/day/javascript:void(0);" onclick="var ms; try{ms=localStorage.getItem('mastodon.server')}finally{} if(typeof ms!=='string')ms=''; ms=prompt('Mastodon Server?',ms); if(typeof ms==='string' && ms.length){this.href='https://'+ms+'/share?text=%22Passage+Pathing%22+%2D+Day+12+%2D+Advent+of+Code+2021+%23AdventOfCode+https%3A%2F%2Fadventofcode%2Ecom%2F2021%2Fday%2F12';try{localStorage.setItem('mastodon.server',ms);}finally{}}else{return false;}" target="_blank">Mastodon</a
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