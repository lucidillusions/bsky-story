---
layout: default
title: Oracle's Label
category_name: deathclock
permalink: /category/deathclock/
comments: true
bluesky_post_uri: https://bsky.app/profile/lucidillusions.in/post/3kyr7qa7dcs2w
---

<div class="category-page">
    <h2 class="category-title">{{ page.title }}</h2>

    <p class="category-description">
        For those of you on Bluesky, you know about the labellers – they're like the unsung heroes of moderation. But sometimes, they create something truly unique. Take <a href="https://bsky.app/profile/did:plc:fqfzpua2rp5io5nmxcixvdvm"><strong>The Cave of Trophonius</strong></a>, for example. This quirky labeller has tagged every active account with a humorous (or sometimes ominous!) prediction of how they'll kick the bucket. I instantly thought, 'What a great idea for a story!'
    </p>

    <p class="category-description">
        So, I'm now using these labels as prompts to write new tales for any mutual who asks for one. You can scroll down and find link to the post and drop me a Hi if you'd like one.
    </p>

    <hr/>

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
                        • Word Count: <strong>{{ post.word_count }}</strong></span
                    >
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

    <hr/>

    {% if page.comments %}
    <section class="page-comments">
        {% include comments-providers/custom.html %}
    </section>
    {% endif %}

</div>
