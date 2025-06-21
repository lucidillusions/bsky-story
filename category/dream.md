---
layout: default
title: Dream Inspired
category_name: dream
permalink: /category/dream/
---

<div class="category-page">
    <h2 class="category-title">{{ page.title }}</h2>

    <p class="category-description">
        Step into this section to read stories that first came to life in my dreams.
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
</div>
