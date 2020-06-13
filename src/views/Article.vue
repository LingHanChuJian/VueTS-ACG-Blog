<template lang="pug">
    main(:class="[prefixCls + '-wrap']")
        article(:class="[prefixCls + '-article', 'markdown']" ref="article" v-html="content")
        div(:class="[prefixCls + '-mark']")
            | Q.E.D.
            Icon(type="dragon" size="14")
        div(v-if="handleReward.length !== 0" :class="[prefixCls + '-reward']")
            Poptip(trigger="hover" placement="bottom")
                div.reward 赏
                template(v-slot:content)
                    ul.reward-ul
                        li(v-for="item in handleReward" :key="item.title")
                            img(:src="item.image")
                            p {{ item.title }}
        div(:class="[prefixCls + '-protocol']")
            div(:class="[prefixCls + '-lincenses']")
                a(href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="license")
                    Icon(type="creative-commons")
                    | 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议
            div(v-if="tags.length !== 0" :class="[prefixCls + '-tags']")
                Icon(type="tags")
                router-link(v-for="item, index in tags" :key="index" :to="getTagLink(item)") {{ item }}
</template>

<script lang="ts">
import APlayer from 'aplayer'
import DPlayer from 'dplayer'
import { reward } from '@/config'
import { RawLocation } from 'vue-router'
import { Icon } from '@/components/icon'
import { hljsCode } from '@/utils/markdown'
import { Poptip } from '@/components/poptip'
import { UserReward } from '@/types/components'
import { Component, Vue } from 'vue-property-decorator'
import { handleAPlayer, destroyAPlayer } from '@/utils/aplayer'
import { handleDPlayer, destroyDPlayer } from '@/utils/dplayer'

import 'aplayer/dist/APlayer.min.css'
import 'highlight.js/styles/atom-one-light.css'

// declare var window: Window & { APlayer?: APlayer, DPlayer?: DPlayer }

@Component({
    components: {
        Icon,
        Poptip,
    },
})
export default class Article extends Vue {
    private prefixCls: string = 'main'

    private tags: string[] = ['GraphQL', 'JavaScript', 'WordPress']

    private musicPlayer: APlayer[] = []

    private videoPlayer: DPlayer[] = []

