---
layout: default
title: Publications
category_name: Publication
permalink: /category/publication/
---

<style>
    .linktree-container {
        max-width: 600px;
        margin: 30px auto;
        padding: 10px 0;
        text-align: center;
    }
    .linktree-heading {
        margin: 25px 0 15px 0;
        font-size: 20px;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-weight: bold;
    }
    .linktree-btn {
        display: block;
        padding: 12px 16px; /* Slightly reduced vertical padding for two lines */
        margin-bottom: 12px;
        text-decoration: none !important;
        border-radius: 8px;
        border: 2px solid currentColor;
        background-color: transparent;
        color: inherit !important;
        transition: all 0.25s ease-in-out;
        line-height: 1.4; /* Balanced spacing between title and subtitle */
    }
    /* Main Story Title styling */
    .linktree-title {
        display: block;
        font-weight: bold;
        font-size: 16px;
    }
    /* Muted Mag Subtitle styling */
    .linktree-subtitle {
        display: block;
        font-size: 13px;
        opacity: 0.75; /* Blends perfectly into light or dark backgrounds */
        font-weight: normal;
    }

    /* Elegant Rose Pink Hover state */
    .linktree-btn:hover {
        background-color: #d16281 !important;
        border-color: #d16281 !important;
        color: #ffffff !important;
        box-shadow: 0 4px 12px rgba(209, 98, 129, 0.3);
    }
    /* Ensure the subtitle stays fully visible/white on hover */
    .linktree-btn:hover .linktree-subtitle {
        opacity: 0.9;
    }
</style>

<div class="category-page">
    <h2 class="category-title">{{ page.title }}</h2>

<div class="linktree-container">

    <h3 class="linktree-heading">PUBLISHED WORK</h3>

    <a href="https://tasavvurnama.com/horror-gone-wrong/" target="_blank" class="linktree-btn">
        <span class="linktree-title">Horror Gone Wrong</span>
        <span class="linktree-subtitle">Tasavvur</span>
    </a>

    <a href="https://theberlinliteraryreview.com/dr-suvajeet-duttagupta-the-leviathans-mercy/" target="_blank" class="linktree-btn">
        <span class="linktree-title">The Leviathan's Mercy</span>
        <span class="linktree-subtitle">The Berlin Literary Review</span>
    </a>

    <a href="https://effyliterary.art/2026/03/27/break-in-the-routine/" target="_blank" class="linktree-btn">
        <span class="linktree-title">Break In The Routine</span>
        <span class="linktree-subtitle">Effy: A Literary Magazine</span>
    </a>

    <a href="https://www.brownhoundpress.com/stories/suvajeet-duttagupta-the-digital-familiar" target="_blank" class="linktree-btn">
        <span class="linktree-title">The Digital Familiar</span>
        <span class="linktree-subtitle">Brown Hound Press</span>
    </a>

    <a href="https://twistedtonguepress.com/issue-2/the-visible-burden-of-invisibility/" target="_blank" class="linktree-btn">
        <span class="linktree-title">The Visible Burden Of Invisibility</span>
        <span class="linktree-subtitle">Twisted Tongue Press</span>
    </a>

    <a href="https://saimihanma.com/invertefest/#anthology" target="_blank" class="linktree-btn">
        <span class="linktree-title">The Aria of the Painted Lady</span>
        <span class="linktree-subtitle">InverteFest Anthology</span>
    </a>

    <a href="https://hexfiled.com/weaver" target="_blank" class="linktree-btn">
        <span class="linktree-title">The Weaver's Thicket</span>
        <span class="linktree-subtitle">HEXFILED</span>
    </a>

    <h3 class="linktree-heading" style="margin-top: 35px;">ANTHOLOGY ANNOUNCEMENTS</h3>

    <a href="https://beyondthestarspress.substack.com/p/the-garden-of-unfinished-stories" target="_blank" class="linktree-btn">
        <span class="linktree-title">The Garden Of Unfinished Stories</span>
        <span class="linktree-subtitle">Beyond The Stars Press</span>
    </a>

    <a href="https://blog.flametreepublishing.com/fantasy-gothic/myths-gods-immortals-contents-announcement-gilgamesh" target="_blank" class="linktree-btn">
        <span class="linktree-title">Beyond Abzu</span>
        <span class="linktree-subtitle">Flame Tree Publishing</span>
    </a>

    <h3 class="linktree-heading" style="margin-top: 35px;">ORDER / PRE-ORDER / BACK PROJECTS</h3>

            <a href="https://beyondthestarspress.substack.com/p/the-garden-of-unfinished-stories" target="_blank" class="linktree-btn">
                <span class="linktree-title">The Garden Of Unfinished Stories</span>
                <span class="linktree-subtitle">Pre-order The Anthropocene on Kickstarter (Late Pledge)</span>
            </a>

            <a href="https://www.indiegogo.com/en/projects/horrific-scribblings/extremely-weird-splatter" target="_blank" class="linktree-btn">
                <span class="linktree-title">The Weight of the Dark</span>
                <span class="linktree-subtitle">Back Extremely Weird Splatter on Indiegogo</span>
            </a>

            <a href="https://www.backerkit.com/call_to_action/ea01ba4a-9924-4d93-98ee-13f11612e7ac/landing?ref=home-page" target="_blank" class="linktree-btn">
                <span class="linktree-title">The Specimen</span>
                <span class="linktree-subtitle">Back Cosmic Consequences on BackerKit</span>
            </a>

            <a href="https://www.flametreepublishing.com/gilgamesh-isbn-9781835628089.html" target="_blank" class="linktree-btn">
                        <span class="linktree-title">Beyond Abzu</span>
                        <span class="linktree-subtitle">Gilgamesh (Available Sept 22, 2026)</span>
                    </a>
</div>
<hr />

<p class="category-description">
        This section features stories and articles that have been published online or in print. Read more about each of the story here.
    </p>

    <div class="posts-list">
        {% assign category_posts = site.posts | where_exp:"post", "post.categories contains page.category_name" %}

        {% if category_posts.size > 0 %}
        {% for post in category_posts %}
            <div class="archive-post-list-item">
                <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
                <time>
                    {{ post.date | date: "%b %-d, %Y" }}
                    {% if post.word_count %}
                    <span class="index-word-count">
                        • Word Count: <strong>{{ post.word_count }}</strong></span>
                    {% endif %}
                </time>
                {% if post.excerpt %}
                    <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
                {% endif %}
            </div>
          {% endfor %}
        {% else %}
          <p>No posts found in this category yet.</p>
        {% endif %}
    </div>
</div>