    private content: string =
`<p></p><div class="has-toc have-toc"></div><span class="begin">B</span>igger data and more intelligent algorithms are being processed and analyzed faster in an API-enabled, open source environment. J.P. Morgan is committed to understanding how this technology-driven landscape could differentiate your stock, sector, portfolio, and asset class strategies.<a href="https://www.jpmorgan.com/global/research/machine-learning" target="_blank" rel="nofollow">Here</a>, J.P. Morgan summarizes key research in machine learning, big data and artificial intelligence, highlighting exciting trends that impact the financial community.<p></p>
<p>
<iframe frameborder="0" scrolling="0" allowtransparency="true" src="https://api.2heng.xin/github-card/?repo=mashirozx/sakura" width="400" height="153" style="margin-left: 50%; transform: translateX(-50%);"></iframe>
</p>
<hr>
<h1 id="toc-head-1">h1 Heading</h1>
<h2 id="toc-head-2">h2 Heading</h2>
<h3 id="toc-head-3">h3 Heading</h3>
<h4 id="toc-head-4">h4 Heading</h4>
<h5 id="toc-head-5">h5 Heading</h5>
<h2 id="toc-head-6">Horizontal Rules</h2>
<hr>
<hr>
<hr>
<h2 id="toc-head-7">Typographic replacements</h2>
<p>Enable typographer option to see result.</p>
<p>(c) (C) (r) (R) (tm) (TM) (p) (P) +-</p>
<p>test.. test... test..... test?..... test!....</p>
<p>!!!!!! ???? ,, -- ---</p>
<p>"Smartypants, double quotes" and 'single quotes'</p>
<h2 id="toc-head-8">Emphasis</h2>
<p><strong>This is bold text</strong></p>
<p><strong>This is bold text</strong></p>
<p><em>This is italic text</em></p>
<p><em>This is italic text</em></p>
<p><del>Strikethrough</del></p>
<h2 id="toc-head-9">Blockquotes</h2>
<blockquote><p>
Blockquotes can also be nested...</p>
<blockquote><p>
...by using additional greater-than signs right next to each other...</p>
<blockquote><p>
...or with spaces between arrows.
</p></blockquote>
</blockquote>
</blockquote>
<h2 id="toc-head-10">Lists</h2>
<p>Unordered</p>
<ul>
<li>Create a list by starting a line with <code>+</code>, <code>-</code>, or <code>*</code></li>
<li>Sub-lists are made by indenting 2 spaces:
<ul>
<li>Marker character change forces new list start:</li>
<li>Ac tristique libero volutpat at</li>
<li>Facilisis in pretium nisl aliquet</li>
<li>Nulla volutpat aliquam velit</li>
</ul>
</li>
<li>Very easy!</li>
</ul>
<p>Ordered</p>
<ol>
<li>Lorem ipsum dolor sit amet</li>
<li>Consectetur adipiscing elit</li>
<li>Integer molestie lorem at massa<p></p>
</li>
<li>
<p>You can use sequential numbers...</p>
</li>
<li>...or keep all the numbers as <code>1.</code></li>
</ol>
<p>Start numbering with offset:</p>
<ol start="57">
<li>foo</li>
<li>bar</li>
</ol>
<h2 id="toc-head-11">Code</h2>
<p>Inline <code>code</code></p>
<p>Indented code</p>
<pre class="highlight">
<code id="uuid-block-5" data-lang="JS" class="language-js hljs">var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
</code>
<i class="amplification-code icon icon-expand" title="放大"></i><i class="copy-code icon icon-clone" data-clipboard-target="#uuid-block-5" title="复制代码"></i>
</pre>
<h2 id="toc-head-12">Tables</h2>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>data</td>
<td>path to data files to supply the data that will be passed into templates.</td>
</tr>
<tr>
<td>engine</td>
<td>engine to be used for processing templates. Handlebars is the default.</td>
</tr>
<tr>
<td>ext</td>
<td>extension to be used for dest files.</td>
</tr>
</tbody>
</table>
<p>Right aligned columns</p>
<table>
<thead>
<tr>
<th align="right">Option</th>
<th align="right">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="right">data</td>
<td align="right">path to data files to supply the data that will be passed into templates.</td>
</tr>
<tr>
<td align="right">engine</td>
<td align="right">engine to be used for processing templates. Handlebars is the default.</td>
</tr>
<tr>
<td align="right">ext</td>
<td align="right">extension to be used for dest files.</td>
</tr>
</tbody>
</table>
<h2 id="toc-head-13">Links</h2>
<p><a href="http://dev.nodeca.com" target="_blank" rel="nofollow">link text</a></p>
<p><a href="https://nodeca.github.io/pica/demo/" title="title text!" target="_blank" rel="nofollow">link with title</a></p>
<p>Autoconverted link https://github.com/nodeca/pica (enable linkify to see)</p>
<h2 id="toc-head-14">Images</h2>
<p><img class="lazyload" data-src="https://octodex.github.com/images/minion.png" src="https://octodex.github.com/images/minion.png" onerror="imgError(this)" alt="Minion"><br>
<noscript><img src="https://octodex.github.com/images/minion.png" alt="Minion" /><br /></noscript>
<img class="lazyload" data-src="https://octodex.github.com/images/stormtroopocat.jpg" src="https://octodex.github.com/images/stormtroopocat.jpg" onerror="imgError(this)" alt="Stormtroopocat" title="The Stormtroopocat"></p>
<noscript><img src="https://octodex.github.com/images/stormtroopocat.jpg" alt="Stormtroopocat" title="The Stormtroopocat" /></p></noscript>
<p>Like links, Images also have a footnote style syntax</p>
<p><img class="lazyload" data-src="https://octodex.github.com/images/dojocat.jpg" src="https://octodex.github.com/images/dojocat.jpg" onerror="imgError(this)" alt="Alt text" title="The Dojocat"></p>
<noscript><img src="https://octodex.github.com/images/dojocat.jpg" alt="Alt text" title="The Dojocat" /></p></noscript>
<p>With a reference later in the document defining the URL location:</p>
<h2 id="toc-head-15">Plugins</h2>
<p>The killer feature of <code>markdown-it</code> is very effective support of<br>
<a href="https://www.npmjs.org/browse/keyword/markdown-it-plugin" target="_blank" rel="nofollow">syntax plugins</a>.</p>
<h3 id="toc-head-16"><a href="https://github.com/markdown-it/markdown-it-emoji" target="_blank" rel="nofollow">Emojies</a></h3>
<blockquote><p>
Classic markup: :wink: :crush: :cry: <img src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/smilies/icon_tear.gif" alt=":tear:" class="wp-smiley" style="height: 1em; max-height: 1em;"> :laughing: :yum:</p>
<p> Shortcuts (emoticons): :-) :-( 8-) ;)
</p></blockquote>
<p>see <a href="https://github.com/markdown-it/markdown-it-emoji#change-output" target="_blank" rel="nofollow">how to change output</a> with twemoji.</p>
<h3 id="toc-head-17"><a href="https://github.com/markdown-it/markdown-it-sub" target="_blank" rel="nofollow">Subscript</a> / <a href="https://github.com/markdown-it/markdown-it-sup" target="_blank" rel="nofollow">Superscript</a></h3>
<ul>
<li>19^th^</li>
<li>H~2~O</li>
</ul>
<h3 id="toc-head-18"><a href="https://github.com/markdown-it/markdown-it-ins" target="_blank" rel="nofollow">\<ins></ins></a></h3>
<p>++Inserted text++</p>
<h3 id="toc-head-19"><a href="https://github.com/markdown-it/markdown-it-mark" target="_blank" rel="nofollow">\<mark></mark></a></h3>
<p>==Marked text==</p>
<h3 id="toc-head-20"><a href="https://github.com/markdown-it/markdown-it-footnote" target="_blank" rel="nofollow">Footnotes</a></h3>
<p>Footnote 1 link<sup id="fnref-6-first"><a href="#fn-6-first" class="footnote-ref" role="doc-noteref" target="_blank" rel="nofollow">1</a></sup>.</p>
<p>Footnote 2 link<sup id="fnref-6-second"><a href="#fn-6-second" class="footnote-ref" role="doc-noteref" target="_blank" rel="nofollow">2</a></sup>.</p>
<p>Inline footnote^[Text of inline footnote] definition.</p>
<p>Duplicated footnote reference<sup id="fnref2:6-second"><a href="#fn-6-second" class="footnote-ref" role="doc-noteref" target="_blank" rel="nofollow">2</a></sup>.</p>
<h3 id="toc-head-21"><a href="https://github.com/markdown-it/markdown-it-deflist" target="_blank" rel="nofollow">Definition lists</a></h3>
<dl>
<dt>Term 1</dt>
<dd>
Definition 1<br>
with lazy continuation.
</dd>
<dt>Term 2 with <em>inline markup</em></dt>
<dd>
Definition 2<p></p>
<pre class="highlight-wrap" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" contenteditable="false" design="by Mashiro"><code class="hljs coffeescript" data-rel="TEXT" id="hljs-3">{ some code, part <span class="hljs-keyword">of</span> Definition <span class="hljs-number">2</span> }
</code><a class="copy-code" href="javascript:" data-clipboard-target="#hljs-3" title="拷贝代码"><i class="fa fa-clipboard" aria-hidden="true"></i></a></pre>
<p>Third paragraph of definition 2.
</p></dd>
</dl>
<p><em>Compact style:</em></p>
<p>Term 1<br>
~ Definition 1</p>
<p>Term 2<br>
~ Definition 2a<br>
~ Definition 2b</p>
<h3 id="toc-head-22"><a href="https://github.com/markdown-it/markdown-it-abbr" target="_blank" rel="nofollow">Abbreviations</a></h3>
<p>This is <abbr title="Hyper Text Markup Language">HTML</abbr> abbreviation example.</p>
<p>It converts "<abbr title="Hyper Text Markup Language">HTML</abbr>", but keep intact partial entries like "xxxHTMLyyy" and so on.</p>
<h3 id="toc-head-23"><a href="https://github.com/markdown-it/markdown-it-container" target="_blank" rel="nofollow">Custom containers</a></h3>
<p>::: warning<br>
<em>here be dragons</em><br>
:::</p>
<h1 id="toc-head-24">Code</h1>
<pre class="highlight-wrap" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" contenteditable="false" design="by Mashiro"><code class="language-python hljs" data-rel="PYTHON" id="hljs-4"><table class="hljs-ln"><tbody><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">import</span> matplotlib</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">import</span> matplotlib.pyplot <span class="hljs-keyword">as</span> plt</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">import</span> sklearn</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="6"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="7"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment"># Load the data</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="8"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">oecd_bli = pd.read_csv(<span class="hljs-string">"oecd_bli_2015.csv"</span>, thousands=<span class="hljs-string">','</span>)</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="9"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">gdp_per_capita = pd.read_csv(<span class="hljs-string">"gdp_per_capita.csv"</span>,thousands=<span class="hljs-string">','</span>,delimiter=<span class="hljs-string">'\t'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="10"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">                            encoding=<span class="hljs-string">'latin1'</span>, na_values=<span class="hljs-string">"n/a"</span>)</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="11"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="12"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment"># Prepare the data</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="13"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">country_stats = prepare_country_stats(oecd_bli, gdp_per_capita)</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="14"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">X = np.c_[country_stats[<span class="hljs-string">"GDP per capita"</span>]]</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="15"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">y = np.c_[country_stats[<span class="hljs-string">"Life satisfaction"</span>]]</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="16"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="17"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment"># Visualize the data</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="18"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">country_stats.plot(kind=<span class="hljs-string">'scatter'</span>, x=<span class="hljs-string">"GDP per capita"</span>, y=<span class="hljs-string">'Life satisfaction'</span>)</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="19"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">plt.show()</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="20"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="21"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment"># Select a linear model</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="22"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">lin_reg_model = sklearn.linear_model.LinearRegression()</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="23"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="24"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment"># Train the model</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="25"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">lin_reg_model.fit(X, y)</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="26"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="27"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment"># Make a prediction for Cyprus</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="28"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">X_new = [[<span class="hljs-number">22587</span>]]  <span class="hljs-comment"># Cyprus' GDP per capita</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="29"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">print(lin_reg_model.predict(X_new)) <span class="hljs-comment"># outputs [[ 5.96242338]]</span></div></td></tr></tbody></table></code><a class="copy-code" href="javascript:" data-clipboard-target="#hljs-4" title="拷贝代码"><i class="fa fa-clipboard" aria-hidden="true"></i></a></pre>
<h1 id="toc-head-25">Image Gallery</h1>
<p><a data-fancybox="gallery" data-caption="image 1" class="fancybox" href="https://view.moezx.cc/images/2019/01/19/TVKDX147_006.png" alt="image 1" title="image 1"><img src="https://view.moezx.cc/images/2019/01/19/TVKDX147_006.th.png" target="_blank" rel="nofollow" class="fancybox"></a><a data-fancybox="gallery" data-caption="image 2" class="fancybox" href="https://view.moezx.cc/images/2018/01/15/PID50489279by.jpg" alt="image 2" title="image 2"><img src="https://view.moezx.cc/images/2018/01/15/PID50489279by.th.jpg" target="_blank" rel="nofollow" class="fancybox"></a><a data-fancybox="gallery" data-caption="image 3" class="fancybox" href="https://view.moezx.cc/images/2018/09/15/_63393975.png" alt="image 3" title="image 3"><img src="https://view.moezx.cc/images/2018/09/15/_63393975.th.png" target="_blank" rel="nofollow" class="fancybox"></a><a data-fancybox="gallery" data-caption="image 4" class="fancybox" href="https://view.moezx.cc/images/2018/09/19/chise_by_kyuriin-dceh641.jpg" alt="image 4" title="image 4"><img src="https://view.moezx.cc/images/2018/09/19/chise_by_kyuriin-dceh641.th.jpg" target="_blank" rel="nofollow" class="fancybox"></a><a data-fancybox="gallery" data-caption="image 5" class="fancybox" href="https://view.moezx.cc/images/2018/09/19/kurumi_by_kyuriin-dbwaxsg.jpg" alt="image 5" title="image 5"><img src="https://view.moezx.cc/images/2018/09/19/kurumi_by_kyuriin-dbwaxsg.th.jpg" target="_blank" rel="nofollow" class="fancybox"></a><a data-fancybox="gallery" data-caption="image 6" class="fancybox" href="https://view.moezx.cc/images/2018/09/19/98ee64cb1ed331733ea000f007c85564a6fc0ecf.jpg" alt="image 6" title="image 6"><img src="https://view.moezx.cc/images/2018/09/19/98ee64cb1ed331733ea000f007c85564a6fc0ecf.th.jpg" target="_blank" rel="nofollow" class="fancybox"></a></p>
<h1 id="toc-head-26">Quotation</h1>
<blockquote><p>
We are all in the gutter, but some of us are looking at the stars.
</p></blockquote>
<div data-aplayer data-type="song" data-song=""></div>
<script>
new APlayer({
    container: document.getElementById('aplayer'),
    mini: false,
    autoplay: false,
    theme: '#FADFA3',
    loop: 'all',
    order: 'random',
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    listFolded: false,
    listMaxHeight: 90,
    lrcType: 3,
    audio: [{
            name: '光るなら',
            artist: 'Goose house',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc',
            theme: '#ebd0c2'
        }, {
            name: 'トリカゴ',
            artist: 'XX:me',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.lrc',
            theme: '#46718b'
        }, {
            name: '前前前世',
            artist: 'RADWIMPS',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.lrc',
            theme: '#505d6b'
        }]
})
<\/script>
</div>
`

    // 跳转 tags
    private getTagLink(item: string): RawLocation {
        return {
            name: 'tags',
            params: {
                tag: item,
            },
        }
    }

    private get handleReward(): UserReward[] {
        return reward.filter((item) => item.image)
    }

    private mounted() {
        this.$nextTick(async () => {
            hljsCode((this.$refs.article as HTMLElement))
            this.musicPlayer = await handleAPlayer((this.$refs.article as HTMLElement))
            this.videoPlayer = await handleDPlayer((this.$refs.article as HTMLElement))
        })
    }

    private beforeRouteUpdate() {
        // 导航更新
    }

    private beforeDestroy() {
        destroyAPlayer(this.musicPlayer)
        destroyDPlayer(this.videoPlayer)
    }
}
</script>

<style lang="stylus" scoped>
.main-wrap
    margin 40px auto
    max-width 800px

.main-article
    position relative

.main-reward
    margin 35px 0
    text-align center

.main-mark
    i
        margin-left 6px
        color $font-color-hover

.main-protocol
    padding 20px 0
    border-bottom 1px dashed $font-color
    border-top 1px dashed $font-color

.main-lincenses
.main-tags
    text-align center
    i
        margin-right 6px

.main-lincenses
    margin-bottom 10px

.main-tags
    a
        margin 0 5px
        text-transform uppercase

.reward-ul
    li
        padding 0 12px
        display inline-block
        img
            max-width 130px
        p
            margin 5px 0

.reward
    cursor pointer
    margin 0 auto
    width 40px
    height 40px
    text-align center
    line-height 40px
    background-color #d34836
    border-radius 100%
    color #FFFFFF
</style>